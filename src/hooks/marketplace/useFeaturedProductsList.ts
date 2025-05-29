
import { useState, useEffect } from 'react';
import { fetchFeaturedProducts, Product } from '@/services/marketplace/products';

export const useFeaturedProductsList = (limit = 8) => {
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
