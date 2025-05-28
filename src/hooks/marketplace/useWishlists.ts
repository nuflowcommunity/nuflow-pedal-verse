
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  fetchUserWishlists,
  fetchWishlistById,
  fetchWishlistByToken,
  createWishlist,
  updateWishlist,
  deleteWishlist,
  addToWishlist,
  removeFromWishlist,
  checkProductInWishlist,
  shareWishlist,
  fetchPublicWishlists
} from '@/services/marketplace/wishlist/api';
import type { Wishlist, CreateWishlistData, UpdateWishlistData } from '@/services/marketplace/wishlist/types';

export const useWishlists = () => {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const loadWishlists = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchUserWishlists();
      setWishlists(data);
    } catch (err) {
      setError('Erro ao carregar listas de desejos');
      console.error('Error loading wishlists:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWishlists();
  }, []);

  const createNewWishlist = async (data: CreateWishlistData) => {
    try {
      const newWishlist = await createWishlist(data);
      await loadWishlists();
      toast({
        title: "Lista criada",
        description: "Nova lista de desejos criada com sucesso"
      });
      return newWishlist;
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao criar lista de desejos",
        variant: "destructive"
      });
      throw error;
    }
  };

  const updateExistingWishlist = async (id: string, data: UpdateWishlistData) => {
    try {
      const updatedWishlist = await updateWishlist(id, data);
      await loadWishlists();
      toast({
        title: "Lista atualizada",
        description: "Lista de desejos atualizada com sucesso"
      });
      return updatedWishlist;
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao atualizar lista de desejos",
        variant: "destructive"
      });
      throw error;
    }
  };

  const deleteExistingWishlist = async (id: string) => {
    try {
      await deleteWishlist(id);
      await loadWishlists();
      toast({
        title: "Lista removida",
        description: "Lista de desejos removida com sucesso"
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao remover lista de desejos",
        variant: "destructive"
      });
      throw error;
    }
  };

  return {
    wishlists,
    loading,
    error,
    refetch: loadWishlists,
    createWishlist: createNewWishlist,
    updateWishlist: updateExistingWishlist,
    deleteWishlist: deleteExistingWishlist
  };
};

export const useWishlist = (id?: string, token?: string) => {
  const [wishlist, setWishlist] = useState<Wishlist | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const loadWishlist = async () => {
    if (!id && !token) return;
    
    try {
      setLoading(true);
      setError(null);
      let data;
      
      if (token) {
        data = await fetchWishlistByToken(token);
      } else if (id) {
        data = await fetchWishlistById(id);
      }
      
      setWishlist(data || null);
    } catch (err) {
      setError('Erro ao carregar lista de desejos');
      console.error('Error loading wishlist:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, [id, token]);

  const addProductToWishlist = async (productId: string, notes?: string) => {
    if (!wishlist) return;
    
    try {
      await addToWishlist(wishlist.id, productId, notes);
      await loadWishlist();
      toast({
        title: "Produto adicionado",
        description: "Produto adicionado à lista de desejos"
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao adicionar produto à lista",
        variant: "destructive"
      });
    }
  };

  const removeProductFromWishlist = async (productId: string) => {
    if (!wishlist) return;
    
    try {
      await removeFromWishlist(wishlist.id, productId);
      await loadWishlist();
      toast({
        title: "Produto removido",
        description: "Produto removido da lista de desejos"
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao remover produto da lista",
        variant: "destructive"
      });
    }
  };

  const shareWishlistWithToken = async (email?: string) => {
    if (!wishlist) return;
    
    try {
      const sharedWishlist = await shareWishlist(wishlist.id, email);
      setWishlist({ ...wishlist, ...sharedWishlist });
      toast({
        title: "Lista compartilhada",
        description: "Lista de desejos compartilhada com sucesso"
      });
      return sharedWishlist;
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao compartilhar lista",
        variant: "destructive"
      });
      throw error;
    }
  };

  return {
    wishlist,
    loading,
    error,
    refetch: loadWishlist,
    addProduct: addProductToWishlist,
    removeProduct: removeProductFromWishlist,
    shareWishlist: shareWishlistWithToken
  };
};

export const useProductWishlistStatus = (productId: string) => {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const checkStatus = async () => {
    try {
      setLoading(true);
      const data = await checkProductInWishlist(productId);
      setWishlistItems(data || []);
    } catch (error) {
      console.error('Error checking wishlist status:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      checkStatus();
    }
  }, [productId]);

  return {
    wishlistItems,
    loading,
    isInWishlist: wishlistItems.length > 0,
    refetch: checkStatus
  };
};

export const usePublicWishlists = (limit = 12) => {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPublicWishlists = async () => {
      try {
        const data = await fetchPublicWishlists(limit);
        setWishlists(data);
      } catch (error) {
        console.error('Error loading public wishlists:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPublicWishlists();
  }, [limit]);

  return { wishlists, loading };
};
