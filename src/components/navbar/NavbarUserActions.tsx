
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, ShoppingCart } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const NavbarUserActions = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex items-center space-x-2">
      {!isMobile && (
        <Link 
          to="/cart" 
          className="p-2 rounded-full hover:bg-white/10 transition-all duration-200"
        >
          <ShoppingCart size={18} className="text-trailflow-light hover:text-white transition-colors" />
        </Link>
      )}
      <Link 
        to="/login" 
        className="p-2 rounded-full hover:bg-white/10 transition-all duration-200"
      >
        <User size={18} className="text-trailflow-light hover:text-white transition-colors" />
      </Link>
      {!isMobile && (
        <Button variant="accent" size="sm" className="ml-4 font-medium" asChild>
          <Link to="/anunciar">Anunciar</Link>
        </Button>
      )}
    </div>
  );
};

export default NavbarUserActions;
