
import { useState, useEffect } from 'react';
import { 
  fetchFilterSuggestions, 
  approveFilterSuggestion, 
  rejectFilterSuggestion,
  FilterSuggestion 
} from '@/services/marketplace/dynamicFilters';
import { useToast } from '@/hooks/use-toast';

export const useFilterSuggestions = () => {
  const [suggestions, setSuggestions] = useState<FilterSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadSuggestions = async () => {
    try {
      setLoading(true);
      const data = await fetchFilterSuggestions('pending');
      setSuggestions(data);
    } catch (error) {
      console.error('Error loading filter suggestions:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as sugestões de filtros",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSuggestions();
  }, []);

  const approveSuggestion = async (suggestionId: string, adminNotes?: string) => {
    try {
      const result = await approveFilterSuggestion(suggestionId, adminNotes);
      
      if (result.success) {
        toast({
          title: "Filtro aprovado",
          description: "O filtro foi criado e estará disponível para os usuários"
        });
        setSuggestions(prev => prev.filter(s => s.id !== suggestionId));
        return true;
      } else {
        throw new Error('Falha ao aprovar filtro');
      }
    } catch (error) {
      console.error('Error approving suggestion:', error);
      toast({
        title: "Erro",
        description: "Não foi possível aprovar o filtro",
        variant: "destructive"
      });
      return false;
    }
  };

  const rejectSuggestion = async (suggestionId: string, adminNotes?: string) => {
    try {
      const success = await rejectFilterSuggestion(suggestionId, adminNotes);
      
      if (success) {
        toast({
          title: "Filtro rejeitado",
          description: "A sugestão foi rejeitada"
        });
        setSuggestions(prev => prev.filter(s => s.id !== suggestionId));
        return true;
      } else {
        throw new Error('Falha ao rejeitar filtro');
      }
    } catch (error) {
      console.error('Error rejecting suggestion:', error);
      toast({
        title: "Erro",
        description: "Não foi possível rejeitar o filtro",
        variant: "destructive"
      });
      return false;
    }
  };

  return {
    suggestions,
    loading,
    loadSuggestions,
    approveSuggestion,
    rejectSuggestion
  };
};
