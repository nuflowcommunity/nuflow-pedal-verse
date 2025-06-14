
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PolymerDesignPhilosophy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h3 className="text-2xl md:text-4xl font-light tracking-[0.1em] uppercase text-trailflow-dark mb-8">
        Design Philosophy
      </h3>
      <p className="text-lg text-trailflow-medium font-light leading-relaxed mb-8">
        Nossa filosofia de design combina função e forma em perfeita harmonia. Cada linha, cada curva, 
        cada especificação é cuidadosamente considerada para entregar não apenas performance superior, 
        mas também uma experiência estética que inspira confiança e paixão pelo ciclismo.
      </p>
      <Link 
        to="/sobre" 
        className="inline-flex items-center gap-3 text-trailflow-green hover:text-trailflow-green-dark transition-colors duration-300 text-lg font-light tracking-wide uppercase"
      >
        Read Our Story
        <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  );
};

export default PolymerDesignPhilosophy;
