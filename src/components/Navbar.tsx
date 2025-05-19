
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User, ShoppingCart } from 'lucide-react';
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
  
  return <nav className={`sticky top-0 z-50 transition-all duration-300 bg-nuflow-green`}>
      <div className="container-custom py-4 flex items-center justify-between relative bg-[305037]">
        {/* Left Navigation */}
        <div className={`hidden md:flex items-center space-x-6 flex-1 justify-start`}>
          <Link to="/roles" className={`${isActive('/roles')} font-mono uppercase text-white text-sm tracking-wider`}>
            Explorar rolês
          </Link>
          <Link to="/market" className={`${isActive('/market')} font-mono uppercase text-white text-sm tracking-wider hover:text-[#0aea3e] transition-colors`}>
            Comprar / Vender
          </Link>
        </div>

        {/* Mobile Menu Button (Left) */}
        <div className="md:hidden">
          <button className="p-2 text-white" onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Logo (Center) */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/8e443af4-7d5d-4249-87be-111d8ed58435.png" 
              alt="Nuflow Logo" 
              className="w-10 h-10 hover:opacity-80 transition-opacity duration-300" 
            />
          </Link>
        </div>

        {/* Right Navigation */}
        <div className={`hidden md:flex items-center space-x-6 flex-1 justify-end`}>
          <Link to="/comunidade" className={`${isActive('/comunidade')} font-mono uppercase text-white text-sm tracking-wider`}>
            Comunidade
          </Link>
          <Link to="/sobre" className={`${isActive('/sobre')} font-mono uppercase text-white text-sm tracking-wider`}>
            Sobre
          </Link>
        </div>

        {/* User Actions (Right) */}
        <div className="flex items-center space-x-2">
          {!isMobile && <Link to="/cart" className="p-2 rounded-full hover:bg-white/10 transition-all">
              <ShoppingCart size={20} className="text-white" />
            </Link>}
          <Link to="/login" className="p-2 rounded-full hover:bg-white/10 transition-all">
            <User size={20} className="text-white" />
          </Link>
          {!isMobile && <Button variant="outline" className="border-white text-[#223526] hover:bg-white hover:text-nuflow-green transition-all duration-300 rounded-full font-mono uppercase text-sm tracking-wider" asChild>
              <Link to="/anunciar">Anunciar</Link>
            </Button>}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && <div className="md:hidden bg-nuflow-green border-t border-white/20 animate-slide-in">
          <div className="container-custom py-6 flex flex-col">
            <Link to="/roles" className="py-3 px-4 text-white hover:bg-white/10 rounded-md font-mono uppercase text-sm tracking-wider" onClick={toggleMenu}>Explorar rolês</Link>
            <Link to="/market" className="py-3 px-4 text-white hover:text-[#0aea3e] transition-colors rounded-md font-mono uppercase text-sm tracking-wider" onClick={toggleMenu}>Comprar / Vender</Link>
            <Link to="/comunidade" className="py-3 px-4 text-white hover:bg-white/10 rounded-md font-mono uppercase text-sm tracking-wider" onClick={toggleMenu}>Comunidade</Link>
            <Link to="/sobre" className="py-3 px-4 text-white hover:bg-white/10 rounded-md font-mono uppercase text-sm tracking-wider" onClick={toggleMenu}>Sobre</Link>
            <hr className="my-2 border-white/10" />
            <Link to="/login" className="py-3 px-4 text-white hover:bg-white/10 rounded-md font-mono uppercase text-sm tracking-wider" onClick={toggleMenu}>Entrar / Criar conta</Link>
            <Link to="/cart" className="py-3 px-4 text-white hover:bg-white/10 rounded-md font-mono uppercase text-sm tracking-wider" onClick={toggleMenu}>
              <span className="flex items-center">
                <ShoppingCart size={18} className="mr-2" /> Carrinho
              </span>
            </Link>
            <Button variant="outline" className="mt-3 border-white text-[#223526] hover:bg-white hover:text-nuflow-green transition-all duration-300 rounded-full font-mono uppercase text-sm tracking-wider" onClick={toggleMenu} asChild>
              <Link to="/anunciar">Anunciar</Link>
            </Button>
          </div>
        </div>}
    </nav>;
};
export default Navbar;
