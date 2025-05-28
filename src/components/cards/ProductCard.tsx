
import React from 'react';
import { MapPin, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import LazyImage from '@/components/ui/lazy-image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  id: string;
  title: string;
  image: string;
  price: string;
  location: string;
  condition: string;
  brand: string;
}

const ProductCard = ({ id, title, image, price, location, condition, brand }: ProductCardProps) => {
  return (
    <div className="card-highlight group bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300">
      <Link to={`/market/${id}`} className="block">
        {/* Image Container with Fixed Aspect Ratio */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <LazyImage 
            src={image} 
            alt={`${title} - ${brand}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            containerClassName="h-full w-full"
          />
          {/* Brand Badge */}
          {brand && (
            <Badge className="absolute top-3 left-3 bg-white/90 text-gray-900 backdrop-blur-sm border-0 font-medium">
              {brand}
            </Badge>
          )}
        </div>
      </Link>
      
      {/* Content Container */}
      <div className="p-4 space-y-3">
        <Link to={`/market/${id}`} className="block group/link">
          <h3 className="font-heading font-semibold text-lg text-gray-900 line-clamp-2 group-hover/link:text-nuflow-forest transition-colors leading-tight">
            {title}
          </h3>
        </Link>
        
        {/* Condition Badge */}
        <Badge 
          variant="outline" 
          className="w-fit text-xs font-medium bg-nuflow-sand border-nuflow-sand/50 text-nuflow-forest"
        >
          {condition}
        </Badge>
        
        {/* Location */}
        <div className="flex items-center text-sm text-gray-600 min-h-[20px]">
          <MapPin size={14} className="mr-1.5 flex-shrink-0" aria-hidden="true" />
          <span className="line-clamp-1 flex-1">{location}</span>
        </div>
        
        {/* Price and Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 min-h-[44px]">
          <span className="font-bold text-xl text-nuflow-forest flex-shrink-0">
            {price}
          </span>
          
          <div className="flex gap-2 ml-3">
            <Button
              variant="ghost"
              size="sm"
              className="p-2 h-10 w-10 rounded-full bg-nuflow-sand hover:bg-nuflow-lime/50 text-nuflow-forest flex-shrink-0"
              aria-label="Enviar mensagem"
            >
              <MessageSquare size={16} />
            </Button>
            <Button 
              asChild
              size="sm"
              className="btn-primary min-h-[40px] px-4 flex-shrink-0"
            >
              <Link to={`/market/${id}`}>
                Comprar
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
