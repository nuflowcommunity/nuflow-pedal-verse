
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
    relative px-3 py-2 text-sm font-normal text-trailflow-dark transition-all duration-300 
    hover:text-trailflow-green rounded-md hover:bg-gray-50/50 uppercase tracking-[0.1rem]
    ${isActive(path) ? 'text-trailflow-green' : ''}
  `;

  return (
    <div className="flex items-center space-x-1">
      <Link to="/sobre" className={linkClass('/sobre')}>
        Sobre
      </Link>
      
      <Link to="/eventos" className={linkClass('/eventos')}>
        Eventos
      </Link>

      {user && (
        <Link to="/meus-passes" className={linkClass('/meus-passes')}>
          Meus Passes
        </Link>
      )}
      
      <Link to="/marketplace" className={linkClass('/marketplace')}>
        Marketplace
      </Link>
      
      <Link to="/comunidade" className={linkClass('/comunidade')}>
        Comunidade
      </Link>
      
      <Link to="/faq" className={linkClass('/faq')}>
        FAQ
      </Link>
    </div>
  );
};

export default NavbarDesktopMenu;
