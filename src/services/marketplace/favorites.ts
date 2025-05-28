
import { supabase } from '@/integrations/supabase/client';

// Add to favorites
export const addToFavorites = async (productId: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('favorites')
    .insert({ 
      product_id: productId,
      user_id: user.id 
    })
    .select();

  if (error) {
    console.error('Error adding to favorites:', error);
    throw error;
  }

  return data?.[0];
};

// Remove from favorites
export const removeFromFavorites = async (productId: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('product_id', productId)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error removing from favorites:', error);
    throw error;
  }

  return true;
};

// Check if product is favorited
export const checkIfFavorited = async (productId: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return false;
  }

  const { data, error } = await supabase
    .from('favorites')
    .select('id')
    .eq('product_id', productId)
    .eq('user_id', user.id)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error checking favorite status:', error);
    return false;
  }

  return !!data;
};
