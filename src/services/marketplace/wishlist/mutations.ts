
import { supabase } from '@/integrations/supabase/client';
import type { CreateWishlistData, UpdateWishlistData } from './types';

// Create new wishlist
export const createWishlist = async (data: CreateWishlistData) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data: wishlist, error } = await supabase
    .from('wishlists')
    .insert({
      ...data,
      user_id: user.id
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating wishlist:', error);
    throw error;
  }

  return wishlist;
};

// Update wishlist
export const updateWishlist = async (id: string, data: UpdateWishlistData) => {
  const { data: wishlist, error } = await supabase
    .from('wishlists')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating wishlist:', error);
    throw error;
  }

  return wishlist;
};

// Delete wishlist
export const deleteWishlist = async (id: string) => {
  const { error } = await supabase
    .from('wishlists')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting wishlist:', error);
    throw error;
  }

  return true;
};
