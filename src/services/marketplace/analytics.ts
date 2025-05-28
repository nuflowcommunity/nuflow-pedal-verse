
import { supabase } from '@/integrations/supabase/client';

// Update product views
export const updateProductViews = async (productId: string) => {
  // First get current views
  const { data: currentProduct } = await supabase
    .from('products')
    .select('views')
    .eq('id', productId)
    .single();

  if (currentProduct) {
    const { error } = await supabase
      .from('products')
      .update({ views: (currentProduct.views || 0) + 1 })
      .eq('id', productId);

    if (error) {
      console.error('Error updating views:', error);
    }
  }
};
