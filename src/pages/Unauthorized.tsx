
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

const Unauthorized = () => {
  const { signOut } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-nuflow-sand p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <Shield className="h-16 w-16 text-red-500" />
        </div>
        
        <h1 className="text-2xl font-bold mb-4">Acesso Negado</h1>
        
        <p className="text-gray-600 mb-6">
          Você não tem permissão para acessar esta página. 
          Verifique com o administrador se você precisa de acesso adicional.
        </p>
        
        <div className="space-y-4">
          <Button 
            variant="default" 
            className="w-full" 
            asChild
          >
            <Link to="/">Voltar para a página inicial</Link>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => signOut()}
          >
            Sair e fazer login com outra conta
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
