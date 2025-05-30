
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar } from 'lucide-react';

const NavbarDesktopMenu = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Left Navigation - Desktop */}
      <div className="hidden md:flex items-center space-x-8 flex-1">
        <Link 
          to="/roles" 
          className={`font-medium text-sm transition-all duration-200 hover:text-trailflow-green py-2 px-4 rounded-full hover:bg-white/10 ${
            isActive('/roles') ? 'text-trailflow-green bg-white/10' : 'text-trailflow-light'
          }`}
        >
          Trilhas
        </Link>
        <Link 
          to="/events" 
          className={`font-medium text-sm transition-all duration-200 hover:text-trailflow-green py-2 px-4 rounded-full hover:bg-white/10 flex items-center ${
            isActive('/events') ? 'text-trailflow-green bg-white/10' : 'text-trailflow-light'
          }`}
        >
          <Calendar size={14} className="mr-2" />
          Eventos
        </Link>
        <Link 
          to="/market" 
          className={`font-medium text-sm transition-all duration-200 hover:text-trailflow-green py-2 px-4 rounded-full hover:bg-white/10 ${
            isActive('/market') ? 'text-trailflow-green bg-white/10' : 'text-trailflow-light'
          }`}
        >
          Marketplace
        </Link>
      </div>

      {/* Right Navigation - Desktop */}
      <div className="hidden md:flex items-center space-x-8 flex-1 justify-end">
        <Link 
          to="/comunidade" 
          className={`font-medium text-sm transition-all duration-200 hover:text-trailflow-green py-2 px-4 rounded-full hover:bg-white/10 ${
            isActive('/comunidade') ? 'text-trailflow-green bg-white/10' : 'text-trailflow-light'
          }`}
        >
          Comunidade
        </Link>
        <Link 
          to="/sobre" 
          className={`font-medium text-sm transition-all duration-200 hover:text-trailflow-green py-2 px-4 rounded-full hover:bg-white/10 ${
            isActive('/sobre') ? 'text-trailflow-green bg-white/10' : 'text-trailflow-light'
          }`}
        >
          Sobre
        </Link>
      </div>
    </>
  );
};

export default NavbarDesktopMenu;
