
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-trailflow-medium pt-20">
      {/* Clean Editorial Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-trailflow-medium via-trailflow-medium/95 to-trailflow-dark/80"></div>
      
      {/* Subtle Logo Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.015]">
        <img 
          src="/lovable-uploads/adf44db0-c66b-4031-a615-a8e98fe5f77f.png" 
          alt="NuFlow Mountain Logo" 
          className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] object-contain" 
        />
      </div>
      
      <div className="container-wide relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8 md:space-y-12 lg:space-y-16">
          
          {/* Dramatic Typography with Perfect Spacing */}
          <div className={`transition-all duration-1200 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black text-white leading-[0.85] tracking-tight mb-6 md:mb-8 font-mono text-center">
              NuFlow
            </h1>
            
            {/* Dynamic Phrase with Perfect Alignment */}
            <div className="relative overflow-hidden mb-12 md:mb-16">
              <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-light transition-all duration-700 ease-out text-center ${visible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-6'}`}>
                {phrases[currentPhrase]}
              </h2>
            </div>
          </div>
          
          {/* Description with Perfect Typography */}
          <div className={`transition-all duration-1200 ease-out delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="max-w-5xl mx-auto mb-16 md:mb-20">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/95 leading-relaxed font-light text-center px-4">
                A plataforma completa para ciclistas.{' '}
                <span className="text-white font-medium">
                  Descubra trilhas épicas, equipamentos únicos e uma comunidade apaixonada.
                </span>
              </p>
            </div>
          </div>
          
          {/* CTAs with Perfect Alignment */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mb-16 md:mb-20 transition-all duration-1200 ease-out delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <Button 
              variant="accent" 
              size="lg" 
              className="font-semibold shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 px-8 py-4 text-base md:text-lg w-full sm:w-auto" 
              asChild
            >
              <a href="/roles" className="flex items-center justify-center gap-3">
                Explorar Trilhas
                <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="font-semibold border-white/50 text-white hover:bg-white/20 hover:border-white backdrop-blur-sm transition-all duration-300 px-8 py-4 text-base md:text-lg w-full sm:w-auto" 
              asChild
            >
              <a href="/market" className="flex items-center justify-center gap-3">
                <Play size={18} />
                Ver Marketplace
              </a>
            </Button>
          </div>
          
          {/* Stats with Perfect Grid */}
          <div className={`transition-all duration-1200 ease-out delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 lg:gap-16 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 md:mb-6 font-mono leading-none">500+</div>
                <div className="text-base md:text-lg text-white/80 font-medium tracking-wide">Trilhas</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 md:mb-6 font-mono leading-none">2k+</div>
                <div className="text-base md:text-lg text-white/80 font-medium tracking-wide">Ciclistas</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 md:mb-6 font-mono leading-none">1k+</div>
                <div className="text-base md:text-lg text-white/80 font-medium tracking-wide">Produtos</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 md:mb-6 font-mono leading-none">50+</div>
                <div className="text-base md:text-lg text-white/80 font-medium tracking-wide">Eventos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Scroll Indicator */}
      <div className={`absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 transition-all duration-1500 ease-out delay-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${isMobile ? 'hidden' : 'block'}`}>
        <div className="flex flex-col items-center space-y-4">
          <div className="text-sm text-white/70 font-medium uppercase tracking-[0.2em] text-center">Descubra mais</div>
          <div className="w-px h-16 md:h-20 bg-white/40"></div>
          <div className="w-3 h-3 bg-white/60 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default EditorialHero;
