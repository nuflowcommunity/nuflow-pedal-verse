
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MarketHeroProps {
  title: string;
  description: string;
  children?: React.ReactNode;
  showSearchForm?: boolean;
}

const MarketHero = ({ 
  title, 
  description, 
  children,
  showSearchForm = true 
}: MarketHeroProps) => {
  return (
    <section className="bg-nuflow-forest text-white py-12">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-xl mb-8 md:mb-0">
            <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">
              {title}
            </h1>
            <p className="text-white/80 text-lg mb-6">
              {description}
            </p>
            {children}
          </div>
          
          {showSearchForm && (
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm w-full md:w-auto">
              <h3 className="text-xl font-heading font-semibold mb-3">Encontre sua bike ideal</h3>
              <div className="grid grid-cols-2 gap-3">
                <select className="px-4 py-2 rounded bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-nuflow-emerald">
                  <option value="">Categoria</option>
                  <option value="MTB">MTB</option>
                  <option value="Speed">Speed</option>
                  <option value="Gravel">Gravel</option>
                  <option value="Urbano">Urbano</option>
                </select>
                <select className="px-4 py-2 rounded bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-nuflow-emerald">
                  <option value="">Marca</option>
                  <option value="Specialized">Specialized</option>
                  <option value="Trek">Trek</option>
                  <option value="Cannondale">Cannondale</option>
                  <option value="Scott">Scott</option>
                </select>
                <select className="px-4 py-2 rounded bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-nuflow-emerald">
                  <option value="">Tamanho</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
                <select className="px-4 py-2 rounded bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-nuflow-emerald">
                  <option value="">Faixa de preço</option>
                  <option value="1">Até R$ 5.000</option>
                  <option value="2">R$ 5.000 - R$ 10.000</option>
                  <option value="3">R$ 10.000 - R$ 20.000</option>
                  <option value="4">Acima de R$ 20.000</option>
                </select>
              </div>
              <Button className="w-full mt-3 bg-nuflow-mint text-nuflow-forest hover:bg-nuflow-emerald hover:text-nuflow-darkForest">
                Buscar
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MarketHero;
