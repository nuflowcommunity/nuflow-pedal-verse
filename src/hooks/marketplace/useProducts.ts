
import { useState, useEffect, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  fetchProducts, 
  fetchProductById, 
  fetchCategories, 
  fetchFeaturedProducts,
  addToFavorites,
  removeFromFavorites,
  checkIfFavorited,
  updateProductViews,
  Product,
  ProductCategory
} from '@/services/marketplace/products';

export interface ProductFilters {
  search?: string;
  category?: string;
  brand?: string;
  condition?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  year?: number;
}

export const useProducts = (filters?: ProductFilters) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoize filters to prevent unnecessary re-renders
  const memoizedFilters = useMemo(() => {
    if (!filters) return undefined;
    
    // Clean filters - remove undefined/empty values
    const cleanFilters: ProductFilters = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        cleanFilters[key as keyof ProductFilters] = value;
      }
    });
    
    return Object.keys(cleanFilters).length > 0 ? cleanFilters : undefined;
  }, [filters]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Loading products with filters:', memoizedFilters);
      const data = await fetchProducts(memoizedFilters);
      console.log('Products loaded:', data?.length || 0);
      setProducts(data || []);
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Erro ao carregar produtos');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [memoizedFilters]);

  return {
    products,
    loading,
    error,
    refetch: loadProducts
  };
};

export const useProduct = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const { toast } = useToast();

  const loadProduct = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      console.log('Loading product:', id);
      const data = await fetchProductById(id);
      
      if (data) {
        setProduct(data);
        
        // Update views
        try {
          await updateProductViews(id);
        } catch (viewError) {
          console.warn('Failed to update product views:', viewError);
        }
        
        // Check if favorited
        try {
          const favorited = await checkIfFavorited(id);
          setIsFavorited(favorited);
        } catch (favError) {
          console.warn('Failed to check favorite status:', favError);
          setIsFavorited(false);
        }
      } else {
        setError('Produto não encontrado');
      }
    } catch (err) {
      console.error('Error loading product:', err);
      setError('Erro ao carregar produto');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const toggleFavorite = async () => {
    if (!id) return;
    
    try {
      if (isFavorited) {
        await removeFromFavorites(id);
        setIsFavorited(false);
        toast({
          title: "Removido dos favoritos",
          description: "Produto removido da sua lista de favoritos"
        });
      } else {
        await addToFavorites(id);
        setIsFavorited(true);
        toast({
          title: "Adicionado aos favoritos",
          description: "Produto adicionado à sua lista de favoritos"
        });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar favoritos",
        variant: "destructive"
      });
    }
  };

  return {
    product,
    loading,
    error,
    isFavorited,
    toggleFavorite,
    refetch: loadProduct
  };
};

export const useCategories = () => {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        console.log('Loading categories...');
        const data = await fetchCategories();
        console.log('Categories loaded:', data?.length || 0);
        setCategories(data || []);
      } catch (error) {
        console.error('Error loading categories:', error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return { categories, loading };
};

export const useFeaturedProducts = (limit = 8) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        console.log('Loading featured products...');
        const data = await fetchFeaturedProducts(limit);
        console.log('Featured products loaded:', data?.length || 0);
        setProducts(data || []);
      } catch (error) {
        console.error('Error loading featured products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadFeatured();
  }, [limit]);

  return { products, loading };
};
