
import { supabase } from '@/integrations/supabase/client';

// Fetch user's wishlists
export const fetchUserWishlists = async () => {
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
export const fetchWishlistById = async (id: string) => {
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
export const fetchWishlistByToken = async (token: string) => {
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

// Get public wishlists
export const fetchPublicWishlists = async (limit = 12) => {
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
