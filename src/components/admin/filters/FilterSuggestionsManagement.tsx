
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Brain, TrendingUp } from 'lucide-react';
import { useFilterSuggestions } from '@/hooks/marketplace/useFilterSuggestions';
import LoadingSkeleton from '@/components/ui/loading-skeleton';

const FilterSuggestionsManagement: React.FC = () => {
  const { suggestions, loading, approveSuggestion, rejectSuggestion } = useFilterSuggestions();

  if (loading) {
    return (
      <div className="space-y-4">
        <LoadingSkeleton variant="card" count={3} />
      </div>
    );
  }

  if (suggestions.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Brain className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Nenhuma sugestão pendente
          </h3>
          <p className="text-gray-600">
            A IA ainda não sugeriu novos filtros. Novos produtos cadastrados irão gerar sugestões automáticas.
          </p>
        </CardContent>
      </Card>
    );
  }

  const getConfidenceColor = (score?: number) => {
    if (!score) return 'bg-gray-100 text-gray-800';
    if (score >= 0.8) return 'bg-green-100 text-green-800';
    if (score >= 0.6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getConfidenceText = (score?: number) => {
    if (!score) return 'Desconhecida';
    if (score >= 0.8) return 'Alta';
    if (score >= 0.6) return 'Média';
    return 'Baixa';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Sugestões de Filtros da IA
        </h2>
        <Badge variant="secondary" className="flex items-center gap-1">
          <TrendingUp size={14} />
          {suggestions.length} pendentes
        </Badge>
      </div>

      <div className="grid gap-4">
        {suggestions.map((suggestion) => (
          <Card key={suggestion.id} className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{suggestion.suggested_filter_name}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{suggestion.suggested_filter_type}</Badge>
                    {suggestion.category_context && (
                      <Badge variant="secondary">{suggestion.category_context}</Badge>
                    )}
                    <Badge 
                      className={getConfidenceColor(suggestion.confidence_score)}
                    >
                      Confiança: {getConfidenceText(suggestion.confidence_score)}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => approveSuggestion(suggestion.id)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle size={16} className="mr-1" />
                    Aprovar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => rejectSuggestion(suggestion.id)}
                    className="text-red-600 border-red-600 hover:bg-red-50"
                  >
                    <XCircle size={16} className="mr-1" />
                    Rejeitar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-700">Valor extraído:</span>
                  <p className="text-sm text-gray-600 mt-1">{suggestion.extracted_value}</p>
                </div>
                
                {suggestion.suggested_options && (
                  <div>
                    <span className="text-sm font-medium text-gray-700">Opções sugeridas:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {suggestion.suggested_options.map((option, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {option}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="text-xs text-gray-500">
                  Sugerido em {new Date(suggestion.created_at).toLocaleDateString('pt-BR')}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FilterSuggestionsManagement;
