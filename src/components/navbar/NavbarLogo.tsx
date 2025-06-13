
import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarLogoProps {
  scrolled: boolean;
}

const NavbarLogo = ({ scrolled }: NavbarLogoProps) => {
  return (
    <div className="md:static absolute left-1/2 transform md:transform-none -translate-x-1/2 md:translate-x-0">
      <Link to="/" className="flex items-center group">
        <div className="flex items-center">
          <div className="w-10 h-10 flex items-center justify-center transition-all duration-300 ease-out">
            <img 
              src="/lovable-uploads/7e2ed504-8934-4c4e-a36e-077e7b054a17.png" 
              alt="NuFlow Logo" 
              className="w-8 h-8 object-contain transition-all duration-300 ease-out group-hover:scale-105" 
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NavbarLogo;
