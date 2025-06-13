
import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface NavbarMobileMenuProps {
  isOpen: boolean;
  onToggleMenu: () => void;
}

const NavbarMobileMenu = ({ isOpen, onToggleMenu }: NavbarMobileMenuProps) => {
  const { user } = useAuth();

  return (
    <div className={`fixed inset-0 z-40 md:hidden transform transition-transform duration-300 ease-out ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      <div className="absolute inset-0 bg-trailflow-medium/95 backdrop-blur-lg">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-white/10">
            <h2 className="text-white font-mono text-lg uppercase tracking-wide">Menu</h2>
            <button 
              onClick={onToggleMenu}
              className="p-2 text-white hover:text-trailflow-green transition-colors rounded-lg hover:bg-white/5"
              aria-label="Fechar menu"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex-1 px-6 py-8">
            <div className="space-y-2">
              <Link 
                to="/sobre" 
                className="block py-4 px-4 text-white font-mono text-sm uppercase tracking-wide hover:text-trailflow-green hover:bg-white/5 rounded-xl transition-all duration-300"
                onClick={onToggleMenu}
              >
                Sobre
              </Link>
              
              <Link 
                to="/eventos" 
                className="block py-4 px-4 text-white font-mono text-sm uppercase tracking-wide hover:text-trailflow-green hover:bg-white/5 rounded-xl transition-all duration-300"
                onClick={onToggleMenu}
              >
                Eventos
              </Link>

              {user && (
                <Link 
                  to="/meus-passes" 
                  className="block py-4 px-4 text-white font-mono text-sm uppercase tracking-wide hover:text-trailflow-green hover:bg-white/5 rounded-xl transition-all duration-300"
                  onClick={onToggleMenu}
                >
                  Meus Passes
                </Link>
              )}
              
              <Link 
                to="/marketplace" 
                className="block py-4 px-4 text-white font-mono text-sm uppercase tracking-wide hover:text-trailflow-green hover:bg-white/5 rounded-xl transition-all duration-300"
                onClick={onToggleMenu}
              >
                Marketplace
              </Link>
              
              <Link 
                to="/comunidade" 
                className="block py-4 px-4 text-white font-mono text-sm uppercase tracking-wide hover:text-trailflow-green hover:bg-white/5 rounded-xl transition-all duration-300"
                onClick={onToggleMenu}
              >
                Comunidade
              </Link>
              
              <Link 
                to="/faq" 
                className="block py-4 px-4 text-white font-mono text-sm uppercase tracking-wide hover:text-trailflow-green hover:bg-white/5 rounded-xl transition-all duration-300"
                onClick={onToggleMenu}
              >
                FAQ
              </Link>
            </div>
          </nav>
          
          {/* Footer */}
          <div className="px-6 py-6 border-t border-white/10">
            <p className="text-white/60 text-xs">
              © 2024 TrailFlow. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarMobileMenu;
