
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedPartnerRouteProps {
  children: React.ReactNode;
}

export const ProtectedPartnerRoute: React.FC<ProtectedPartnerRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-nuflow-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Aqui poderia adicionar verificação adicional para confirmar se o usuário é realmente um parceiro
  // Por enquanto, vamos assumir que qualquer usuário logado pode acessar

  return <>{children}</>;
};
