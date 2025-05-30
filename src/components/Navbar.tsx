
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import NavbarLogo from './navbar/NavbarLogo';
import NavbarDesktopMenu from './navbar/NavbarDesktopMenu';
import NavbarMobileMenu from './navbar/NavbarMobileMenu';
import NavbarUserActions from './navbar/NavbarUserActions';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-trailflow-medium/80 backdrop-blur-md border-b border-white/5' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl py-6">
        <div className="flex items-center justify-between relative">
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              className="p-3 text-white hover:text-trailflow-green transition-all duration-300 rounded-lg hover:bg-white/5" 
              onClick={toggleMenu}
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <NavbarDesktopMenu scrolled={scrolled} />
          <NavbarLogo scrolled={scrolled} />
          <NavbarUserActions scrolled={scrolled} />
        </div>
      </div>

      <NavbarMobileMenu isOpen={isOpen} onToggleMenu={toggleMenu} />
    </nav>
  );
};

export default Navbar;
