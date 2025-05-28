
import { supabase } from '@/integrations/supabase/client';
import type { Product, ProductFilters } from './types';

// Fetch all products with filters
export const fetchProducts = async (filters?: ProductFilters) => {
  let query = supabase
    .from('products')
    .select(`
      *,
      product_images(id, product_id, image_url, is_primary, sort_order)
    `)
    .eq('status', 'ativo')
    .order('created_at', { ascending: false });

  if (filters?.category) {
    query = query.eq('category', filters.category);
  }
  
  if (filters?.brand) {
    query = query.eq('brand', filters.brand);
  }
  
  if (filters?.condition) {
    query = query.eq('condition', filters.condition);
  }
  
  if (filters?.location) {
    query = query.ilike('location', `%${filters.location}%`);
  }
  
  if (filters?.minPrice) {
    query = query.gte('price', filters.minPrice);
  }
  
  if (filters?.maxPrice) {
    query = query.lte('price', filters.maxPrice);
  }
  
  if (filters?.search) {
    query = query.or(`title.ilike.%${filters.search}%,brand.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
  }
  
  if (filters?.featured) {
    query = query.eq('featured', true);
  }

  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data?.map((product: any) => ({
    ...product,
    images: product.product_images || []
  })) || [];
};

// Fetch single product with full details
export const fetchProductById = async (id: string) => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images(id, product_id, image_url, is_primary, sort_order),
      product_reviews(
        id, rating, comment, created_at, user_id
      )
    `)
    .eq('id', id)
    .eq('status', 'ativo')
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  // Fetch seller profile separately
  let seller = null;
  if (data.seller_id) {
    const { data: profileData } = await supabase
      .from('profiles')
      .select('first_name, last_name, avatar_url, bio')
      .eq('id', data.seller_id)
      .single();
    
    seller = profileData;
  }

  // Process reviews to include user profiles
  const reviewsWithUsers = await Promise.all(
    (data.product_reviews || []).map(async (review: any) => {
      const { data: userData } = await supabase
        .from('profiles')
        .select('first_name, last_name, avatar_url')
        .eq('id', review.user_id)
        .single();
      
      return {
        ...review,
        user: userData
      };
    })
  );

  return {
    ...data,
    images: data.product_images || [],
    reviews: reviewsWithUsers,
    seller
  };
};

// Fetch featured products
export const fetchFeaturedProducts = async (limit = 8) => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images(id, product_id, image_url, is_primary, sort_order)
    `)
    .eq('status', 'ativo')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }

  return data?.map((product: any) => ({
    ...product,
    images: product.product_images || []
  })) || [];
};
