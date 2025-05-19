
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const phrases = ['Pedale.', 'Compre.', 'Conecte.'];

const Hero = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentPhrase(prev => (prev + 1) % phrases.length);
        setVisible(true);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Custom cursor effect
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };
    document.addEventListener('mousemove', moveCursor);
    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.body.removeChild(cursor);
    };
  }, []);

  return <div className="relative bg-[#1c2b1f] text-white overflow-hidden h-screen flex items-center">
      {/* Removed the background pattern with mountain silhouette */}
      <div className="absolute inset-0 opacity-10">
        {/* Removed the textured background */}
      </div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 leading-tight flex flex-col md:flex-row items-center justify-center">
            <span className="mr-0 md:mr-4">Explore.</span>
            <span className={`transition-opacity duration-500 ease-in-out ${visible ? 'opacity-100' : 'opacity-0'}`}>
              {phrases[currentPhrase]}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto">
            Encontre experiências, compre bikes, viva a cultura da bike em um só lugar.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="transition-all duration-300 px-8 text-lg rounded-full group bg-[#497052] bg-[#c5e7cf] text-[#2f302c] hover:text-[#0aea3e]">
              Descobrir Rolês
              <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            
            <Button size="lg" className="transition-all duration-300 px-8 text-lg rounded-full group bg-[#497052] bg-[#c5e7cf] text-[#2f302c] hover:text-[#0aea3e]">
              Visitar Marketplace
              <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-white/60 rounded-full flex items-start justify-center hover:border-[#0aea3e]">
          <div className="w-1.5 h-3 bg-white/60 rounded-full mt-2 animate-scroll-down hover:bg-[#0aea3e]"></div>
        </div>
      </div>
    </div>;
};

export default Hero;
