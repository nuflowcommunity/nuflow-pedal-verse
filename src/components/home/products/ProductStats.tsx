
import React from 'react';

interface ProductStatsProps {
  animateProducts: boolean;
}

const ProductStats: React.FC<ProductStatsProps> = ({ animateProducts }) => {
  return (
    <div className={`mt-20 text-center transition-all duration-1000 ease-out ${animateProducts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '800ms' }}>
      <div className="inline-flex items-center gap-12 bg-white/80 backdrop-blur-sm px-16 py-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500">
        <div>
          <div className="text-3xl font-light text-trailflow-green">1.2k+</div>
          <div className="text-sm text-trailflow-medium uppercase tracking-wide">Produtos ativos</div>
        </div>
        <div className="w-px h-16 bg-trailflow-lighter"></div>
        <div>
          <div className="text-3xl font-light text-trailflow-green">98%</div>
          <div className="text-sm text-trailflow-medium uppercase tracking-wide">Satisfação</div>
        </div>
        <div className="w-px h-16 bg-trailflow-lighter"></div>
        <div>
          <div className="text-3xl font-light text-trailflow-green">24h</div>
          <div className="text-sm text-trailflow-medium uppercase tracking-wide">Entrega média</div>
        </div>
      </div>
    </div>
  );
};

export default ProductStats;
