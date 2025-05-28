
import React from 'react';
import { Search, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface MarketplaceHeroProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
}

const MarketplaceHero: React.FC<MarketplaceHeroProps> = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit
}) => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-br from-nuflow-darkForest via-nuflow-forest to-nuflow-charcoal text-white py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40"></div>
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-white drop-shadow-lg">
            Marketplace
          </h1>
          <p className="text-xl text-white/95 mb-8 max-w-2xl mx-auto drop-shadow-md">
            Encontre a bike dos seus sonhos ou venda a sua com segurança na maior comunidade de ciclistas do Brasil
          </p>
          
          {/* Search and Announce Section */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-center mb-6">
            {/* Search Bar */}
            <form onSubmit={onSearchSubmit} className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} aria-hidden="true" />
                <Input
                  type="search"
                  placeholder="Buscar por marca, modelo, categoria..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg rounded-full border-0 shadow-lg text-gray-900 bg-white"
                  aria-label="Buscar produtos no marketplace"
                />
              </div>
            </form>
            
            {/* Announce Button */}
            <Button
              onClick={() => navigate('/anunciar')}
              className="bg-nuflow-lime text-nuflow-darkForest hover:bg-nuflow-emerald hover:text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <Plus size={20} />
              Anunciar
            </Button>
          </div>
          
          <p className="text-white/80 text-sm">
            Tem uma bike para vender? Anuncie gratuitamente e alcance milhares de ciclistas!
          </p>
        </div>
      </div>
    </section>
  );
};

export default MarketplaceHero;
