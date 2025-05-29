
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  fetchProductById, 
  addToFavorites,
  removeFromFavorites,
  checkIfFavorited,
  updateProductViews,
  Product
} from '@/services/marketplace/products';

export const useSingleProduct = (id: string) => {
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
