
import React from 'react';
import { Heart, MapPin, Eye, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/services/marketplace/products';

interface ProductCardProps {
  product: Product;
  onFavorite?: () => void;
  isFavorited?: boolean;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onFavorite,
  isFavorited = false,
  className = ''
}) => {
  const primaryImage = product.images?.find(img => img.is_primary) || product.images?.[0];
  const imageUrl = primaryImage?.image_url || 'https://images.unsplash.com/photo-1544191696-15693be56c23?auto=format&fit=crop&w=600';
  
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

  return (
    <div className={`group relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${className}`}>
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
        <img
          src={imageUrl}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Overlay buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {onFavorite && (
            <Button
              size="sm"
              variant="secondary"
              className="w-8 h-8 p-0 rounded-full bg-white/90 hover:bg-white shadow-sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onFavorite();
              }}
            >
              <Heart 
                size={16} 
                className={`transition-colors ${isFavorited ? 'text-red-500 fill-red-500' : 'text-gray-600'}`}
              />
            </Button>
          )}
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.featured && (
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium">
              Destaque
            </Badge>
          )}
          <Badge className={`font-medium ${getConditionColor(product.condition)}`}>
            {product.condition.charAt(0).toUpperCase() + product.condition.slice(1)}
          </Badge>
          {product.original_price && product.original_price > product.price && (
            <Badge variant="destructive" className="font-medium">
              -{Math.round((1 - product.price / product.original_price) * 100)}%
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Brand and Views */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            {product.brand}
          </span>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Eye size={12} />
            {product.views}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
          {product.title}
        </h3>

        {/* Short Description */}
        {product.short_description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.short_description}
          </p>
        )}

        {/* Size and Details */}
        <div className="flex flex-wrap gap-2 mb-3">
          {product.size && (
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
              Tam. {product.size}
            </span>
          )}
          {product.year && (
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
              {product.year}
            </span>
          )}
          {product.color && (
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
              {product.color}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.original_price && product.original_price > product.price && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.original_price)}
            </span>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
          <MapPin size={14} />
          {product.location}
        </div>

        {/* Reviews */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            <span className="font-medium">
              {(product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length).toFixed(1)}
            </span>
            <span className="text-gray-500">
              ({product.reviews.length} {product.reviews.length === 1 ? 'avaliação' : 'avaliações'})
            </span>
          </div>
        )}

        {/* Action Button */}
        <Button 
          className="w-full bg-nuflow-moss text-white hover:bg-nuflow-moss/90 font-medium"
          asChild
        >
          <a href={`/marketplace/produto/${product.id}`}>
            Ver detalhes
          </a>
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
