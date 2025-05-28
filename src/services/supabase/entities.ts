import { supabase } from '@/integrations/supabase/client';
import { Entity, EntityType, EntityStatus } from '@/components/admin/entities/types';

// Mapear dados do Supabase para o formato da aplicação
export const mapSupabaseEntityToEntity = (entity: any): Entity => {
  const baseEntity = {
    id: entity.id,
    type: entity.type as EntityType,
    partner: entity.partners?.name || 'N/A',
    name: entity.name,
    status: entity.status as EntityStatus,
    createdAt: new Date(entity.created_at).toLocaleDateString('pt-BR'),
    price: entity.price || 0,
    salesLast24h: 0, // Será calculado separadamente
    salesMonthly: 0, // Será calculado separadamente 
    salesTotal: 0, // Será calculado separadamente
  };

  // Adicionar campos específicos por tipo
  switch (entity.type) {
    case 'evento':
      return {
        ...baseEntity,
        type: 'evento',
        capacity: entity.entity_events?.capacity,
        date: entity.entity_events?.date ? new Date(entity.entity_events.date).toLocaleDateString('pt-BR') : undefined,
        location: entity.entity_events?.location,
        registrations: entity.entity_events?.registrations,
      };
    case 'mensalidade':
      return {
        ...baseEntity,
        type: 'mensalidade',
        duration: entity.entity_subscriptions?.duration,
        renewalDate: entity.entity_subscriptions?.renewal_date ? new Date(entity.entity_subscriptions.renewal_date).toLocaleDateString('pt-BR') : undefined,
        includedCredits: entity.entity_subscriptions?.included_credits,
      };
    case 'dayUse':
      return {
        ...baseEntity,
        type: 'dayUse',
        validFor: entity.entity_day_use?.valid_for,
        accessDate: entity.entity_day_use?.access_date ? new Date(entity.entity_day_use.access_date).toLocaleDateString('pt-BR') : undefined,
      };
    case 'credito':
      return {
        ...baseEntity,
        type: 'credito',
        totalCredits: entity.entity_credits?.total_credits,
        usedCredits: entity.entity_credits?.used_credits,
        expiryDate: entity.entity_credits?.expiry_date ? new Date(entity.entity_credits.expiry_date).toLocaleDateString('pt-BR') : undefined,
        validationStatus: entity.entity_credits?.validation_status,
      };
    default:
      return baseEntity as Entity;
  }
};

// Buscar todas as entidades
export const fetchEntities = async (): Promise<Entity[]> => {
  try {
    const { data, error } = await supabase
      .from('entities')
      .select(`
        *,
        partners(name, email),
        entity_events(*),
        entity_subscriptions(*),
        entity_day_use(*),
        entity_credits(*)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching entities:', error);
      return [];
    }

    return data?.map(mapSupabaseEntityToEntity) || [];
  } catch (error) {
    console.error('Unexpected error fetching entities:', error);
    return [];
  }
};

// Buscar entidades por tipo
export const fetchEntitiesByType = async (type: EntityType): Promise<Entity[]> => {
  try {
    const { data, error } = await supabase
      .from('entities')
      .select(`
        *,
        partners(name, email),
        entity_events(*),
        entity_subscriptions(*),
        entity_day_use(*),
        entity_credits(*)
      `)
      .eq('type', type)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching entities by type:', error);
      return [];
    }

    return data?.map(mapSupabaseEntityToEntity) || [];
  } catch (error) {
    console.error('Unexpected error fetching entities by type:', error);
    return [];
  }
};

// Buscar parceiros
export const fetchPartners = async () => {
  try {
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .eq('status', 'ativo')
      .order('name');

    if (error) {
      console.error('Error fetching partners:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching partners:', error);
    return [];
  }
};

// Buscar estatísticas das entidades
export const fetchEntityStats = async () => {
  try {
    const { data, error } = await supabase.rpc('get_entity_stats');

    if (error) {
      console.error('Error fetching entity stats:', error);
      return {
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
      };
    }

    const stats = data?.[0] || {
      total_entities: 0,
      active_entities: 0,
      pending_entities: 0,
      cancelled_entities: 0,
      total_revenue: 0,
    };
    
    // Buscar contagens por tipo
    const { data: typeCounts } = await supabase
      .from('entities')
      .select('type')
      .eq('status', 'ativo');

    const typeStats = (typeCounts || []).reduce((acc: any, entity: any) => {
      acc[entity.type] = (acc[entity.type] || 0) + 1;
      return acc;
    }, {});

    // Buscar problemas de validação
    const { data: validationIssues } = await supabase
      .from('entity_credits')
      .select('id')
      .eq('validation_status', 'failed');

    const totalRevenue = Number(stats.total_revenue || 0);

    return {
      total: Number(stats.total_entities || 0),
      ativo: Number(stats.active_entities || 0),
      pendente: Number(stats.pending_entities || 0),
      cancelado: Number(stats.cancelled_entities || 0),
      eventos: typeStats.evento || 0,
      mensalidades: typeStats.mensalidade || 0,
      dayUse: typeStats.dayUse || 0,
      creditos: typeStats.credito || 0,
      validationIssues: validationIssues?.length || 0,
      salesLast24h: totalRevenue * 0.1, // Mock calculation
      salesCurrentMonth: totalRevenue * 0.3, // Mock calculation
      salesTotal: totalRevenue,
    };
  } catch (error) {
    console.error('Unexpected error fetching entity stats:', error);
    return {
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
    };
  }
};
