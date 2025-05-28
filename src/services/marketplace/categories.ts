
import { supabase } from '@/integrations/supabase/client';

// Fetch product categories
export const fetchCategories = async () => {
  const { data, error } = await supabase
    .from('product_categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data || [];
};
