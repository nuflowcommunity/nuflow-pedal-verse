
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
    bio?: string;
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

export interface ProductFilters {
  category?: string;
  brand?: string;
  condition?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  featured?: boolean;
}
