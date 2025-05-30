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
    return location.pathname === path;
  };
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-sm border-b border-trailflow-lighter/30' 
        : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl py-4">
        <div className="flex items-center justify-between relative">
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              className="p-2 text-trailflow-medium hover:text-trailflow-dark transition-colors rounded-full hover:bg-trailflow-accent" 
              onClick={toggleMenu}
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Left Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-8 flex-1">
            <Link 
              to="/roles" 
              className={`font-medium text-sm transition-all duration-200 hover:text-trailflow-green py-2 px-4 rounded-full hover:bg-trailflow-accent/50 ${
                isActive('/roles') ? 'text-trailflow-green bg-trailflow-accent' : 'text-trailflow-medium'
              }`}
            >
              Trilhas
            </Link>
            <Link 
              to="/events" 
              className={`font-medium text-sm transition-all duration-200 hover:text-trailflow-green py-2 px-4 rounded-full hover:bg-trailflow-accent/50 flex items-center ${
                isActive('/events') ? 'text-trailflow-green bg-trailflow-accent' : 'text-trailflow-medium'
              }`}
            >
              <Calendar size={14} className="mr-2" />
              Eventos
            </Link>
            <Link 
              to="/market" 
              className={`font-medium text-sm transition-all duration-200 hover:text-trailflow-green py-2 px-4 rounded-full hover:bg-trailflow-accent/50 ${
                isActive('/market') ? 'text-trailflow-green bg-trailflow-accent' : 'text-trailflow-medium'
              }`}
            >
              Marketplace
            </Link>
          </div>

          {/* Logo (Center) */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link to="/" className="flex items-center group">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-trailflow-green rounded-full flex items-center justify-center">
                  <div className="text-white font-bold text-sm">N</div>
                </div>
                <div className="text-xl font-bold text-trailflow-dark group-hover:text-trailflow-medium transition-colors duration-200">
                  NuFlow
                </div>
              </div>
            </Link>
          </div>

          {/* Right Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-8 flex-1 justify-end">
            <Link 
              to="/comunidade" 
              className={`font-medium text-sm transition-all duration-200 hover:text-trailflow-green py-2 px-4 rounded-full hover:bg-trailflow-accent/50 ${
                isActive('/comunidade') ? 'text-trailflow-green bg-trailflow-accent' : 'text-trailflow-medium'
              }`}
            >
              Comunidade
            </Link>
            <Link 
              to="/sobre" 
              className={`font-medium text-sm transition-all duration-200 hover:text-trailflow-green py-2 px-4 rounded-full hover:bg-trailflow-accent/50 ${
                isActive('/sobre') ? 'text-trailflow-green bg-trailflow-accent' : 'text-trailflow-medium'
              }`}
            >
              Sobre
            </Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-2">
            {!isMobile && (
              <Link 
                to="/cart" 
                className="p-2 rounded-full hover:bg-trailflow-accent transition-all duration-200"
              >
                <ShoppingCart size={18} className="text-trailflow-medium hover:text-trailflow-dark transition-colors" />
              </Link>
            )}
            <Link 
              to="/login" 
              className="p-2 rounded-full hover:bg-trailflow-accent transition-all duration-200"
            >
              <User size={18} className="text-trailflow-medium hover:text-trailflow-dark transition-colors" />
            </Link>
            {!isMobile && (
              <Button variant="accent" size="sm" className="ml-4 font-medium" asChild>
                <Link to="/anunciar">Anunciar</Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-trailflow-lighter/30 animate-fade-in">
          <div className="container mx-auto px-6 py-6 space-y-2">
            <Link 
              to="/roles" 
              className="block py-3 px-4 text-trailflow-medium hover:text-trailflow-green hover:bg-trailflow-accent/30 transition-all rounded-lg font-medium"
              onClick={toggleMenu}
            >
              Trilhas
            </Link>
            <Link 
              to="/events" 
              className="block py-3 px-4 text-trailflow-medium hover:text-trailflow-green hover:bg-trailflow-accent/30 transition-all rounded-lg font-medium flex items-center"
              onClick={toggleMenu}
            >
              <Calendar size={18} className="mr-3" />
              Eventos
            </Link>
            <Link 
              to="/market" 
              className="block py-3 px-4 text-trailflow-medium hover:text-trailflow-green hover:bg-trailflow-accent/30 transition-all rounded-lg font-medium"
              onClick={toggleMenu}
            >
              Marketplace
            </Link>
            <Link 
              to="/comunidade" 
              className="block py-3 px-4 text-trailflow-medium hover:text-trailflow-green hover:bg-trailflow-accent/30 transition-all rounded-lg font-medium"
              onClick={toggleMenu}
            >
              Comunidade
            </Link>
            <Link 
              to="/sobre" 
              className="block py-3 px-4 text-trailflow-medium hover:text-trailflow-green hover:bg-trailflow-accent/30 transition-all rounded-lg font-medium"
              onClick={toggleMenu}
            >
              Sobre
            </Link>
            <hr className="my-4 border-trailflow-lighter" />
            <Link 
              to="/login" 
              className="block py-3 px-4 text-trailflow-medium hover:text-trailflow-green hover:bg-trailflow-accent/30 transition-all rounded-lg font-medium"
              onClick={toggleMenu}
            >
              Entrar / Criar conta
            </Link>
            <Link 
              to="/cart" 
              className="block py-3 px-4 text-trailflow-medium hover:text-trailflow-green hover:bg-trailflow-accent/30 transition-all rounded-lg font-medium flex items-center"
              onClick={toggleMenu}
            >
              <ShoppingCart size={18} className="mr-3" />
              Carrinho
            </Link>
            <div className="pt-4">
              <Button className="w-full font-medium" onClick={toggleMenu} asChild>
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
