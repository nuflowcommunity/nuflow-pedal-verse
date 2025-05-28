
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Share2, Edit, Trash2, Plus, ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useWishlist } from '@/hooks/marketplace/useWishlists';
import { useToast } from '@/hooks/use-toast';
import LazyImage from '@/components/ui/lazy-image';
import LoadingTransition from '@/components/ui/loading-transition';
import { cn } from '@/lib/utils';

const WishlistDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { wishlist, loading, removeProduct, shareWishlist } = useWishlist(id);
  const { toast } = useToast();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [shareEmail, setShareEmail] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'novo': return 'bg-emerald-600 text-white';
      case 'usado': return 'bg-blue-600 text-white';
      case 'seminovo': return 'bg-amber-600 text-white';
      default: return 'bg-gray-700 text-white';
    }
  };

  const handleShare = async () => {
    if (!wishlist) return;
    
    try {
      const sharedWishlist = await shareWishlist(shareEmail || undefined);
      if (sharedWishlist?.share_token) {
        const shareUrl = `${window.location.origin}/wishlist/shared/${sharedWishlist.share_token}`;
        await navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link copiado",
          description: "Link de compartilhamento copiado para a área de transferência"
        });
      }
      setIsShareOpen(false);
      setShareEmail('');
    } catch (error) {
      console.error('Error sharing wishlist:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <LoadingTransition />
        </main>
        <Footer />
      </div>
    );
  }

  if (!wishlist) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Lista não encontrada</h2>
            <p className="text-gray-600 mb-4">A lista de desejos que você procura não existe ou foi removida.</p>
            <Button onClick={() => navigate('/wishlists')} className="bg-nuflow-moss text-white">
              Voltar às minhas listas
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="container-custom py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/wishlists')}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft size={16} />
                  Voltar às listas
                </Button>
                
                <div className="border-l pl-4">
                  <h1 className="text-2xl font-bold text-gray-900">{wishlist.name}</h1>
                  {wishlist.description && (
                    <p className="text-gray-600 mt-1">{wishlist.description}</p>
                  )}
                  <div className="flex gap-2 mt-2">
                    {wishlist.is_public && (
                      <Badge variant="secondary" className="text-xs">Pública</Badge>
                    )}
                    {wishlist.is_shared && (
                      <Badge variant="outline" className="text-xs">Compartilhada</Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Dialog open={isShareOpen} onOpenChange={setIsShareOpen}>
                  <Button
                    variant="outline"
                    onClick={() => setIsShareOpen(true)}
                    className="flex items-center gap-2"
                  >
                    <Share2 size={16} />
                    Compartilhar
                  </Button>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Compartilhar Lista de Desejos</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Email (opcional)</label>
                        <Input
                          value={shareEmail}
                          onChange={(e) => setShareEmail(e.target.value)}
                          placeholder="email@exemplo.com"
                          className="mt-2"
                        />
                        <p className="text-xs text-gray-600 mt-1">
                          Deixe em branco para gerar um link público
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleShare} className="flex-1">
                          Compartilhar
                        </Button>
                        <Button variant="outline" onClick={() => setIsShareOpen(false)} className="flex-1">
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button
                  variant="outline"
                  onClick={() => navigate(`/wishlists`)}
                  className="flex items-center gap-2"
                >
                  <Edit size={16} />
                  Editar
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container-custom py-8">
          {!wishlist.items || wishlist.items.length === 0 ? (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Lista vazia</h3>
                <p className="text-gray-600 mb-6">
                  Esta lista ainda não possui produtos. Navegue pelo marketplace e adicione produtos aos seus favoritos.
                </p>
                <Button asChild className="bg-nuflow-moss text-white">
                  <Link to="/marketplace">
                    Explorar Produtos
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlist.items.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
                      <LazyImage
                        src={item.product?.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1544191696-15693be56c23?auto=format&fit=crop&w=800'}
                        alt={item.product?.title || 'Produto'}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        containerClassName="h-full"
                      />
                    </div>
                    
                    <button
                      onClick={() => removeProduct(item.product_id)}
                      className="absolute top-2 right-2 p-2 bg-white/90 hover:bg-white rounded-full shadow-sm transition-all duration-300 hover:scale-110"
                      aria-label="Remover da lista"
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </button>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {item.product?.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={cn("text-xs", getConditionColor(item.product?.condition || ''))}>
                        {item.product?.condition}
                      </Badge>
                      <span className="text-sm text-gray-600">{item.product?.brand}</span>
                    </div>
                    
                    <div className="text-lg font-bold text-nuflow-forest mb-3">
                      {item.product?.price ? formatPrice(item.product.price) : 'Preço não disponível'}
                    </div>
                    
                    {item.notes && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        Nota: {item.notes}
                      </p>
                    )}
                    
                    <Button asChild className="w-full" size="sm">
                      <Link to={`/marketplace/${item.product_id}`} className="flex items-center gap-2">
                        Ver Produto
                        <ExternalLink size={14} />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WishlistDetail;
