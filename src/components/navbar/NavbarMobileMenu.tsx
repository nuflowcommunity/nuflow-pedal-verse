
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

  return (
    <div className="md:hidden bg-trailflow-medium/95 backdrop-blur-lg border-t border-white/10 animate-fade-in">
      <div className="container mx-auto px-6 py-6 space-y-2">
        <Link 
          to="/roles" 
          className="block py-3 px-4 text-trailflow-light hover:text-trailflow-green hover:bg-white/10 transition-all rounded-lg font-medium"
          onClick={onToggleMenu}
        >
          Trilhas
        </Link>
        <Link 
          to="/events" 
          className="block py-3 px-4 text-trailflow-light hover:text-trailflow-green hover:bg-white/10 transition-all rounded-lg font-medium flex items-center"
          onClick={onToggleMenu}
        >
          <Calendar size={18} className="mr-3" />
          Eventos
        </Link>
        <Link 
          to="/market" 
          className="block py-3 px-4 text-trailflow-light hover:text-trailflow-green hover:bg-white/10 transition-all rounded-lg font-medium"
          onClick={onToggleMenu}
        >
          Marketplace
        </Link>
        <Link 
          to="/comunidade" 
          className="block py-3 px-4 text-trailflow-light hover:text-trailflow-green hover:bg-white/10 transition-all rounded-lg font-medium"
          onClick={onToggleMenu}
        >
          Comunidade
        </Link>
        <Link 
          to="/sobre" 
          className="block py-3 px-4 text-trailflow-light hover:text-trailflow-green hover:bg-white/10 transition-all rounded-lg font-medium"
          onClick={onToggleMenu}
        >
          Sobre
        </Link>
        <hr className="my-4 border-white/20" />
        <Link 
          to="/login" 
          className="block py-3 px-4 text-trailflow-light hover:text-trailflow-green hover:bg-white/10 transition-all rounded-lg font-medium"
          onClick={onToggleMenu}
        >
          Entrar / Criar conta
        </Link>
        <Link 
          to="/cart" 
          className="block py-3 px-4 text-trailflow-light hover:text-trailflow-green hover:bg-white/10 transition-all rounded-lg font-medium flex items-center"
          onClick={onToggleMenu}
        >
          <ShoppingCart size={18} className="mr-3" />
          Carrinho
        </Link>
        <div className="pt-4">
          <Button className="w-full font-medium bg-trailflow-green text-white hover:bg-trailflow-green-dark" onClick={onToggleMenu} asChild>
            <Link to="/anunciar">Anunciar</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavbarMobileMenu;
