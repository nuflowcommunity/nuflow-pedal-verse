
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative bg-nuflow-moss text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzBoLTYgdi02aDZ2NnptMCAxMmgtNnY2aDZ2LTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
      </div>
      
      <div className="container-custom py-28 md:py-36 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight">
            Explore. Pedale. Conecte.
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto">
            Sua jornada no ciclismo começa aqui. Encontre experiências, 
            equipamentos e uma comunidade apaixonada em um só lugar.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-nuflow-lime text-nuflow-moss hover:bg-nuflow-lime/90 px-8 text-lg">
              Descobrir Rolês
              <ArrowRight size={18} className="ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-nuflow-moss px-8 text-lg">
              Visitar Marketplace
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
