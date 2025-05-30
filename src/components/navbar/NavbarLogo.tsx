
import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarLogoProps {
  scrolled: boolean;
}

const NavbarLogo = ({ scrolled }: NavbarLogoProps) => {
  return (
    <div className="absolute left-1/2 transform -translate-x-1/2">
      <Link to="/" className="flex items-center group">
        <div className="flex items-center space-x-6">
          <div className="w-16 h-16 flex items-center justify-center transition-all duration-500 ease-out">
            <img 
              src={scrolled ? "/lovable-uploads/7e2ed504-8934-4c4e-a36e-077e7b054a17.png" : "/lovable-uploads/fad41de5-b88c-44e7-90a2-508e7415281a.png"}
              alt="NuFlow Logo" 
              className="w-12 h-12 object-contain transition-all duration-500 ease-out hover:scale-105"
            />
          </div>
          <div className="text-2xl font-mono font-bold text-white uppercase tracking-[0.2em] transition-all duration-500 ease-out">
            NUFLOW
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NavbarLogo;
