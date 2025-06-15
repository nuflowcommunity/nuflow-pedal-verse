
import React, { useEffect, useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const EditorialHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [visible, setVisible] = useState(true);
  const isMobile = useIsMobile();
  const phrases = ['Pedale.', 'Explore.', 'Conecte.', 'Viva.'];

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentPhrase(prev => (prev + 1) % phrases.length);
        setVisible(true);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-trailflow-medium polymer-section-massive">
      {/* Clean Editorial Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-trailflow-medium via-trailflow-medium/95 to-trailflow-dark/80"></div>
      
      {/* Subtle Logo Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.008]">
        <img 
          src="/lovable-uploads/adf44db0-c66b-4031-a615-a8e98fe5f77f.png" 
          alt="NuFlow Mountain Logo" 
          className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px] object-contain" 
          loading="eager"
        />
      </div>
      
      <div className="container-polymer-narrow relative z-10">
        <div className="text-center polymer-center-massive">
          
          {/* Dramatic Typography with Perfect Spacing - Polymer Style */}
          <div className={`transition-all duration-1500 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
            <div className="polymer-text-reveal animate mb-8 md:mb-12 lg:mb-16">
              <h1 className="polymer-text-reveal-inner polymer-heading-xl text-white polymer-ultra-light">
                NuFlow
              </h1>
            </div>
            
            {/* Dynamic Phrase with Perfect Alignment */}
            <div className="relative overflow-hidden mb-16 md:mb-20 lg:mb-24">
              <h2 className={`polymer-heading-md text-white polymer-thin transition-all duration-800 ease-out ${visible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'}`}>
                {phrases[currentPhrase]}
              </h2>
            </div>
          </div>
          
          {/* Description with Perfect Typography */}
          <div className={`transition-all duration-1500 ease-out delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
            <div className="container-polymer-ultra-narrow mb-20 md:mb-24 lg:mb-32">
              <p className="polymer-body-large text-white/95 polymer-light text-center">
                A plataforma completa para ciclistas.{' '}
                <span className="text-white polymer-thin">
                  Descubra trilhas épicas, equipamentos únicos e uma comunidade apaixonada.
                </span>
              </p>
            </div>
          </div>
          
          {/* CTAs with Perfect Touch Targets */}
          <div className={`flex flex-col gap-6 sm:gap-8 mb-20 md:mb-24 lg:mb-32 transition-all duration-1500 ease-out delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
            <Button 
              variant="accent" 
              size="xl" 
              className="font-semibold shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 w-full sm:w-auto min-w-[240px] h-14 text-lg polymer-thin" 
              asChild
            >
              <a href="/roles" className="flex items-center justify-center gap-4">
                Explorar Trilhas
                <ArrowRight size={24} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Button>
            
            <Button 
              variant="outline" 
              size="xl" 
              className="font-semibold border-white/50 text-white hover:bg-white/20 hover:border-white backdrop-blur-sm transition-all duration-300 w-full sm:w-auto min-w-[240px] h-14 text-lg polymer-thin" 
              asChild
            >
              <a href="/market" className="flex items-center justify-center gap-4">
                <Play size={20} />
                Ver Marketplace
              </a>
            </Button>
          </div>
          
          {/* Stats with Perfect Grid - Polymer Minimal */}
          <div className={`transition-all duration-1500 ease-out delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
              <div className="text-center polymer-breathe-xs">
                <div className="polymer-heading-md text-white mb-4 md:mb-6 polymer-ultra-light">500+</div>
                <div className="polymer-body-small text-white/80 polymer-light tracking-widest uppercase">Trilhas</div>
              </div>
              <div className="text-center polymer-breathe-xs">
                <div className="polymer-heading-md text-white mb-4 md:mb-6 polymer-ultra-light">2k+</div>
                <div className="polymer-body-small text-white/80 polymer-light tracking-widest uppercase">Ciclistas</div>
              </div>
              <div className="text-center polymer-breathe-xs">
                <div className="polymer-heading-md text-white mb-4 md:mb-6 polymer-ultra-light">1k+</div>
                <div className="polymer-body-small text-white/80 polymer-light tracking-widest uppercase">Produtos</div>
              </div>
              <div className="text-center polymer-breathe-xs">
                <div className="polymer-heading-md text-white mb-4 md:mb-6 polymer-ultra-light">50+</div>
                <div className="polymer-body-small text-white/80 polymer-light tracking-widest uppercase">Eventos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Scroll Indicator - Mobile Optimized */}
      <div className={`absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 transition-all duration-1800 ease-out delay-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${isMobile ? 'hidden' : 'block'}`}>
        <div className="flex flex-col items-center space-y-6">
          <div className="polymer-body-small text-white/70 polymer-light uppercase tracking-[0.3em] text-center">Descubra mais</div>
          <div className="w-px h-20 md:h-24 bg-white/40"></div>
          <div className="w-3 h-3 bg-white/60 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default EditorialHero;
