
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-trailflow-medium">
      {/* Clean Editorial Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-trailflow-medium via-trailflow-medium/95 to-trailflow-dark/80"></div>
      
      {/* Subtle Logo Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.015]">
        <img 
          src="/lovable-uploads/adf44db0-c66b-4031-a615-a8e98fe5f77f.png" 
          alt="NuFlow Mountain Logo" 
          className="w-[500px] h-[500px] object-contain" 
        />
      </div>
      
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl relative z-10">
        <div className="text-center space-y-16">
          
          {/* Dramatic Typography */}
          <div className={`transition-all duration-1200 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-bold text-white leading-[0.8] tracking-tight mb-8 font-mono">
              <span className="block">NuFlow</span>
            </h1>
            
            {/* Dynamic Phrase */}
            <div className="relative overflow-hidden mb-16">
              <h2 className={`text-3xl sm:text-4xl md:text-5xl text-white font-light transition-all duration-700 ease-out ${visible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-6'}`}>
                {phrases[currentPhrase]}
              </h2>
            </div>
          </div>
          
          {/* Description */}
          <div className={`transition-all duration-1200 ease-out delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <p className="text-xl sm:text-2xl md:text-3xl text-white/90 max-w-5xl mx-auto leading-relaxed font-light">
              A plataforma completa para ciclistas.{' '}
              <span className="text-white font-medium">
                Descubra trilhas épicas, equipamentos únicos e uma comunidade apaixonada.
              </span>
            </p>
          </div>
          
          {/* CTAs */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 pt-12 transition-all duration-1200 ease-out delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <Button variant="accent" size="lg" className="font-medium shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 px-8 py-4" asChild>
              <a href="/roles">
                Explorar Trilhas
                <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Button>
            
            <Button variant="outline" size="lg" className="font-medium border-white/50 text-white hover:bg-white/20 hover:border-white backdrop-blur-sm transition-all duration-300 px-8 py-4" asChild>
              <a href="/market">
                <Play size={16} className="mr-2" />
                Ver Marketplace
              </a>
            </Button>
          </div>
          
          {/* Stats */}
          <div className={`pt-20 transition-all duration-1200 ease-out delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-white mb-3 font-mono">500+</div>
                <div className="text-base text-white/70 font-medium">Trilhas</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-white mb-3 font-mono">2k+</div>
                <div className="text-base text-white/70 font-medium">Ciclistas</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-white mb-3 font-mono">1k+</div>
                <div className="text-base text-white/70 font-medium">Produtos</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-white mb-3 font-mono">50+</div>
                <div className="text-base text-white/70 font-medium">Eventos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1500 ease-out delay-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${isMobile ? 'hidden' : 'block'}`}>
        <div className="flex flex-col items-center space-y-3">
          <div className="text-xs text-white/60 font-medium uppercase tracking-widest">Descubra mais</div>
          <div className="w-px h-16 bg-white/30"></div>
          <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default EditorialHero;
