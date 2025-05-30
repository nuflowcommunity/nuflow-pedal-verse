
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
        ? 'bg-trailflow-medium/95 backdrop-blur-lg shadow-lg border-b border-white/10' 
        : 'bg-trailflow-medium/80 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl py-4">
        <div className="flex items-center justify-between relative">
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              className="p-2 text-trailflow-light hover:text-white transition-colors rounded-full hover:bg-white/10" 
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

          {/* Logo (Center) */}
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

          {/* User Actions */}
          <div className="flex items-center space-x-2">
            {!isMobile && (
              <Link 
                to="/cart" 
                className="p-2 rounded-full hover:bg-white/10 transition-all duration-200"
              >
                <ShoppingCart size={18} className="text-trailflow-light hover:text-white transition-colors" />
              </Link>
            )}
            <Link 
              to="/login" 
              className="p-2 rounded-full hover:bg-white/10 transition-all duration-200"
            >
              <User size={18} className="text-trailflow-light hover:text-white transition-colors" />
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
        <div className="md:hidden bg-trailflow-medium/95 backdrop-blur-lg border-t border-white/10 animate-fade-in">
          <div className="container mx-auto px-6 py-6 space-y-2">
            <Link 
              to="/roles" 
              className="block py-3 px-4 text-trailflow-light hover:text-trailflow-green hover:bg-white/10 transition-all rounded-lg font-medium"
              onClick={toggleMenu}
            >
              Trilhas
            </Link>
            <Link 
              to="/events" 
              className="block py-3 px-4 text-trailflow-light hover:text-trailflow-green hover:bg-white/10 transition-all rounded-lg font-medium flex items-center"
              onClick={toggleMenu}
            >
              <Calendar size={18} className="mr-3" />
              Eventos
            </Link>
            <Link 
              to="/market" 
              className="block py-3 px-4 text-trailflow-light hover:text-trailflow-green hover:bg-white/10 transition-all rounded-lg font-medium"
              onClick={toggleMenu}
            >
              Marketplace
            </Link>
            <Link 
              to="/comunidade" 
              className="block py-3 px-4 text-trailflow-light hover:text-trailflow-green hover:bg-white/10 transition-all rounded-lg font-medium"
              onClick={toggleMenu}
            >
              Comunidade
            </Link>
            <Link 
              to="/sobre" 
              className="block py-3 px-4 text-trailflow-light hover:text-trailflow-green hover:bg-white/10 transition-all rounded-lg font-medium"
              onClick={toggleMenu}
            >
              Sobre
            </Link>
            <hr className="my-4 border-white/20" />
            <Link 
              to="/login" 
              className="block py-3 px-4 text-trailflow-light hover:text-trailflow-green hover:bg-white/10 transition-all rounded-lg font-medium"
              onClick={toggleMenu}
            >
              Entrar / Criar conta
            </Link>
            <Link 
              to="/cart" 
              className="block py-3 px-4 text-trailflow-light hover:text-trailflow-green hover:bg-white/10 transition-all rounded-lg font-medium flex items-center"
              onClick={toggleMenu}
            >
              <ShoppingCart size={18} className="mr-3" />
              Carrinho
            </Link>
            <div className="pt-4">
              <Button className="w-full font-medium bg-trailflow-green text-white hover:bg-trailflow-green-dark" onClick={toggleMenu} asChild>
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
