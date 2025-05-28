
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Share2, 
  MapPin, 
  Eye, 
  Star, 
  Shield, 
  Truck, 
  MessageCircle,
  ArrowLeft,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useProduct } from '@/hooks/marketplace/useProducts';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { product, loading, error, isFavorited, toggleFavorite } = useProduct(id!);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nuflow-moss mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando produto...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Produto não encontrado</h2>
            <p className="text-gray-600 mb-4">O produto que você está procurando não existe ou foi removido.</p>
            <Button onClick={() => navigate('/marketplace')} className="bg-nuflow-moss text-white">
              Voltar ao marketplace
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const images = product.images || [];
  const currentImage = images[currentImageIndex] || {
    image_url: 'https://images.unsplash.com/photo-1544191696-15693be56c23?auto=format&fit=crop&w=800'
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'novo': return 'bg-green-100 text-green-800';
      case 'usado': return 'bg-blue-100 text-blue-800';
      case 'seminovo': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const averageRating = product.reviews && product.reviews.length > 0
    ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
    : 0;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container-custom py-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/marketplace')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={16} />
              Voltar ao marketplace
            </Button>
          </div>
        </div>

        <div className="container-custom py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-[4/3] bg-white rounded-lg overflow-hidden shadow-sm border">
                <img
                  src={currentImage.image_url}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}

                {/* Image counter */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex 
                          ? 'border-nuflow-moss' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image.image_url}
                        alt={`${product.title} - ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    {product.brand}
                  </span>
                  <div className="flex items-center gap-2">
                    <Eye size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">{product.views} visualizações</span>
                  </div>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {product.title}
                </h1>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className={`${getConditionColor(product.condition)}`}>
                    {product.condition.charAt(0).toUpperCase() + product.condition.slice(1)}
                  </Badge>
                  {product.featured && (
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                      Destaque
                    </Badge>
                  )}
                  {product.original_price && product.original_price > product.price && (
                    <Badge variant="destructive">
                      -{Math.round((1 - product.price / product.original_price) * 100)}% OFF
                    </Badge>
                  )}
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.original_price && product.original_price > product.price && (
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(product.original_price)}
                    </span>
                  )}
                </div>

                {/* Reviews */}
                {product.reviews && product.reviews.length > 0 && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${
                            i < Math.floor(averageRating)
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-medium text-gray-900">
                      {averageRating.toFixed(1)}
                    </span>
                    <span className="text-gray-600">
                      ({product.reviews.length} {product.reviews.length === 1 ? 'avaliação' : 'avaliações'})
                    </span>
                  </div>
                )}

                {/* Location */}
                <div className="flex items-center gap-2 text-gray-600 mb-6">
                  <MapPin size={16} />
                  <span>{product.location}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  className="flex-1 bg-nuflow-moss text-white hover:bg-nuflow-moss/90 text-lg py-3"
                  size="lg"
                >
                  <MessageCircle className="mr-2" size={18} />
                  Entrar em contato
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={toggleFavorite}
                  className="px-6"
                >
                  <Heart 
                    size={18} 
                    className={`mr-2 ${isFavorited ? 'text-red-500 fill-red-500' : ''}`} 
                  />
                  {isFavorited ? 'Favoritado' : 'Favoritar'}
                </Button>
                <Button variant="outline" size="lg" className="px-6">
                  <Share2 size={18} className="mr-2" />
                  Compartilhar
                </Button>
              </div>

              {/* Product Details */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Especificações</h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.size && (
                    <div>
                      <span className="text-sm text-gray-600">Tamanho</span>
                      <p className="font-medium">{product.size}</p>
                    </div>
                  )}
                  {product.year && (
                    <div>
                      <span className="text-sm text-gray-600">Ano</span>
                      <p className="font-medium">{product.year}</p>
                    </div>
                  )}
                  {product.color && (
                    <div>
                      <span className="text-sm text-gray-600">Cor</span>
                      <p className="font-medium">{product.color}</p>
                    </div>
                  )}
                  {product.material && (
                    <div>
                      <span className="text-sm text-gray-600">Material</span>
                      <p className="font-medium">{product.material}</p>
                    </div>
                  )}
                  {product.weight && (
                    <div>
                      <span className="text-sm text-gray-600">Peso</span>
                      <p className="font-medium">{product.weight}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-sm text-gray-600">Categoria</span>
                    <p className="font-medium">{product.category}</p>
                  </div>
                </div>
              </div>

              {/* Seller Info */}
              {product.seller && (
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">Vendedor</h3>
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={product.seller.avatar_url} />
                      <AvatarFallback>
                        {product.seller.first_name?.[0]}{product.seller.last_name?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {product.seller.first_name} {product.seller.last_name}
                      </p>
                      <p className="text-sm text-gray-600">Membro desde 2023</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Ver perfil
                    </Button>
                  </div>
                </div>
              )}

              {/* Safety Info */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-start gap-3">
                  <Shield className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">Compra Segura</h4>
                    <p className="text-sm text-blue-800">
                      Sempre teste o produto antes de finalizar a compra e prefira locais públicos para encontros.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {product.description && (
            <div className="mt-12">
              <div className="bg-white rounded-lg p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Descrição</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Reviews */}
          {product.reviews && product.reviews.length > 0 && (
            <div className="mt-12">
              <div className="bg-white rounded-lg p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Avaliações ({product.reviews.length})
                </h2>
                <div className="space-y-6">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={review.user?.avatar_url} />
                          <AvatarFallback>
                            {review.user?.first_name?.[0]}{review.user?.last_name?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-gray-900">
                              {review.user?.first_name} {review.user?.last_name}
                            </span>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  className={`${
                                    i < review.rating
                                      ? 'text-yellow-500 fill-yellow-500'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(review.created_at).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                          {review.comment && (
                            <p className="text-gray-700">{review.comment}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
