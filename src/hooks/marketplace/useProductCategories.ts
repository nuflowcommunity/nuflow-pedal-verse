
import { useState, useEffect } from 'react';
import { fetchCategories, ProductCategory } from '@/services/marketplace/products';

export const useProductCategories = () => {
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
