
import { supabase } from '@/integrations/supabase/client';

// Share wishlist
export const shareWishlist = async (wishlistId: string, email?: string) => {
  // First, update wishlist to be shared
  const { data: wishlist, error: updateError } = await supabase
    .from('wishlists')
    .update({ 
      is_shared: true as boolean 
    } as { is_shared: boolean })
    .eq('id', wishlistId)
    .select('id, name, description, is_shared, share_token')
    .single();

  if (updateError) {
    console.error('Error sharing wishlist:', updateError);
    throw updateError;
  }

  // If email is provided, create a specific share
  if (email) {
    try {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .maybeSingle();

      if (profileError) {
        console.error('User not found:', profileError);
        throw new Error('Usuário não encontrado');
      }

      if (!profile) {
        throw new Error('Usuário não encontrado');
      }

      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Create the share record
      const { error: shareError } = await supabase
        .from('wishlist_shares')
        .insert({
          wishlist_id: wishlistId,
          shared_with_user_id: profile.id,
          shared_by_user_id: user.id,
          access_level: 'view'
        });

      if (shareError) {
        console.error('Error creating share:', shareError);
        throw shareError;
      }
    } catch (error) {
      console.error('Error in email sharing process:', error);
      throw error;
    }
  }

  return wishlist;
};
