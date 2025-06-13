
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
      <div className="absolute inset-0 bg-white/95 backdrop-blur-lg">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-100/50 h-[60px]">
            <h2 className="text-trailflow-dark font-medium text-base tracking-wide">Menu</h2>
            <button 
              onClick={onToggleMenu}
              className="p-2 text-trailflow-dark hover:text-trailflow-green transition-colors rounded-lg hover:bg-gray-50/50"
              aria-label="Fechar menu"
            >
              <X size={18} />
            </button>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6">
            <div className="space-y-2">
              <Link 
                to="/sobre" 
                className="block py-3 px-3 text-trailflow-dark font-normal text-sm hover:text-trailflow-green hover:bg-gray-50/50 rounded-lg transition-all duration-200 tracking-wide uppercase"
                onClick={onToggleMenu}
              >
                Sobre
              </Link>
              
              <Link 
                to="/eventos" 
                className="block py-3 px-3 text-trailflow-dark font-normal text-sm hover:text-trailflow-green hover:bg-gray-50/50 rounded-lg transition-all duration-200 tracking-wide uppercase"
                onClick={onToggleMenu}
              >
                Eventos
              </Link>

              {user && (
                <Link 
                  to="/meus-passes" 
                  className="block py-3 px-3 text-trailflow-dark font-normal text-sm hover:text-trailflow-green hover:bg-gray-50/50 rounded-lg transition-all duration-200 tracking-wide uppercase"
                  onClick={onToggleMenu}
                >
                  Meus Passes
                </Link>
              )}
              
              <Link 
                to="/marketplace" 
                className="block py-3 px-3 text-trailflow-dark font-normal text-sm hover:text-trailflow-green hover:bg-gray-50/50 rounded-lg transition-all duration-200 tracking-wide uppercase"
                onClick={onToggleMenu}
              >
                Marketplace
              </Link>
              
              <Link 
                to="/comunidade" 
                className="block py-3 px-3 text-trailflow-dark font-normal text-sm hover:text-trailflow-green hover:bg-gray-50/50 rounded-lg transition-all duration-200 tracking-wide uppercase"
                onClick={onToggleMenu}
              >
                Comunidade
              </Link>
              
              <Link 
                to="/faq" 
                className="block py-3 px-3 text-trailflow-dark font-normal text-sm hover:text-trailflow-green hover:bg-gray-50/50 rounded-lg transition-all duration-200 tracking-wide uppercase"
                onClick={onToggleMenu}
              >
                FAQ
              </Link>
            </div>
          </nav>
          
          {/* Footer */}
          <div className="px-4 py-4 border-t border-gray-100/50">
            <p className="text-gray-500 text-xs tracking-wide">
              © 2024 TrailFlow. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarMobileMenu;
