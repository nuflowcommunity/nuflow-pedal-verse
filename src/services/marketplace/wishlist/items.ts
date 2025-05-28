
import { supabase } from '@/integrations/supabase/client';

// Add product to wishlist
export const addToWishlist = async (wishlistId: string, productId: string, notes?: string) => {
  const { data, error } = await supabase
    .from('wishlist_items')
    .insert({
      wishlist_id: wishlistId,
      product_id: productId,
      notes
    })
    .select()
    .single();

  if (error) {
    console.error('Error adding to wishlist:', error);
    throw error;
  }

  return data;
};

// Remove product from wishlist
export const removeFromWishlist = async (wishlistId: string, productId: string) => {
  const { error } = await supabase
    .from('wishlist_items')
    .delete()
    .eq('wishlist_id', wishlistId)
    .eq('product_id', productId);

  if (error) {
    console.error('Error removing from wishlist:', error);
    throw error;
  }

  return true;
};

// Check if product is in any wishlist
export const checkProductInWishlist = async (productId: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from('wishlist_items')
    .select(`
      *,
      wishlists(id, name)
    `)
    .eq('product_id', productId)
    .eq('wishlists.user_id', user.id);

  if (error && error.code !== 'PGRST116') {
    console.error('Error checking wishlist status:', error);
    return [];
  }

  return data || [];
};
