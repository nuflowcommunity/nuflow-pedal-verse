
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100/50' 
        : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl h-[60px]">
        <div className="flex items-center justify-between h-full">
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              className="p-2 text-trailflow-dark hover:text-trailflow-green transition-colors duration-200 rounded-lg hover:bg-gray-50" 
              onClick={toggleMenu}
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Desktop: Logo on left, Mobile: Logo centered */}
          <div className="md:flex-1 md:flex md:justify-start">
            <NavbarLogo scrolled={scrolled} />
          </div>

          {/* Desktop Menu - Hidden on mobile */}
          <div className="hidden md:flex md:flex-1 md:justify-center">
            <NavbarDesktopMenu scrolled={scrolled} />
          </div>

          {/* User Actions */}
          <div className="md:flex-1 md:flex md:justify-end">
            <NavbarUserActions scrolled={scrolled} />
          </div>
        </div>
      </div>

      <NavbarMobileMenu isOpen={isOpen} onToggleMenu={toggleMenu} />
    </nav>
  );
};

export default Navbar;
