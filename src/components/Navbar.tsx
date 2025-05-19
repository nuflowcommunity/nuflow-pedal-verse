
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User, ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-nuflow-sand/95 backdrop-blur-sm border-b border-nuflow-mineral/20">
      <div className="container-custom py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-heading font-bold text-nuflow-moss">NUFLOW</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/roles" className="nav-link">Rolês & Passes</Link>
          <Link to="/market" className="nav-link">Marketplace</Link>
          <Link to="/comunidade" className="nav-link">Comunidade</Link>
        </div>

        {/* User Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/cart" className="p-2 rounded-full hover:bg-nuflow-moss/10 transition-all">
            <ShoppingCart size={20} className="text-nuflow-moss" />
          </Link>
          <Link to="/login" className="p-2 rounded-full hover:bg-nuflow-moss/10 transition-all">
            <User size={20} className="text-nuflow-moss" />
          </Link>
          <Button
            variant="default"
            className="bg-nuflow-moss hover:bg-nuflow-moss/90 text-white"
          >
            Anunciar
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-nuflow-mineral/20 animate-fade-in">
          <div className="container-custom py-4 flex flex-col">
            <Link to="/roles" className="py-3 px-4 hover:bg-nuflow-sand rounded-md" onClick={toggleMenu}>Rolês & Passes</Link>
            <Link to="/market" className="py-3 px-4 hover:bg-nuflow-sand rounded-md" onClick={toggleMenu}>Marketplace</Link>
            <Link to="/comunidade" className="py-3 px-4 hover:bg-nuflow-sand rounded-md" onClick={toggleMenu}>Comunidade</Link>
            <hr className="my-2 border-nuflow-mineral/20" />
            <Link to="/login" className="py-3 px-4 hover:bg-nuflow-sand rounded-md" onClick={toggleMenu}>Minha Conta</Link>
            <Button
              variant="default"
              className="mt-3 bg-nuflow-moss hover:bg-nuflow-moss/90 text-white"
              onClick={toggleMenu}
            >
              Anunciar
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
