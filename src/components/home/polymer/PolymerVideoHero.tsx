
import React from 'react';
import { Play, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PolymerVideoHeroProps {
  isVisible: boolean;
}

const PolymerVideoHero: React.FC<PolymerVideoHeroProps> = ({ isVisible }) => {
  return (
    <div className="relative h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-90"
        >
          <source src="https://videos.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" type="video/mp4" />
        </video>
      </div>
      
      {/* Overlay Content */}
      <div className={`relative z-10 text-center text-white transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-light mb-8 tracking-[0.2em] uppercase">
          T R A I L F L O W
        </h1>
        <p className="text-xl md:text-2xl font-light mb-12 tracking-[0.1em] uppercase max-w-2xl mx-auto leading-relaxed">
          Equipment and components for high-performance bicycles
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="group flex items-center gap-3 text-white hover:text-gray-300 transition-all duration-300 text-lg font-light tracking-wide uppercase">
            <Play size={20} className="transition-transform duration-300 group-hover:scale-110" />
            Explore Collection
          </button>
          <div className="w-px h-8 bg-white/30 hidden sm:block"></div>
          <Link 
            to="/marketplace" 
            className="group flex items-center gap-3 text-white hover:text-gray-300 transition-all duration-300 text-lg font-light tracking-wide uppercase"
          >
            Shop Now
            <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default PolymerVideoHero;
