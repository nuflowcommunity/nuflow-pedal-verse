import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Heart, Eye, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import LazyImage from '@/components/ui/lazy-image';
import ComparisonButton from './ComparisonButton';

interface Product {
  id: string;
  title: string;
  brand?: string;
  price: number;
  original_price?: number;
  condition: string;
  location: string;
  images?: Array<{ id: string; image_url: string }>;
  views?: number;
  featured?: boolean;
  reviews?: Array<{ rating: number }>;
}

interface ProductCardProps {
  product: Product;
  className?: string;
  isFavorited?: boolean;
  onToggleFavorite?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  className,
  isFavorited = false,
  onToggleFavorite
}) => {
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

  const averageRating = product.reviews && product.reviews.length > 0
    ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
    : 0;

  const mainImage = product.images?.[0]?.image_url || 
    'https://images.unsplash.com/photo-1544191696-15693be56c23?auto=format&fit=crop&w=800';

  const isListView = className?.includes('flex-row');

  return (
    <div className={cn(
      "card-highlight group bg-white",
      isListView ? "flex flex-row" : "flex flex-col",
      className
    )}>
      {/* Image Section */}
      <div className={cn(
        "relative overflow-hidden",
        isListView ? "w-64 flex-shrink-0" : "aspect-[4/3]"
      )}>
        <Link to={`/marketplace/${product.id}`} className="block h-full">
          <LazyImage
            src={mainImage}
            alt={`${product.title} - ${product.brand}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            containerClassName="h-full"
          />
        </Link>
        
        {/* Brand Badge */}
        {product.brand && (
          <div className="card-tag">
            {product.brand}
          </div>
        )}
        
        {/* Featured Badge */}
        {product.featured && (
          <Badge className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
            Destaque
          </Badge>
        )}
        
        {/* Favorite Button */}
        {onToggleFavorite && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite();
            }}
            className="absolute bottom-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-sm transition-all duration-300 hover:scale-110 focus:outline-none focus:scale-110 focus:shadow-lg"
            aria-label={isFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          >
            <Heart 
              size={18} 
              className={cn(
                "transition-colors",
                isFavorited ? "text-red-500 fill-red-500" : "text-gray-600"
              )}
            />
          </button>
        )}
      </div>

      {/* Content Section */}
      <div className={cn(
        "flex flex-col",
        isListView ? "flex-1 p-6" : "p-5"
      )}>
        {/* Header */}
        <div className="flex-1">
          <Link to={`/marketplace/${product.id}`} className="block group/link">
            <h3 className="font-heading font-semibold text-lg text-gray-900 mb-2 line-clamp-2 group-hover/link:text-nuflow-forest transition-colors">
              {product.title}
            </h3>
          </Link>
          
          {/* Condition Badge */}
          <Badge 
            variant="outline" 
            className={cn("mb-3 text-xs font-medium border-0", getConditionColor(product.condition))}
          >
            {product.condition.charAt(0).toUpperCase() + product.condition.slice(1)}
          </Badge>
          
          {/* Rating */}
          {averageRating > 0 && (
            <div className="flex items-center gap-1 mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={cn(
                      i < Math.floor(averageRating)
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-700 ml-1">
                ({product.reviews?.length})
              </span>
            </div>
          )}
          
          {/* Location */}
          <div className="flex items-center text-sm text-gray-700 mb-3">
            <MapPin size={16} className="mr-1 flex-shrink-0" aria-hidden="true" />
            <span className="line-clamp-1">{product.location}</span>
          </div>
          
          {/* Views */}
          {product.views && (
            <div className="flex items-center text-xs text-gray-600 mb-3">
              <Eye size={14} className="mr-1" aria-hidden="true" />
              <span>{product.views} visualizações</span>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          {/* Price */}
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-xl text-nuflow-forest">
                {formatPrice(product.price)}
              </span>
              {product.original_price && product.original_price > product.price && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.original_price)}
                </span>
              )}
            </div>
            {product.original_price && product.original_price > product.price && (
              <Badge variant="destructive" className="text-xs w-fit mt-1">
                -{Math.round((1 - product.price / product.original_price) * 100)}% OFF
              </Badge>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col gap-2">
            <Button 
              asChild
              className="btn-primary px-4 py-2 text-sm"
            >
              <Link to={`/marketplace/${product.id}`}>
                Ver detalhes
              </Link>
            </Button>
            <ComparisonButton 
              product={product} 
              size="sm"
              className="text-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
