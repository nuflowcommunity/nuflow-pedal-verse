
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const phrases = ['Pedale.', 'Compre.', 'Conecte.'];

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
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-nuflow-darkForest via-nuflow-forest to-nuflow-deepGreen text-white overflow-hidden">
      {/* Background with subtle animation */}
      <div className="absolute inset-0 opacity-10 bg-gradient-to-b from-nuflow-mint/20 to-transparent animate-pulse"></div>
      
      <div className="container-custom relative z-10 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          
          <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold mb-6 sm:mb-8 leading-tight transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="block sm:inline mr-0 sm:mr-4 animate-fadeIn" style={{animationDelay: '0.3s'}}>
              Explore.
            </span>
            <span className={`block sm:inline transition-all duration-500 ease-in-out ${visible ? 'opacity-100' : 'opacity-0'} mt-2 sm:mt-0`}>
              {phrases[currentPhrase]}
            </span>
          </h1>
          
          <p className={`text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
             style={{animationDelay: '0.6s'}}>
            Encontre experiências, compre bikes, viva a cultura da bike em um só lugar.
          </p>
          
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} 
                style={{animationDelay: '0.9s'}}>
            <Button 
              size="lg" 
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full group bg-nuflow-emerald text-nuflow-forest hover:bg-nuflow-mint hover:text-nuflow-darkForest transition-all duration-300 hover:scale-105 hover:shadow-xl font-semibold"
              asChild
            >
              <a href="/roles">
                Descobrir Rolês
                <ArrowRight size={20} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Button>
            
            <Button 
              size="lg" 
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full group bg-nuflow-emerald text-nuflow-forest hover:bg-nuflow-mint hover:text-nuflow-darkForest transition-all duration-300 hover:scale-105 hover:shadow-xl font-semibold"
              asChild
            >
              <a href="/market">
                Visitar Marketplace
                <ArrowRight size={20} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      </div>
      
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'} hidden sm:block`}>
        <div className="w-8 h-12 border-2 border-white/60 rounded-full flex items-start justify-center hover:border-nuflow-emerald transition-colors duration-300">
          <div className="w-1.5 h-3 bg-white/60 rounded-full mt-2 animate-scroll-down hover:bg-nuflow-emerald transition-colors duration-300"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
