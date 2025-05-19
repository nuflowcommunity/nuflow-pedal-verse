
import React from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BikeSearch = () => {
  return (
    <div className="w-full md:w-auto">
      <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm w-full">
        <div className="relative w-full mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" size={20} />
          <input 
            type="text" 
            placeholder="O que você procura?" 
            className="w-full pl-10 pr-4 py-3 rounded bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-nuflow-lime"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <select className="px-4 py-2 rounded bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-nuflow-lime">
            <option value="">Categoria</option>
            <option value="MTB">MTB</option>
            <option value="Speed">Speed</option>
            <option value="Gravel">Gravel</option>
            <option value="Urbano">Urbano</option>
          </select>
          <select className="px-4 py-2 rounded bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-nuflow-lime">
            <option value="">Marca</option>
            <option value="Specialized">Specialized</option>
            <option value="Trek">Trek</option>
            <option value="Cannondale">Cannondale</option>
            <option value="Scott">Scott</option>
          </select>
        </div>
        <Button className="w-full mt-3 bg-nuflow-lime text-nuflow-moss hover:bg-nuflow-lime/90">
          Buscar
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default BikeSearch;
