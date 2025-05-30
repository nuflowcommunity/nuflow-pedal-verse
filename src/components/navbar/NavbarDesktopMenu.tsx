
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar } from 'lucide-react';

interface NavbarDesktopMenuProps {
  scrolled: boolean;
}

const NavbarDesktopMenu = ({ scrolled }: NavbarDesktopMenuProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const linkClass = "font-mono font-medium text-sm uppercase tracking-wide transition-all duration-300 hover:text-white py-3 px-4 relative group";
  const activeLinkClass = "text-white";
  const inactiveLinkClass = "text-gray-300";

  return (
    <>
      {/* Left Navigation - Desktop */}
      <div className="hidden md:flex items-center space-x-8 flex-1">
        <Link 
          to="/roles" 
          className={`${linkClass} ${isActive('/roles') ? activeLinkClass : inactiveLinkClass}`}
        >
          TRILHAS
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-trailflow-green transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
        </Link>
        <Link 
          to="/events" 
          className={`${linkClass} ${isActive('/events') ? activeLinkClass : inactiveLinkClass} flex items-center`}
        >
          <Calendar size={14} className="mr-2" />
          EVENTOS
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-trailflow-green transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
        </Link>
        <Link 
          to="/market" 
          className={`${linkClass} ${isActive('/market') ? activeLinkClass : inactiveLinkClass}`}
        >
          MARKETPLACE
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-trailflow-green transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
        </Link>
      </div>

      {/* Right Navigation - Desktop */}
      <div className="hidden md:flex items-center space-x-8 flex-1 justify-end">
        <Link 
          to="/comunidade" 
          className={`${linkClass} ${isActive('/comunidade') ? activeLinkClass : inactiveLinkClass}`}
        >
          COMUNIDADE
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-trailflow-green transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
        </Link>
        <Link 
          to="/sobre" 
          className={`${linkClass} ${isActive('/sobre') ? activeLinkClass : inactiveLinkClass}`}
        >
          SOBRE
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-trailflow-green transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
        </Link>
      </div>
    </>
  );
};

export default NavbarDesktopMenu;
