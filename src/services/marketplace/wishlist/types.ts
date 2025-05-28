
export interface Wishlist {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  is_public: boolean;
  is_shared: boolean;
  share_token?: string;
  created_at: string;
  updated_at: string;
  items?: WishlistItem[];
  item_count?: number;
}

export interface WishlistItem {
  id: string;
  wishlist_id: string;
  product_id: string;
  notes?: string;
  created_at: string;
  product?: {
    id: string;
    title: string;
    price: number;
    brand: string;
    condition: string;
    location: string;
    images?: Array<{ image_url: string }>;
  };
}

export interface WishlistShare {
  id: string;
  wishlist_id: string;
  shared_with_user_id?: string;
  shared_by_user_id: string;
  access_level: 'view' | 'edit';
  created_at: string;
}

export interface CreateWishlistData {
  name: string;
  description?: string;
  is_public?: boolean;
}

export interface UpdateWishlistData {
  name?: string;
  description?: string;
  is_public?: boolean;
  is_shared?: boolean;
}
