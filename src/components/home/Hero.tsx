import React, { useEffect, useState } from 'react';
import { ArrowRight, MapPin, Users, Package, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const phrases = ['Pedale.', 'Explore.', 'Conecte.'];

const Hero = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const isMobile = useIsMobile();

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
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-trailflow-white via-trailflow-accent/30 to-trailflow-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(132,176,103,0.1),transparent_50%)]"></div>
      
      <div className="container-modern relative z-10 text-center">
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Main Heading */}
          <div className={`transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-trailflow-dark leading-none tracking-tight mb-4">
              <span className="block animate-fade-in">
                TrailFlow
              </span>
              <span 
                className={`block text-trailflow-green transition-all duration-500 ease-in-out ${
                  visible ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-4'
                }`}
              >
                {phrases[currentPhrase]}
              </span>
            </h1>
          </div>
          
          {/* Description */}
          <div className={`transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-trailflow-medium max-w-4xl mx-auto leading-relaxed font-light">
              A plataforma completa para ciclistas.{' '}
              <span className="text-trailflow-green font-medium">
                Descubra trilhas, compre equipamentos, conecte-se com a comunidade.
              </span>
            </p>
          </div>
          
          {/* CTA Buttons - Improved Design */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-12 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Primary Button - More Prominent */}
            <Button 
              size="xl" 
              className="group font-semibold text-lg px-12 py-5 h-auto hover:shadow-2xl bg-trailflow-green text-gray-900 hover:bg-trailflow-green-dark border-2 border-trailflow-green hover:border-trailflow-green-dark transition-all duration-300 hover:scale-[1.02] w-full sm:w-auto"
              asChild
            >
              <a href="/roles">
                Explorar Trilhas
                <ArrowRight size={20} className="ml-3 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Button>
            
            {/* Secondary Button - More Subtle */}
            <Button 
              variant="outline" 
              size="xl"
              className="group font-medium text-lg px-12 py-5 h-auto border-2 border-trailflow-green text-trailflow-green bg-white/90 hover:bg-trailflow-green hover:text-gray-900 hover:shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-[1.01] w-full sm:w-auto"
              asChild
            >
              <a href="/marketplace">
                Ver Marketplace
              </a>
            </Button>
          </div>
          
          {/* Stats */}
          <div className={`pt-16 transition-all duration-700 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <MapPin size={20} className="text-trailflow-green" />
                  <div className="text-3xl sm:text-4xl font-bold text-trailflow-green">500+</div>
                </div>
                <div className="text-sm sm:text-base text-trailflow-light font-medium">Trilhas</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users size={20} className="text-trailflow-green" />
                  <div className="text-3xl sm:text-4xl font-bold text-trailflow-green">2k+</div>
                </div>
                <div className="text-sm sm:text-base text-trailflow-light font-medium">Ciclistas</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Package size={20} className="text-trailflow-green" />
                  <div className="text-3xl sm:text-4xl font-bold text-trailflow-green">1k+</div>
                </div>
                <div className="text-sm sm:text-base text-trailflow-light font-medium">Produtos</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Calendar size={20} className="text-trailflow-green" />
                  <div className="text-3xl sm:text-4xl font-bold text-trailflow-green">50+</div>
                </div>
                <div className="text-sm sm:text-base text-trailflow-light font-medium">Eventos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-700 delay-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'} hide-mobile`}>
        <div className="flex flex-col items-center space-y-2">
          <div className="text-xs text-trailflow-light font-medium uppercase tracking-wider">Scroll</div>
          <div className="w-px h-12 bg-trailflow-lighter"></div>
          <div className="w-2 h-2 bg-trailflow-green rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
