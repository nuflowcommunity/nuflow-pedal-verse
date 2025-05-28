
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User, ShoppingCart, Calendar } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'nav-link-active' : 'nav-link';
  };
  
  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 bg-nuflow-forest ${scrolled ? 'shadow-md' : ''}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-3 sm:py-4">
        <div className="flex items-center justify-between relative">
          {/* Mobile Menu Button (Left) */}
          <div className="md:hidden flex items-center">
            <button 
              className="p-2 text-white hover:text-nuflow-emerald transition-colors rounded-md" 
              onClick={toggleMenu}
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Left Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6 flex-1">
            <Link to="/roles" className="font-mono uppercase text-white text-sm tracking-wider hover:text-nuflow-emerald transition-colors py-2 px-3 rounded-md">
              Explorar rolês
            </Link>
            <Link to="/events" className="font-mono uppercase text-white text-sm tracking-wider hover:text-nuflow-emerald transition-colors py-2 px-3 rounded-md">
              <span className="flex items-center">
                <Calendar size={16} className="mr-1" />
                Calendário
              </span>
            </Link>
            <Link to="/market" className="font-mono uppercase text-white text-sm tracking-wider hover:text-nuflow-emerald transition-colors py-2 px-3 rounded-md">
              Comprar / Vender
            </Link>
          </div>

          {/* Logo (Center) */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/8e443af4-7d5d-4249-87be-111d8ed58435.png" 
                alt="Nuflow Logo" 
                className="w-8 h-8 sm:w-10 sm:h-10 hover:opacity-80 transition-opacity duration-300" 
              />
            </Link>
          </div>

          {/* Right Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6 flex-1 justify-end">
            <Link to="/comunidade" className="font-mono uppercase text-white text-sm tracking-wider hover:text-nuflow-emerald transition-colors py-2 px-3 rounded-md">
              Comunidade
            </Link>
            <Link to="/sobre" className="font-mono uppercase text-white text-sm tracking-wider hover:text-nuflow-emerald transition-colors py-2 px-3 rounded-md">
              Sobre
            </Link>
          </div>

          {/* User Actions (Right) */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {!isMobile && (
              <Link to="/cart" className="p-2 rounded-full hover:bg-white/10 transition-all">
                <ShoppingCart size={18} className="text-white hover:text-nuflow-emerald" />
              </Link>
            )}
            <Link to="/login" className="p-2 rounded-full hover:bg-white/10 transition-all">
              <User size={18} className="text-white hover:text-nuflow-emerald" />
            </Link>
            {!isMobile && (
              <Button variant="navbarPrimary" size="sm" className="ml-2 font-mono uppercase text-xs tracking-wider" asChild>
                <Link to="/anunciar">Anunciar</Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-nuflow-forest border-t border-white/20 animate-slide-in">
          <div className="px-4 sm:px-6 py-6 flex flex-col space-y-2">
            <Link to="/roles" className="py-3 px-4 text-white hover:text-nuflow-emerald hover:bg-white/5 transition-colors rounded-md font-mono uppercase text-sm tracking-wider" onClick={toggleMenu}>
              Explorar rolês
            </Link>
            <Link to="/events" className="py-3 px-4 text-white hover:text-nuflow-emerald hover:bg-white/5 transition-colors rounded-md font-mono uppercase text-sm tracking-wider flex items-center" onClick={toggleMenu}>
              <Calendar size={16} className="mr-2" />
              Calendário
            </Link>
            <Link to="/market" className="py-3 px-4 text-white hover:text-nuflow-emerald hover:bg-white/5 transition-colors rounded-md font-mono uppercase text-sm tracking-wider" onClick={toggleMenu}>
              Comprar / Vender
            </Link>
            <Link to="/comunidade" className="py-3 px-4 text-white hover:text-nuflow-emerald hover:bg-white/5 transition-colors rounded-md font-mono uppercase text-sm tracking-wider" onClick={toggleMenu}>
              Comunidade
            </Link>
            <Link to="/sobre" className="py-3 px-4 text-white hover:text-nuflow-emerald hover:bg-white/5 transition-colors rounded-md font-mono uppercase text-sm tracking-wider" onClick={toggleMenu}>
              Sobre
            </Link>
            <hr className="my-2 border-white/10" />
            <Link to="/login" className="py-3 px-4 text-white hover:text-nuflow-emerald hover:bg-white/5 transition-colors rounded-md font-mono uppercase text-sm tracking-wider" onClick={toggleMenu}>
              Entrar / Criar conta
            </Link>
            <Link to="/cart" className="py-3 px-4 text-white hover:text-nuflow-emerald hover:bg-white/5 transition-colors rounded-md font-mono uppercase text-sm tracking-wider" onClick={toggleMenu}>
              <span className="flex items-center">
                <ShoppingCart size={18} className="mr-2" /> Carrinho
              </span>
            </Link>
            <div className="pt-3">
              <Button variant="navbarPrimary" className="w-full font-mono uppercase text-sm tracking-wider" onClick={toggleMenu} asChild>
                <Link to="/anunciar">Anunciar</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
