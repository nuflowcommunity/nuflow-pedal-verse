
import React from 'react';

interface BottomProductCardProps {
  product: {
    id: string;
    title: string;
    image: string;
    price: number;
    location: string;
    condition: string;
    brand: string;
    category: string;
    rating: number;
  };
  animateProducts: boolean;
  formatPrice: (price: number) => string;
}

const BottomProductCard: React.FC<BottomProductCardProps> = ({
  product,
  animateProducts,
  formatPrice,
}) => {
  return (
    <div className={`lg:col-span-4 transition-all duration-1000 ease-out ${animateProducts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '600ms' }}>
      <div className="bg-gradient-to-r from-trailflow-green to-trailflow-green-dark text-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group">
        <div className="grid lg:grid-cols-4 items-center">
          <div className="lg:col-span-1 h-40 lg:h-auto">
            <img 
              src={product.image} 
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="lg:col-span-2 p-8">
            <h4 className="text-2xl md:text-3xl font-light mb-2 uppercase tracking-wide">{product.title}</h4>
            <p className="text-white/90 mb-2 font-light">{product.condition}</p>
            <p className="text-sm text-white/70">{product.location}</p>
          </div>
          <div className="lg:col-span-1 p-8 text-right">
            <div className="text-3xl md:text-4xl font-light mb-6">{formatPrice(product.price)}</div>
            <button className="bg-white text-trailflow-green px-8 py-3 rounded-xl font-medium hover:bg-trailflow-accent transition-all duration-300 hover:shadow-lg uppercase tracking-wide">
              Ver Produto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomProductCard;
