
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
    <div className="flex items-center space-x-2">
      {!isMobile && (
        <Link 
          to="/cart" 
          className="p-2 rounded-lg hover:bg-white/10 transition-all duration-300 group"
        >
          <ShoppingCart size={16} className="text-white/70 group-hover:text-white transition-colors duration-300" />
        </Link>
      )}
      {isMobile ? (
        <Link 
          to="/login" 
          className="p-2 rounded-lg hover:bg-white/10 transition-all duration-300 group font-mono text-xs uppercase tracking-wide text-white/70 hover:text-white"
        >
          LOGIN
        </Link>
      ) : (
        <Link 
          to="/login" 
          className="p-2 rounded-lg hover:bg-white/10 transition-all duration-300 group"
        >
          <User size={16} className="text-white/70 group-hover:text-white transition-colors duration-300" />
        </Link>
      )}
      {!isMobile && (
        <Button variant="accent" size="sm" className="ml-3 font-mono font-medium uppercase tracking-wide text-xs px-4 py-2" asChild>
          <Link to="/anunciar">ANUNCIAR</Link>
        </Button>
      )}
    </div>
  );
};

export default NavbarUserActions;
