
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarMobileMenuProps {
  isOpen: boolean;
  onToggleMenu: () => void;
}

const NavbarMobileMenu = ({ isOpen, onToggleMenu }: NavbarMobileMenuProps) => {
  if (!isOpen) return null;

  const linkClass = "block py-4 px-6 font-mono font-medium uppercase tracking-wide text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300 rounded-lg";

  return (
    <div className="md:hidden bg-trailflow-medium/90 backdrop-blur-md border-t border-white/5 animate-fade-in">
      <div className="container mx-auto px-6 py-8 space-y-2">
        <Link 
          to="/roles" 
          className={linkClass}
          onClick={onToggleMenu}
        >
          TRILHAS
        </Link>
        <Link 
          to="/events" 
          className={`${linkClass} flex items-center`}
          onClick={onToggleMenu}
        >
          <Calendar size={18} className="mr-3" />
          EVENTOS
        </Link>
        <Link 
          to="/market" 
          className={linkClass}
          onClick={onToggleMenu}
        >
          MARKETPLACE
        </Link>
        <Link 
          to="/comunidade" 
          className={linkClass}
          onClick={onToggleMenu}
        >
          COMUNIDADE
        </Link>
        <Link 
          to="/sobre" 
          className={linkClass}
          onClick={onToggleMenu}
        >
          SOBRE
        </Link>
        <hr className="my-6 border-white/10" />
        <Link 
          to="/login" 
          className={linkClass}
          onClick={onToggleMenu}
        >
          ENTRAR / CRIAR CONTA
        </Link>
        <Link 
          to="/cart" 
          className={`${linkClass} flex items-center`}
          onClick={onToggleMenu}
        >
          <ShoppingCart size={18} className="mr-3" />
          CARRINHO
        </Link>
        <div className="pt-6">
          <Button 
            className="w-full font-mono font-medium uppercase tracking-wide bg-trailflow-green text-white hover:bg-trailflow-green-dark transition-all duration-300" 
            onClick={onToggleMenu} 
            asChild
          >
            <Link to="/anunciar">ANUNCIAR</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavbarMobileMenu;
