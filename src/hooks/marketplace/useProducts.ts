
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  fetchProducts, 
  fetchProductById, 
  fetchCategories, 
  fetchFeaturedProducts,
  addToFavorites,
  removeFromFavorites,
  checkIfFavorited,
  Product,
  ProductCategory
} from '@/services/marketplace/products';

export interface ProductFilters {
  category?: string;
  brand?: string;
  condition?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  featured?: boolean;
}

export const useProducts = (filters?: ProductFilters) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts(filters);
      setProducts(data);
    } catch (err) {
      setError('Erro ao carregar produtos');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [JSON.stringify(filters)]);

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
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProductById(id);
      setProduct(data);
      
      if (data) {
        const favorited = await checkIfFavorited(id);
        setIsFavorited(favorited);
      }
    } catch (err) {
      setError('Erro ao carregar produto');
      console.error('Error loading product:', err);
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
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error loading categories:', error);
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
        const data = await fetchFeaturedProducts(limit);
        setProducts(data);
      } catch (error) {
        console.error('Error loading featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeatured();
  }, [limit]);

  return { products, loading };
};
