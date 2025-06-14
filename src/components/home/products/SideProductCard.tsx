
import React from 'react';
import { Heart, Star } from 'lucide-react';

interface SideProductCardProps {
  product: {
    id: string;
    title: string;
    image: string;
    price: number;
    originalPrice?: number;
    location: string;
    condition: string;
    brand: string;
    category: string;
    rating: number;
    discount?: number;
  };
  animateProducts: boolean;
  index: number;
  formatPrice: (price: number) => string;
}

const SideProductCard: React.FC<SideProductCardProps> = ({
  product,
  animateProducts,
  index,
  formatPrice,
}) => {
  return (
    <div 
      className={`transition-all duration-1000 ease-out ${animateProducts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${(index + 1) * 200}ms` }}
    >
      <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 relative h-full">
        {product.discount && (
          <div className="absolute top-3 right-3 z-10">
            <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              -{product.discount}%
            </div>
          </div>
        )}
        
        <div className="relative h-48 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all duration-200 hover:scale-110">
              <Heart size={16} className="text-trailflow-green" />
            </button>
          </div>
        </div>
        
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-trailflow-accent text-trailflow-green px-2 py-1 rounded text-xs font-medium uppercase tracking-wide">
              {product.category}
            </span>
            <div className="flex items-center">
              <Star size={12} className="text-yellow-400 mr-1" fill="currentColor" />
              <span className="text-xs">{product.rating}</span>
            </div>
          </div>
          
          <h4 className="font-light text-lg text-trailflow-dark mb-2 uppercase tracking-wide group-hover:text-trailflow-green transition-colors duration-300 line-clamp-2 flex-1">
            {product.title}
          </h4>
          
          <p className="text-xs text-trailflow-medium mb-4 font-light">{product.condition}</p>
          
          <div className="flex items-center justify-between mt-auto">
            <div className="flex flex-col">
              <div className="text-xl font-light text-trailflow-green">
                {formatPrice(product.price)}
              </div>
              {product.originalPrice && (
                <div className="text-xs text-trailflow-light line-through">
                  {formatPrice(product.originalPrice)}
                </div>
              )}
            </div>
            <button className="bg-trailflow-green text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-trailflow-green-dark transition-all duration-300 hover:shadow-md uppercase tracking-wide">
              Ver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideProductCard;
