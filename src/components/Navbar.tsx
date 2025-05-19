
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User, ShoppingCart, Mountain } from 'lucide-react';
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
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-nuflow-sand/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
      <div className="container-custom py-4 flex items-center justify-between relative">
        {/* Mobile Menu Button (Left) */}
        <div className="md:hidden">
          <button className="p-2 text-nuflow-moss" onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation (Left) */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/roles" className={isActive('/roles')}>
            Explorar rolês
          </Link>
          <Link to="/market" className={isActive('/market')}>
            Comprar / Vender
          </Link>
        </div>

        {/* Logo (Center) */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/" className="flex items-center">
            <Mountain size={32} className="text-nuflow-moss hover:text-nuflow-lime transition-colors duration-300" />
          </Link>
        </div>

        {/* Desktop Navigation (Right) */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/comunidade" className={isActive('/comunidade')}>
            Comunidade
          </Link>
          <Link to="/sobre" className={isActive('/sobre')}>
            Sobre
          </Link>
        </div>

        {/* User Actions (Right) */}
        <div className="flex items-center space-x-2">
          {!isMobile && (
            <Link to="/cart" className="p-2 rounded-full hover:bg-nuflow-moss/10 transition-all">
              <ShoppingCart size={20} className="text-nuflow-moss" />
            </Link>
          )}
          <Link to="/login" className="p-2 rounded-full hover:bg-nuflow-moss/10 transition-all">
            <User size={20} className="text-nuflow-moss" />
          </Link>
          {!isMobile && (
            <Button
              variant="default"
              className="bg-nuflow-moss hover:bg-nuflow-lime hover:text-nuflow-moss transition-all duration-300 text-white rounded-full"
              asChild
            >
              <Link to="/anunciar">Anunciar</Link>
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-nuflow-mineral/20 animate-slide-in">
          <div className="container-custom py-6 flex flex-col">
            <Link to="/roles" className="py-3 px-4 hover:bg-nuflow-sand rounded-md" onClick={toggleMenu}>Explorar rolês</Link>
            <Link to="/market" className="py-3 px-4 hover:bg-nuflow-sand rounded-md" onClick={toggleMenu}>Comprar / Vender</Link>
            <Link to="/comunidade" className="py-3 px-4 hover:bg-nuflow-sand rounded-md" onClick={toggleMenu}>Comunidade</Link>
            <Link to="/sobre" className="py-3 px-4 hover:bg-nuflow-sand rounded-md" onClick={toggleMenu}>Sobre</Link>
            <hr className="my-2 border-nuflow-mineral/20" />
            <Link to="/login" className="py-3 px-4 hover:bg-nuflow-sand rounded-md" onClick={toggleMenu}>Entrar / Criar conta</Link>
            <Link to="/cart" className="py-3 px-4 hover:bg-nuflow-sand rounded-md" onClick={toggleMenu}>
              <span className="flex items-center">
                <ShoppingCart size={18} className="mr-2" /> Carrinho
              </span>
            </Link>
            <Button
              variant="default"
              className="mt-3 bg-nuflow-moss hover:bg-nuflow-lime hover:text-nuflow-moss transition-all duration-300 text-white rounded-full"
              onClick={toggleMenu}
              asChild
            >
              <Link to="/anunciar">Anunciar</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
