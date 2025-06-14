
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductsHeaderProps {
  isVisible: boolean;
}

const ProductsHeader: React.FC<ProductsHeaderProps> = ({ isVisible }) => {
  return (
    <div className="text-center mb-20">
      <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <h2 className="text-5xl md:text-7xl font-light text-trailflow-dark leading-none mb-6 uppercase tracking-[0.2em]">
          Market
          <span className="text-trailflow-green block">place</span>
        </h2>
        <p className="text-xl text-trailflow-medium max-w-2xl mx-auto font-light">
          Equipamentos premium e bikes dos sonhos esperando por você
        </p>
      </div>
      
      <Link 
        to="/marketplace" 
        className={`group inline-flex items-center font-medium text-trailflow-green hover:text-trailflow-green-dark transition-all duration-500 mt-8 uppercase tracking-wide text-sm ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{ transitionDelay: '200ms' }}
      >
        Ver Todos os Produtos
        <ArrowRight size={20} className="ml-2 transition-transform duration-300 group-hover:translate-x-2" />
      </Link>
    </div>
  );
};

export default ProductsHeader;
