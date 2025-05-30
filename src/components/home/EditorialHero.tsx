
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
      }, 300);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-trailflow-medium">
      {/* Dark Background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-trailflow-medium via-trailflow-dark to-trailflow-medium opacity-90"></div>
      
      {/* Logo Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <img 
          src="/lovable-uploads/adf44db0-c66b-4031-a615-a8e98fe5f77f.png" 
          alt="NuFlow Mountain Logo" 
          className="w-96 h-96 object-contain"
        />
      </div>
      
      {/* Subtle Floating Elements */}
      <div className="absolute top-32 left-16 w-24 h-24 bg-white/10 rounded-full backdrop-blur-sm animate-float"></div>
      <div className="absolute bottom-40 right-20 w-32 h-32 bg-white/5 rounded-lg backdrop-blur-sm animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-8 w-16 h-16 bg-white/15 rounded-full backdrop-blur-sm animate-float" style={{ animationDelay: '4s' }}></div>
      
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl relative z-10">
        <div className="text-center space-y-8">
          
          {/* Logo Integration */}
          <div className={`transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="mb-8 flex justify-center">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/20">
                <img 
                  src="/lovable-uploads/adf44db0-c66b-4031-a615-a8e98fe5f77f.png" 
                  alt="NuFlow Mountain Logo" 
                  className="w-12 h-12 object-contain brightness-0 invert"
                />
              </div>
            </div>
          </div>
          
          {/* Dramatic Typography */}
          <div className={`transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-bold text-white leading-[0.8] tracking-tight mb-6">
              <span className="block">NuFlow</span>
            </h1>
            
            {/* Dynamic Phrase */}
            <div className="relative overflow-hidden mb-8">
              <h2 
                className={`text-2xl sm:text-3xl md:text-4xl text-trailflow-lighter font-light transition-all duration-500 ${
                  visible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'
                }`}
              >
                {phrases[currentPhrase]}
              </h2>
            </div>
          </div>
          
          {/* Description */}
          <div className={`transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-lg sm:text-xl md:text-2xl text-trailflow-light max-w-4xl mx-auto leading-relaxed font-light">
              A plataforma completa para ciclistas.{' '}
              <span className="text-white font-medium">
                Descubra trilhas épicas, equipamentos únicos e uma comunidade apaixonada.
              </span>
            </p>
          </div>
          
          {/* CTAs */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 pt-12 transition-all duration-700 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Button 
              variant="accent" 
              size="lg" 
              className="font-medium shadow-lg"
              asChild
            >
              <a href="/roles">
                Explorar Trilhas
                <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="font-medium border-white/30 text-white hover:bg-white/10"
              asChild
            >
              <a href="/market">
                <Play size={16} className="mr-2" />
                Ver Marketplace
              </a>
            </Button>
          </div>
          
          {/* Stats */}
          <div className={`pt-20 transition-all duration-700 delay-800 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white">500+</div>
                <div className="text-sm sm:text-base text-trailflow-light font-medium">Trilhas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white">2k+</div>
                <div className="text-sm sm:text-base text-trailflow-light font-medium">Ciclistas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white">1k+</div>
                <div className="text-sm sm:text-base text-trailflow-light font-medium">Produtos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white">50+</div>
                <div className="text-sm sm:text-base text-trailflow-light font-medium">Eventos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${isMobile ? 'hidden' : 'block'}`}>
        <div className="flex flex-col items-center space-y-2">
          <div className="text-xs text-trailflow-light font-medium uppercase tracking-wider">Descubra mais</div>
          <div className="w-px h-12 bg-white/30"></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default EditorialHero;
