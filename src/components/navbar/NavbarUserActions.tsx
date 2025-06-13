
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface NavbarUserActionsProps {
  scrolled?: boolean;
}

const NavbarUserActions: React.FC<NavbarUserActionsProps> = ({ scrolled }) => {
  const { user, signOut } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center space-x-2">
        <Link to="/login">
          <Button variant="ghost" size="sm" className="text-white hover:text-trailflow-green hover:bg-white/10">
            <User size={18} className="mr-2" />
            Entrar
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Link to="/perfil">
        <Button variant="ghost" size="sm" className="text-white hover:text-trailflow-green hover:bg-white/10">
          <User size={18} className="mr-2" />
          Perfil
        </Button>
      </Link>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={signOut}
        className="text-white hover:text-trailflow-green hover:bg-white/10"
      >
        <LogOut size={18} className="mr-2" />
        Sair
      </Button>
    </div>
  );
};

export default NavbarUserActions;
