
import { supabase } from '@/integrations/supabase/client';
import type { Wishlist, WishlistItem, CreateWishlistData, UpdateWishlistData } from './types';

// Fetch user's wishlists
export const fetchUserWishlists = async (): Promise<Wishlist[]> => {
  const { data, error } = await supabase
    .from('wishlists')
    .select(`
      *,
      wishlist_items(count)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching wishlists:', error);
    throw error;
  }

  return data?.map((wishlist: any) => ({
    ...wishlist,
    item_count: wishlist.wishlist_items?.[0]?.count || 0
  })) || [];
};

// Fetch single wishlist with items
export const fetchWishlistById = async (id: string): Promise<Wishlist> => {
  const { data, error } = await supabase
    .from('wishlists')
    .select(`
      *,
      wishlist_items(
        *,
        products(
          id, title, price, brand, condition, location,
          product_images(image_url, is_primary)
        )
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching wishlist:', error);
    throw error;
  }

  return {
    ...data,
    items: data.wishlist_items?.map((item: any) => ({
      ...item,
      product: {
        ...item.products,
        images: item.products?.product_images || []
      }
    })) || []
  };
};

// Fetch wishlist by share token
export const fetchWishlistByToken = async (token: string): Promise<any> => {
  const { data, error } = await supabase
    .from('wishlists')
    .select(`
      *,
      wishlist_items(
        *,
        products(
          id, title, price, brand, condition, location,
          product_images(image_url, is_primary)
        )
      ),
      profiles(first_name, last_name, avatar_url)
    `)
    .eq('share_token', token)
    .eq('is_shared', true)
    .single();

  if (error) {
    console.error('Error fetching shared wishlist:', error);
    throw error;
  }

  return {
    ...data,
    items: data.wishlist_items?.map((item: any) => ({
      ...item,
      product: {
        ...item.products,
        images: item.products?.product_images || []
      }
    })) || [],
    owner: data.profiles
  };
};

// Create new wishlist
export const createWishlist = async (data: CreateWishlistData): Promise<Wishlist> => {
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
export const updateWishlist = async (id: string, data: UpdateWishlistData): Promise<Wishlist> => {
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
export const deleteWishlist = async (id: string): Promise<boolean> => {
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

// Add product to wishlist
export const addToWishlist = async (wishlistId: string, productId: string, notes?: string): Promise<WishlistItem> => {
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
export const removeFromWishlist = async (wishlistId: string, productId: string): Promise<boolean> => {
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
export const checkProductInWishlist = async (productId: string): Promise<any[]> => {
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

// Share wishlist
export const shareWishlist = async (wishlistId: string, email?: string): Promise<Wishlist> => {
  // Update wishlist to be shared and get share token
  const { data: wishlist, error: updateError } = await supabase
    .from('wishlists')
    .update({ is_shared: true })
    .eq('id', wishlistId)
    .select()
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
    
    const { error: shareError } = await supabase
      .from('wishlist_shares')
      .insert({
        wishlist_id: wishlistId,
        shared_with_user_id: profile.id,
        shared_by_user_id: user?.id,
        access_level: 'view'
      });

    if (shareError) {
      console.error('Error creating share:', shareError);
      throw shareError;
    }
  }

  return wishlist;
};

// Get public wishlists
export const fetchPublicWishlists = async (limit = 12): Promise<any[]> => {
  const { data, error } = await supabase
    .from('wishlists')
    .select(`
      *,
      profiles(first_name, last_name, avatar_url),
      wishlist_items(count)
    `)
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching public wishlists:', error);
    throw error;
  }

  return data?.map((wishlist: any) => ({
    ...wishlist,
    owner: wishlist.profiles,
    item_count: wishlist.wishlist_items?.[0]?.count || 0
  })) || [];
};
