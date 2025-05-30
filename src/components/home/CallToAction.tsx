
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-32 bg-gradient-to-br from-trailflow-medium via-trailflow-medium/95 to-trailflow-dark relative overflow-hidden">
      {/* Background overlay for smooth transition */}
      <div className="absolute inset-0 bg-gradient-to-t from-trailflow-dark/20 to-transparent"></div>
      
      <div className="container mx-auto px-8 sm:px-12 lg:px-16 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Partner Section */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 hover:bg-white transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-trailflow-dark leading-tight">
              É dono de loja ou guia?
            </h3>
            <p className="text-xl text-trailflow-medium mb-8 leading-relaxed">
              Torne-se um parceiro NuFlow e amplie seu negócio. 
              Acesse um público qualificado de ciclistas e impulsione suas vendas.
            </p>
            <Link 
              to="/parceiros" 
              className="inline-flex items-center text-lg font-semibold text-trailflow-green hover:text-trailflow-dark transition-colors duration-300 group"
            >
              Saiba como se tornar parceiro
              <ArrowRight size={20} className="ml-3 transition-transform duration-300 group-hover:translate-x-2" />
            </Link>
          </div>
          
          {/* Sell Bike Section */}
          <div className="bg-trailflow-green/90 backdrop-blur-sm rounded-3xl p-12 text-white hover:bg-trailflow-green transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Quer vender sua bike?
            </h3>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Anuncie na maior comunidade de ciclistas do Brasil.
              Processo simplificado e seguro para você negociar.
            </p>
            <Link 
              to="/anunciar" 
              className="inline-flex items-center bg-white text-trailflow-green px-8 py-4 rounded-xl font-semibold text-lg hover:bg-trailflow-lighter transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group"
            >
              Anunciar agora
              <ArrowRight size={20} className="ml-3 transition-transform duration-300 group-hover:translate-x-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
