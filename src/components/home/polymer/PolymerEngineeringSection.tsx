
import React from 'react';

interface PolymerEngineeringSectionProps {
  isVisible: boolean;
}

const PolymerEngineeringSection: React.FC<PolymerEngineeringSectionProps> = ({ isVisible }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
      <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
        <h2 className="text-4xl md:text-6xl font-light mb-8 tracking-[0.15em] uppercase text-trailflow-dark leading-none">
          Engineering<br />
          Excellence
        </h2>
        <p className="text-xl text-trailflow-medium font-light leading-relaxed mb-8">
          Cada componente é desenvolvido com precisão milimétrica, combinando tecnologia de ponta 
          com décadas de experiência em ciclismo de alta performance.
        </p>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-trailflow-green"></div>
            <span className="text-sm font-light tracking-wider uppercase text-trailflow-medium">Carbon Fiber Technology</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-trailflow-green"></div>
            <span className="text-sm font-light tracking-wider uppercase text-trailflow-medium">Aerodynamic Optimization</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-trailflow-green"></div>
            <span className="text-sm font-light tracking-wider uppercase text-trailflow-medium">Precision Manufacturing</span>
          </div>
        </div>
      </div>
      
      <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`} style={{ transitionDelay: '200ms' }}>
        <div className="aspect-square overflow-hidden bg-gray-100 group cursor-pointer">
          <img 
            src="https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=800" 
            alt="Engineering Excellence"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default PolymerEngineeringSection;
