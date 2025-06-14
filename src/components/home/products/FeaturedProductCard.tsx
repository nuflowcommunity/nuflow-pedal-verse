
import React from 'react';
import { Heart, ShoppingCart, Star, Zap } from 'lucide-react';

interface FeaturedProductCardProps {
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
    featured: boolean;
  };
  animateProducts: boolean;
  formatPrice: (price: number) => string;
}

const FeaturedProductCard: React.FC<FeaturedProductCardProps> = ({
  product,
  animateProducts,
  formatPrice,
}) => {
  return (
    <div className={`lg:col-span-2 transition-all duration-1000 ease-out ${animateProducts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
      <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 relative">
        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-6 left-6 z-20">
            <div className="flex items-center gap-2 bg-trailflow-green text-white px-4 py-2 rounded-full font-medium text-sm uppercase tracking-wide">
              <Zap size={16} />
              Destaque
            </div>
          </div>
        )}
        
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-6 right-6 z-20">
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              -{product.discount}%
            </div>
          </div>
        )}
        
        <div className="grid lg:grid-cols-2 h-full">
          {/* Image Section */}
          <div className="relative h-80 lg:h-auto overflow-hidden">
            <img 
              src={product.image} 
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:from-transparent"></div>
            
            {/* Action Buttons */}
            <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
              <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-all duration-300 hover:scale-110">
                <Heart size={20} className="text-trailflow-green" />
              </button>
              <button className="bg-trailflow-green text-white p-3 rounded-full hover:bg-trailflow-green-dark transition-all duration-300 hover:scale-110">
                <ShoppingCart size={20} />
              </button>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-trailflow-accent text-trailflow-green px-3 py-1 rounded-full text-sm font-medium uppercase tracking-wide">
                  {product.category}
                </span>
                <div className="flex items-center">
                  <Star size={16} className="text-yellow-400 mr-1" fill="currentColor" />
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-light text-trailflow-dark mb-3 uppercase tracking-wide leading-tight group-hover:text-trailflow-green transition-colors duration-300">
                {product.title}
              </h3>
              
              <p className="text-trailflow-medium mb-2 font-light">{product.condition}</p>
              <p className="text-sm text-trailflow-light mb-6">{product.location}</p>
            </div>
            
            <div>
              <div className="flex items-end gap-3 mb-6">
                <div className="text-3xl md:text-4xl font-light text-trailflow-green">
                  {formatPrice(product.price)}
                </div>
                {product.originalPrice && (
                  <div className="text-lg text-trailflow-light line-through">
                    {formatPrice(product.originalPrice)}
                  </div>
                )}
              </div>
              
              <button className="w-full bg-trailflow-green text-white py-4 rounded-2xl font-medium text-lg hover:bg-trailflow-green-dark transition-all duration-300 hover:shadow-lg uppercase tracking-wide">
                Ver Detalhes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductCard;
