
import React from 'react';

const PolymerPerformanceSection: React.FC = () => {
  return (
    <div className="relative h-96 md:h-[500px] overflow-hidden mb-32">
      <img 
        src="https://images.unsplash.com/photo-1502744688674-c619d1586c9e?auto=format&fit=crop&w=1920&q=80" 
        alt="Performance in Motion"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <div className="text-center text-white">
          <h3 className="text-4xl md:text-6xl font-light tracking-[0.15em] uppercase mb-4">
            Performance<br />in Motion
          </h3>
          <p className="text-lg font-light tracking-wide max-w-md mx-auto">
            Desenvolvido para ciclistas que buscam o máximo desempenho em qualquer terreno
          </p>
        </div>
      </div>
    </div>
  );
};

export default PolymerPerformanceSection;
