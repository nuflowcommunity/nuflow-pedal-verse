
import { useState, useEffect } from 'react';
import { fetchProducts, Product } from '@/services/marketplace/products';
import { ProductFilters, useProductsFilter } from './useProductsFilter';

export const useProductsList = (filters?: ProductFilters) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const memoizedFilters = useProductsFilter(filters);

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
