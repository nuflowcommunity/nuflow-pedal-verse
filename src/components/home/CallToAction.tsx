
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="bg-nuflow-moss p-8 md:p-12 rounded-lg text-white">
            <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4">
              É dono de loja ou guia?
            </h3>
            <p className="mb-6 text-white/80">
              Torne-se um parceiro Nuflow e amplie seu negócio. 
              Acesse um público qualificado de ciclistas e impulsione suas vendas.
            </p>
            <Link 
              to="/parceiros" 
              className="inline-flex items-center text-nuflow-lime font-medium hover:underline"
            >
              Saiba como se tornar parceiro
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
          
          <div className="bg-nuflow-sand p-8 md:p-12 rounded-lg border border-nuflow-mineral/20">
            <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-nuflow-moss">
              Quer vender sua bike?
            </h3>
            <p className="mb-6 text-nuflow-charcoal/80">
              Anuncie na maior comunidade de ciclistas do Brasil.
              Processo simplificado e seguro para você negociar.
            </p>
            <Link 
              to="/anunciar" 
              className="btn-primary"
            >
              Anunciar agora
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
