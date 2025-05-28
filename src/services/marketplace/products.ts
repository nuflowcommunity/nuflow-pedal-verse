
import { supabase } from '@/integrations/supabase/client';

export interface Product {
  id: string;
  title: string;
  description?: string;
  short_description?: string;
  price: number;
  original_price?: number;
  brand: string;
  category: string;
  subcategory?: string;
  condition: string;
  size?: string;
  color?: string;
  year?: number;
  material?: string;
  weight?: string;
  location: string;
  city?: string;
  state?: string;
  seller_id: string;
  status: string;
  featured: boolean;
  views: number;
  created_at: string;
  updated_at: string;
  images?: ProductImage[];
  reviews?: ProductReview[];
  seller?: {
    first_name?: string;
    last_name?: string;
    avatar_url?: string;
  };
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  is_primary: boolean;
  sort_order: number;
}

export interface ProductReview {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  comment?: string;
  created_at: string;
  user?: {
    first_name?: string;
    last_name?: string;
    avatar_url?: string;
  };
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  parent_id?: string;
  description?: string;
  image_url?: string;
  sort_order: number;
  is_active: boolean;
}

// Fetch all products with filters
export const fetchProducts = async (filters?: {
  category?: string;
  brand?: string;
  condition?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  featured?: boolean;
}) => {
  let query = supabase
    .from('products')
    .select(`
      *,
      product_images(id, product_id, image_url, is_primary, sort_order),
      profiles:seller_id(first_name, last_name, avatar_url)
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
    images: product.product_images || [],
    seller: product.profiles
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
        id, rating, comment, created_at,
        profiles:user_id(first_name, last_name, avatar_url)
      ),
      profiles:seller_id(first_name, last_name, avatar_url, bio, location)
    `)
    .eq('id', id)
    .eq('status', 'ativo')
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  return {
    ...data,
    images: data.product_images || [],
    reviews: data.product_reviews?.map((review: any) => ({
      ...review,
      user: review.profiles
    })) || [],
    seller: data.profiles
  };
};

// Fetch product categories
export const fetchCategories = async () => {
  const { data, error } = await supabase
    .from('product_categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data || [];
};

// Fetch featured products
export const fetchFeaturedProducts = async (limit = 8) => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_images(id, product_id, image_url, is_primary, sort_order),
      profiles:seller_id(first_name, last_name, avatar_url)
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
    images: product.product_images || [],
    seller: product.profiles
  })) || [];
};

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

// Update product views
export const updateProductViews = async (productId: string) => {
  const { error } = await supabase
    .from('products')
    .update({ views: supabase.sql`views + 1` })
    .eq('id', productId);

  if (error) {
    console.error('Error updating views:', error);
  }
};
