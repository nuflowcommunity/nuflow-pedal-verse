
import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarLogoProps {
  scrolled: boolean;
}

const NavbarLogo = ({ scrolled }: NavbarLogoProps) => {
  return (
    <div className="absolute left-1/2 transform -translate-x-1/2">
      <Link to="/" className="flex items-center group">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 flex items-center justify-center transition-all duration-300">
            <img 
              src={scrolled ? "/lovable-uploads/7e2ed504-8934-4c4e-a36e-077e7b054a17.png" : "/lovable-uploads/fad41de5-b88c-44e7-90a2-508e7415281a.png"}
              alt="NuFlow Logo" 
              className="w-8 h-8 object-contain transition-all duration-300"
            />
          </div>
          <div className="text-xl font-mono font-bold text-white uppercase tracking-wide transition-all duration-300">
            NUFLOW
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NavbarLogo;
