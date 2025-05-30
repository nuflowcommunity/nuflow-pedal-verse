
import React from 'react';
import { Link } from 'react-router-dom';

const NavbarLogo = () => {
  return (
    <div className="absolute left-1/2 transform -translate-x-1/2">
      <Link to="/" className="flex items-center group">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
            <img 
              src="/lovable-uploads/adf44db0-c66b-4031-a615-a8e98fe5f77f.png" 
              alt="NuFlow Mountain Logo" 
              className="w-6 h-6 object-contain brightness-0 invert"
            />
          </div>
          <div className="text-xl font-bold text-white group-hover:text-trailflow-green transition-colors duration-200">
            NuFlow
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NavbarLogo;
