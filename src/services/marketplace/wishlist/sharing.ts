
import { supabase } from '@/integrations/supabase/client';

// Share wishlist
export const shareWishlist = async (wishlistId: string, email?: string) => {
  // First, update wishlist to be shared
  const { data: wishlist, error: updateError } = await supabase
    .from('wishlists')
    .update({ 
      is_shared: true
    })
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
      // Use RPC or simple approach to avoid type inference issues
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email);

      if (!profiles || profiles.length === 0) {
        throw new Error('Usuário não encontrado');
      }

      const profileId = profiles[0].id;

      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Create the share record
      const { error: shareError } = await supabase
        .from('wishlist_shares')
        .insert({
          wishlist_id: wishlistId,
          shared_with_user_id: profileId,
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
