
import React from 'react';
import { Button } from "@/components/ui/button";
import { CalendarIcon } from 'lucide-react';

const EventsHero = () => {
  return (
    <section className="bg-gradient-to-r from-nuflow-moss to-nuflow-green py-16 md:py-24">
      <div className="container-custom text-white">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Calendário de Eventos
          </h1>
          <p className="text-lg text-white/90 mb-8">
            Descubra os melhores rolês pelas trilhas mais incríveis do Brasil.
            Escolha sua aventura e pedale com os melhores guias.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              size="lg" 
              className="bg-nuflow-lime text-nuflow-moss hover:bg-white hover:text-nuflow-neon transition-all"
            >
              <CalendarIcon className="mr-2" size={20} />
              Ver Calendário
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/20 transition-all"
            >
              Encontre seu rolê ideal
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsHero;
