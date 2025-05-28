
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Entity, EntityType } from '@/components/admin/entities/types';
import { 
  fetchEntities, 
  fetchEntitiesByType, 
  fetchPartners, 
  fetchEntityStats 
} from '@/services/supabase/entities';

export interface EntitiesFilterState {
  searchQuery: string;
  partnerFilter: string;
  typeFilter: string;
  statusFilter: string;
  validationFilter: string;
  startDate?: Date;
  endDate?: Date;
}

export const useSupabaseEntitiesData = () => {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [partners, setPartners] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    ativo: 0,
    pendente: 0,
    cancelado: 0,
    eventos: 0,
    mensalidades: 0,
    dayUse: 0,
    creditos: 0,
    validationIssues: 0,
    salesLast24h: 0,
    salesCurrentMonth: 0,
    salesTotal: 0,
  });
  const { toast } = useToast();

  const [filters, setFilters] = useState<EntitiesFilterState>({
    searchQuery: '',
    partnerFilter: '',
    typeFilter: '',
    statusFilter: '',
    validationFilter: '',
  });

  // Carregar dados iniciais
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [entitiesData, partnersData, statsData] = await Promise.all([
        fetchEntities(),
        fetchPartners(),
        fetchEntityStats(),
      ]);

      setEntities(entitiesData);
      setPartners(partnersData.map((p: any) => p.name));
      setStats(statsData);
    } catch (error) {
      console.error('Error loading initial data:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar dados das entidades",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Atualizar dados por tipo
  const loadEntitiesByType = async (type: EntityType) => {
    try {
      const entitiesData = await fetchEntitiesByType(type);
      setEntities(entitiesData);
    } catch (error) {
      console.error('Error loading entities by type:', error);
      toast({
        title: "Erro",
        description: "Erro ao filtrar entidades por tipo",
        variant: "destructive",
      });
    }
  };

  // Filtrar entidades
  const filteredEntities = entities.filter((entity) => {
    if (filters.searchQuery && !entity.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
      return false;
    }
    if (filters.partnerFilter && entity.partner !== filters.partnerFilter) {
      return false;
    }
    if (filters.statusFilter && entity.status !== filters.statusFilter) {
      return false;
    }
    if (filters.validationFilter === 'failed' && entity.type === 'credito') {
      return (entity as any).validationStatus === 'failed';
    }
    return true;
  });

  // Funções de filtro
  const filterActions = {
    setSearchQuery: (value: string) => setFilters(prev => ({ ...prev, searchQuery: value })),
    setPartnerFilter: (value: string) => setFilters(prev => ({ ...prev, partnerFilter: value })),
    setTypeFilter: (value: string) => {
      setFilters(prev => ({ ...prev, typeFilter: value }));
      if (value && value !== 'todos') {
        loadEntitiesByType(value as EntityType);
      } else {
        loadInitialData();
      }
    },
    setStatusFilter: (value: string) => setFilters(prev => ({ ...prev, statusFilter: value })),
    setValidationFilter: (value: string) => setFilters(prev => ({ ...prev, validationFilter: value })),
    handleDateChange: (start?: Date, end?: Date) => setFilters(prev => ({ ...prev, startDate: start, endDate: end })),
    filterLast24Hours: () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      setFilters(prev => ({ ...prev, startDate: yesterday, endDate: new Date() }));
    },
    filterCurrentMonth: () => {
      const now = new Date();
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      setFilters(prev => ({ ...prev, startDate: firstDay, endDate: now }));
    },
    filterAllTime: () => setFilters(prev => ({ ...prev, startDate: undefined, endDate: undefined })),
    clearFilters: () => setFilters({
      searchQuery: '',
      partnerFilter: '',
      typeFilter: '',
      statusFilter: '',
      validationFilter: '',
    }),
  };

  return {
    entities: filteredEntities,
    partners,
    loading,
    stats,
    filters,
    filterActions,
    refreshData: loadInitialData,
  };
};
