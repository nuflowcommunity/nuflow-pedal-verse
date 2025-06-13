
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface NavbarDesktopMenuProps {
  scrolled: boolean;
}

const NavbarDesktopMenu = ({ scrolled }: NavbarDesktopMenuProps) => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const linkClass = (path: string) => `
    relative px-6 py-4 text-white font-mono text-xs uppercase tracking-wide transition-all duration-300 
    hover:text-trailflow-green hover:bg-white/5 rounded-xl group
    ${isActive(path) ? 'text-trailflow-green bg-white/10' : ''}
  `;

  return (
    <div className="hidden md:flex items-center space-x-2">
      <Link to="/sobre" className={linkClass('/sobre')}>
        <span className="relative z-10">SOBRE</span>
        <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Link>
      
      <Link to="/eventos" className={linkClass('/eventos')}>
        <span className="relative z-10">EVENTOS</span>
        <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Link>

      {user && (
        <Link to="/meus-passes" className={linkClass('/meus-passes')}>
          <span className="relative z-10">MEUS PASSES</span>
          <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>
      )}
      
      <Link to="/marketplace" className={linkClass('/marketplace')}>
        <span className="relative z-10">MARKETPLACE</span>
        <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Link>
      
      <Link to="/comunidade" className={linkClass('/comunidade')}>
        <span className="relative z-10">COMUNIDADE</span>
        <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Link>
      
      <Link to="/faq" className={linkClass('/faq')}>
        <span className="relative z-10">FAQ</span>
        <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Link>
    </div>
  );
};

export default NavbarDesktopMenu;
