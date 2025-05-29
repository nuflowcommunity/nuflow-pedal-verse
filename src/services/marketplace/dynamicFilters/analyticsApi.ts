
import { supabase } from '@/integrations/supabase/client';
import { ProductAttribute } from './types';

// Rastrear uso de filtro
export const trackFilterUsage = async (
  filterId: string,
  filterValue: string,
  searchContext?: any,
  resultsCount?: number
): Promise<void> => {
  try {
    await supabase
      .from('filter_usage_analytics')
      .insert({
        filter_id: filterId,
        filter_value: filterValue,
        search_context: searchContext,
        results_count: resultsCount,
        session_id: sessionStorage.getItem('session_id') || 'anonymous'
      });
  } catch (error) {
    console.error('Error tracking filter usage:', error);
  }
};

// Buscar atributos do produto
export const fetchProductAttributes = async (productId: string): Promise<ProductAttribute[]> => {
  const { data, error } = await supabase
    .from('product_attributes')
    .select(`
      *,
      dynamic_filters (
        id, name, type, options
      )
    `)
    .eq('product_id', productId);

  if (error) {
    console.error('Error fetching product attributes:', error);
    return [];
  }

  return data || [];
};
