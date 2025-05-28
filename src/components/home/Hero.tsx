
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
    <div className="relative bg-gradient-to-br from-nuflow-darkForest via-nuflow-forest to-nuflow-deepGreen text-white overflow-hidden h-screen flex items-center">
      {/* Background with subtle animation */}
      <div className="absolute inset-0 opacity-10 bg-gradient-to-b from-nuflow-mint/20 to-transparent animate-pulse">
      </div>
      
      <div className={`container-custom relative z-10 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="max-w-3xl mx-auto text-center">
          
          <h1 className={`text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 leading-tight flex flex-col md:flex-row items-center justify-center transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="mr-0 md:mr-4 animate-fadeIn" style={{animationDelay: '0.3s'}}>Explore.</span>
            <span className={`transition-all duration-500 ease-in-out ${visible ? 'opacity-100' : 'opacity-0'} ${isMobile ? 'mt-2' : ''}`}>
              {phrases[currentPhrase]}
            </span>
          </h1>
          
          <p className={`text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
             style={{animationDelay: '0.6s'}}>
            Encontre experiências, compre bikes, viva a cultura da bike em um só lugar.
          </p>
          
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} 
                style={{animationDelay: '0.9s'}}>
            <Button size="lg" className="transition-all duration-300 px-8 text-lg rounded-full group bg-nuflow-mint text-nuflow-forest hover:bg-nuflow-emerald hover:text-nuflow-darkForest w-full sm:w-auto animate-hover-scale">
              Descobrir Rolês
              <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            
            <Button size="lg" className="transition-all duration-300 px-8 text-lg rounded-full group bg-nuflow-mint text-nuflow-forest hover:bg-nuflow-emerald hover:text-nuflow-darkForest w-full sm:w-auto animate-hover-scale">
              Visitar Marketplace
              <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-8 h-12 border-2 border-white/60 rounded-full flex items-start justify-center hover:border-nuflow-emerald">
          <div className="w-1.5 h-3 bg-white/60 rounded-full mt-2 animate-scroll-down hover:bg-nuflow-emerald"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
