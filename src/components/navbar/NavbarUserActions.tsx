
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, ShoppingCart } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavbarUserActionsProps {
  scrolled: boolean;
}

const NavbarUserActions = ({ scrolled }: NavbarUserActionsProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex items-center space-x-3">
      {!isMobile && (
        <Link 
          to="/cart" 
          className="p-3 rounded-lg hover:bg-white/5 transition-all duration-300 group"
        >
          <ShoppingCart size={18} className="text-gray-300 group-hover:text-white transition-colors duration-300" />
        </Link>
      )}
      <Link 
        to="/login" 
        className="p-3 rounded-lg hover:bg-white/5 transition-all duration-300 group"
      >
        <User size={18} className="text-gray-300 group-hover:text-white transition-colors duration-300" />
      </Link>
      {!isMobile && (
        <Button variant="accent" size="sm" className="ml-4 font-mono font-medium uppercase tracking-wide text-sm" asChild>
          <Link to="/anunciar">ANUNCIAR</Link>
        </Button>
      )}
    </div>
  );
};

export default NavbarUserActions;
