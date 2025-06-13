
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
      if (offset > 10) {
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out h-[60px] ${
      scrolled 
        ? 'bg-white/80 backdrop-blur-[8px] shadow-sm border-b border-gray-100/30' 
        : 'bg-white/80 backdrop-blur-[8px]'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl h-full">
        <div className="flex items-center justify-between h-full">
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              className="p-2 text-trailflow-dark hover:text-trailflow-green transition-colors duration-200 rounded-lg hover:bg-gray-50/50" 
              onClick={toggleMenu}
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          {/* Desktop: Logo on left, Mobile: Logo centered */}
          <div className="md:flex-none">
            <NavbarLogo scrolled={scrolled} />
          </div>

          {/* Desktop Menu - Hidden on mobile */}
          <div className="hidden md:flex md:flex-1 md:justify-center">
            <NavbarDesktopMenu scrolled={scrolled} />
          </div>

          {/* User Actions */}
          <div className="md:flex-none">
            <NavbarUserActions scrolled={scrolled} />
          </div>
        </div>
      </div>

      <NavbarMobileMenu isOpen={isOpen} onToggleMenu={toggleMenu} />
    </nav>
  );
};

export default Navbar;
