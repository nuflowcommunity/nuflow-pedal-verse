
import React from 'react';
import { MapPin, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import LazyImage from '@/components/ui/lazy-image';

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
    <div className="card-highlight group">
      <Link to={`/market/${id}`}>
        <div className="card-tag">{brand}</div>
        <div className="h-48 overflow-hidden">
          <LazyImage 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            containerClassName="h-full"
          />
        </div>
        <div className="p-5">
          <h3 className="font-heading font-semibold text-lg mb-2 line-clamp-1">{title}</h3>
          
          <div className="text-xs inline-block px-2 py-1 bg-nuflow-sand rounded mb-3">
            {condition}
          </div>
          
          <div className="flex items-center text-sm text-nuflow-charcoal/70 mb-3">
            <MapPin size={16} className="mr-1" />
            <span className="line-clamp-1">{location}</span>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <span className="font-semibold text-lg text-nuflow-moss">{price}</span>
            <div className="flex gap-2">
              <button className="p-2 rounded-full bg-nuflow-sand hover:bg-nuflow-lime/50 transition-colors">
                <MessageSquare size={18} />
              </button>
              <button className="btn-primary py-2 px-4">Comprar</button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
