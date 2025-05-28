
import React, { useState } from 'react';
import { Heart, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useWishlists, useProductWishlistStatus } from '@/hooks/marketplace/useWishlists';
import { addToWishlist, removeFromWishlist } from '@/services/marketplace/wishlist/api';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface WishlistButtonProps {
  productId: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  showText?: boolean;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({
  productId,
  variant = 'outline',
  size = 'sm',
  className,
  showText = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWishlistId, setSelectedWishlistId] = useState<string>('');
  const { wishlists } = useWishlists();
  const { wishlistItems, isInWishlist, refetch } = useProductWishlistStatus(productId);
  const { toast } = useToast();

  const handleAddToWishlist = async () => {
    if (!selectedWishlistId) return;

    try {
      await addToWishlist(selectedWishlistId, productId);
      await refetch();
      setIsOpen(false);
      setSelectedWishlistId('');
      toast({
        title: "Produto adicionado",
        description: "Produto adicionado à lista de desejos"
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao adicionar à lista de desejos",
        variant: "destructive"
      });
    }
  };

  const handleRemoveFromWishlist = async (wishlistId: string) => {
    try {
      await removeFromWishlist(wishlistId, productId);
      await refetch();
      toast({
        title: "Produto removido",
        description: "Produto removido da lista de desejos"
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao remover da lista de desejos",
        variant: "destructive"
      });
    }
  };

  if (isInWishlist) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant={variant}
            size={size}
            className={cn(
              "text-red-600 border-red-600 hover:bg-red-50",
              className
            )}
          >
            <Heart size={16} className="fill-red-600 mr-1" />
            {showText && "Na lista"}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Produto nas listas</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Este produto está nas seguintes listas de desejos:
            </p>
            {wishlistItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                <span className="font-medium">{item.wishlists.name}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveFromWishlist(item.wishlist_id)}
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  Remover
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={cn("transition-colors", className)}
        >
          <Heart size={16} className="mr-1" />
          {showText && "Favoritar"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar à lista de desejos</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Selecione uma lista:</label>
            <Select value={selectedWishlistId} onValueChange={setSelectedWishlistId}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Escolha uma lista de desejos" />
              </SelectTrigger>
              <SelectContent>
                {wishlists.map((wishlist) => (
                  <SelectItem key={wishlist.id} value={wishlist.id}>
                    {wishlist.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {wishlists.length === 0 && (
            <p className="text-sm text-gray-600">
              Você ainda não tem listas de desejos. Crie uma nova lista primeiro.
            </p>
          )}
          
          <div className="flex gap-2 pt-4">
            <Button
              onClick={handleAddToWishlist}
              disabled={!selectedWishlistId}
              className="flex-1"
            >
              <Plus size={16} className="mr-1" />
              Adicionar
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WishlistButton;
