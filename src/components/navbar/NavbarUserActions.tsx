
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface NavbarUserActionsProps {
  scrolled?: boolean;
}

const NavbarUserActions: React.FC<NavbarUserActionsProps> = ({ scrolled }) => {
  const { user, signOut } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center">
        <Link to="/login">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-trailflow-dark hover:text-trailflow-green hover:bg-gray-50/50 text-sm font-medium tracking-wide px-4 py-2 uppercase text-xs"
          >
            Login
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-1">
      <Link to="/perfil">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-trailflow-dark hover:text-trailflow-green hover:bg-gray-50/50 text-sm font-medium tracking-wide px-3 py-2"
        >
          Perfil
        </Button>
      </Link>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={signOut}
        className="text-trailflow-dark hover:text-trailflow-green hover:bg-gray-50/50 text-sm font-medium tracking-wide px-3 py-2"
      >
        Sair
      </Button>
    </div>
  );
};

export default NavbarUserActions;
