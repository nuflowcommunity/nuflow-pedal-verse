
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ExternalLink, Share2, User } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useWishlist } from '@/hooks/marketplace/useWishlists';
import LazyImage from '@/components/ui/lazy-image';
import LoadingTransition from '@/components/ui/loading-transition';
import { cn } from '@/lib/utils';

const SharedWishlist = () => {
  const { token } = useParams<{ token: string }>();
  const { wishlist, loading } = useWishlist(undefined, token);

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
            <p className="text-gray-600 mb-4">A lista compartilhada que você procura não existe ou foi removida.</p>
            <Button asChild className="bg-nuflow-moss text-white">
              <Link to="/marketplace">Explorar Marketplace</Link>
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
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Share2 size={20} className="text-blue-600" />
                  <span className="text-sm text-blue-600 font-medium">Lista Compartilhada</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{wishlist.name}</h1>
                {wishlist.description && (
                  <p className="text-gray-600 mb-4">{wishlist.description}</p>
                )}
                
                {/* Owner Info */}
                {(wishlist as any).owner && (
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={(wishlist as any).owner.avatar_url} />
                      <AvatarFallback>
                        <User size={16} />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm text-gray-600">
                        Criada por{' '}
                        <span className="font-medium text-gray-900">
                          {(wishlist as any).owner.first_name} {(wishlist as any).owner.last_name}
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  {wishlist.items?.length || 0} {(wishlist.items?.length || 0) === 1 ? 'item' : 'itens'}
                </p>
                <p className="text-xs text-gray-500">
                  Atualizada em {new Date(wishlist.updated_at).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container-custom py-8">
          {!wishlist.items || wishlist.items.length === 0 ? (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Share2 size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Lista vazia</h3>
                <p className="text-gray-600 mb-6">
                  Esta lista ainda não possui produtos.
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
                  <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
                    <LazyImage
                      src={item.product?.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1544191696-15693be56c23?auto=format&fit=crop&w=800'}
                      alt={item.product?.title || 'Produto'}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      containerClassName="h-full"
                    />
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
                    
                    <p className="text-sm text-gray-600 mb-3">
                      📍 {item.product?.location}
                    </p>
                    
                    {item.notes && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2 italic">
                        "{item.notes}"
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

export default SharedWishlist;
