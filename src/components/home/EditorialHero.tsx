
import React, { useEffect, useState } from 'react';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-trailflow-white via-trailflow-accent/30 to-trailflow-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(132,176,103,0.15),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(38,38,38,0.05),transparent_50%)]"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-trailflow-green/10 rounded-full editorial-float"></div>
      <div className="absolute bottom-32 right-16 w-24 h-24 bg-trailflow-accent rounded-lg editorial-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-5 w-16 h-16 bg-trailflow-green/20 rounded-full editorial-float" style={{ animationDelay: '4s' }}></div>
      
      <div className="container-modern relative z-10">
        <div className="asymmetric-grid min-h-[80vh] items-center">
          
          {/* Main Title Block - Asymmetric Position */}
          <div className={`asymmetric-card-1 editorial-breakout ${isLoaded ? 'editorial-enter' : 'opacity-0'}`}>
            <div className="relative">
              <h1 className="editorial-title-mega text-trailflow-dark leading-none">
                <span className="block editorial-text-reveal">Trail</span>
                <span className="block text-trailflow-green editorial-text-reveal" style={{ animationDelay: '0.3s' }}>Flow</span>
              </h1>
              
              {/* Dynamic Phrase */}
              <div className="relative mt-8 overflow-hidden">
                <h2 
                  className={`editorial-subtitle text-trailflow-green font-bold transition-all duration-500 ${
                    visible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'
                  }`}
                >
                  {phrases[currentPhrase]}
                </h2>
              </div>
            </div>
          </div>
          
          {/* Description Block - Overlapping */}
          <div className={`asymmetric-card-2 bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl ${isLoaded ? 'editorial-enter-delayed' : 'opacity-0'}`}>
            <p className="text-xl text-trailflow-dark leading-relaxed mb-6">
              A plataforma completa para ciclistas.{' '}
              <span className="text-trailflow-green font-semibold">
                Descubra trilhas épicas, equipamentos únicos e uma comunidade apaixonada.
              </span>
            </p>
            
            {/* Interactive Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center editorial-morph p-4 bg-trailflow-accent/50 rounded-lg">
                <div className="text-2xl font-bold text-trailflow-green">500+</div>
                <div className="text-sm text-trailflow-medium">Trilhas</div>
              </div>
              <div className="text-center editorial-morph p-4 bg-trailflow-accent/50 rounded-lg">
                <div className="text-2xl font-bold text-trailflow-green">2k+</div>
                <div className="text-sm text-trailflow-medium">Ciclistas</div>
              </div>
            </div>
          </div>
          
          {/* CTA Block - Prominent Position */}
          <div className={`asymmetric-card-3 ${isLoaded ? 'editorial-enter-delayed-2' : 'opacity-0'}`}>
            <div className="space-y-4">
              <Button 
                size="xl" 
                className="group editorial-ripple w-full font-bold text-lg px-8 py-6 bg-trailflow-green hover:bg-trailflow-green-dark transform hover:scale-105 transition-all duration-300"
                asChild
              >
                <a href="/roles">
                  <Sparkles size={20} className="mr-2 editorial-float" />
                  Explorar Trilhas
                  <ArrowRight size={20} className="ml-2 transition-transform duration-300 group-hover:translate-x-2" />
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                size="xl"
                className="group w-full font-semibold text-lg px-8 py-6 border-2 border-trailflow-green hover:bg-trailflow-green hover:text-white transition-all duration-300"
                asChild
              >
                <a href="/market">
                  <Play size={18} className="mr-2" />
                  Ver Marketplace
                </a>
              </Button>
            </div>
          </div>
          
          {/* Additional Stats Block - Creative Position */}
          <div className={`asymmetric-card-4 bg-gradient-to-br from-trailflow-green to-trailflow-green-dark text-white p-6 rounded-xl ${isLoaded ? 'editorial-diagonal' : 'opacity-0'}`}>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold">1k+</div>
                <div className="text-sm opacity-90">Produtos</div>
              </div>
              <div>
                <div className="text-3xl font-bold">50+</div>
                <div className="text-sm opacity-90">Eventos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${isMobile ? 'hidden' : 'block'}`}>
        <div className="flex flex-col items-center space-y-2">
          <div className="text-xs text-trailflow-medium font-medium uppercase tracking-wider">Descubra mais</div>
          <div className="w-px h-16 bg-gradient-to-b from-trailflow-green to-transparent"></div>
          <div className="w-3 h-3 bg-trailflow-green rounded-full editorial-float"></div>
        </div>
      </div>
    </section>
  );
};

export default EditorialHero;
