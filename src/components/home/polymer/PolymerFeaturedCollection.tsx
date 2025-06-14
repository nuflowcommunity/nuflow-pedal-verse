
import React from 'react';
import { ChevronRight } from 'lucide-react';

interface PolymerFeaturedCollectionProps {
  isVisible: boolean;
}

const PolymerFeaturedCollection: React.FC<PolymerFeaturedCollectionProps> = ({ isVisible }) => {
  const products = [
    {
      id: '1',
      name: 'Enhance Carbon Pro',
      category: 'Performance Wheelset',
      image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=800',
      specs: ['50mm depth', 'Carbon fiber', '1,420g'],
      price: 'R$ 8.500'
    },
    {
      id: '2',
      name: 'Venture Gravel System',
      category: 'Adventure Setup',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800',
      specs: ['Tubeless ready', 'All-terrain', '1,680g'],
      price: 'R$ 6.200'
    },
    {
      id: '3',
      name: 'Urban Flow Hub',
      category: 'City Components',
      image: 'https://images.unsplash.com/photo-1502744688674-c619d1586c9e?auto=format&fit=crop&w=800',
      specs: ['Silent operation', 'Sealed bearings', '285g'],
      price: 'R$ 1.850'
    }
  ];

  return (
    <div className="mb-32">
      <div className="text-center mb-16">
        <h3 className="text-3xl md:text-5xl font-light tracking-[0.1em] uppercase text-trailflow-dark mb-4">
          Featured Collection
        </h3>
        <p className="text-lg text-trailflow-medium font-light">
          Componentes selecionados para performance excepcional
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <div 
            key={product.id}
            className={`group cursor-pointer transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ transitionDelay: `${300 + index * 100}ms` }}
          >
            <div className="aspect-square overflow-hidden mb-6 bg-gray-50">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-90"
              />
            </div>
            
            <div className="text-center">
              <span className="text-xs font-light tracking-widest uppercase text-trailflow-light mb-2 block">
                {product.category}
              </span>
              <h4 className="text-xl font-light tracking-wide uppercase text-trailflow-dark mb-4 group-hover:text-trailflow-green transition-colors duration-300">
                {product.name}
              </h4>
              
              <div className="space-y-1 mb-4">
                {product.specs.map((spec, specIndex) => (
                  <div key={specIndex} className="text-sm text-trailflow-medium font-light">
                    {spec}
                  </div>
                ))}
              </div>
              
              <div className="text-lg font-light text-trailflow-dark mb-4">
                {product.price}
              </div>
              
              <button className="group/btn flex items-center justify-center gap-2 text-sm font-light tracking-wider uppercase text-trailflow-medium hover:text-trailflow-green transition-colors duration-300 mx-auto">
                View Specs
                <ChevronRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PolymerFeaturedCollection;
