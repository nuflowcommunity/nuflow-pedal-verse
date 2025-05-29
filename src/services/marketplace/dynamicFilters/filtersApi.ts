
import { supabase } from '@/integrations/supabase/client';
import { DynamicFilter } from './types';

// Buscar filtros dinâmicos ativos
export const fetchDynamicFilters = async (category?: string): Promise<DynamicFilter[]> => {
  let query = supabase
    .from('dynamic_filters')
    .select('*')
    .eq('is_active', true)
    .order('usage_count', { ascending: false });

  if (category) {
    query = query.or(`category.eq.${category},category.is.null`);
  }

  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching dynamic filters:', error);
    return [];
  }

  return (data || []).map(item => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    type: item.type as 'text' | 'select' | 'range' | 'checkbox',
    category: item.category,
    options: Array.isArray(item.options) 
      ? item.options.filter(opt => typeof opt === 'string') as string[]
      : undefined,
    is_active: item.is_active,
    is_ai_suggested: item.is_ai_suggested,
    confidence_score: item.confidence_score,
    usage_count: item.usage_count,
    admin_approved: item.admin_approved,
    created_at: item.created_at,
    updated_at: item.updated_at
  }));
};
