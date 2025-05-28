
import { supabase } from '@/integrations/supabase/client';

// Share wishlist
export const shareWishlist = async (wishlistId: string, email?: string) => {
  // Update wishlist to be shared and get share token
  const { data: wishlist, error: updateError } = await supabase
    .from('wishlists')
    .update({ is_shared: true })
    .eq('id', wishlistId)
    .select('id, name, description, is_shared, share_token')
    .single();

  if (updateError) {
    console.error('Error sharing wishlist:', updateError);
    throw updateError;
  }

  // If email is provided, create a specific share
  if (email) {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .single();

    if (profileError) {
      console.error('User not found:', profileError);
      throw new Error('Usuário não encontrado');
    }

    const { data: { user } } = await supabase.auth.getUser();
    
    // Simplify the insert operation to avoid complex type inference
    const shareData = {
      wishlist_id: wishlistId,
      shared_with_user_id: profile.id,
      shared_by_user_id: user?.id,
      access_level: 'view'
    };

    const { error: shareError } = await supabase
      .from('wishlist_shares')
      .insert(shareData);

    if (shareError) {
      console.error('Error creating share:', shareError);
      throw shareError;
    }
  }

  return wishlist;
};
