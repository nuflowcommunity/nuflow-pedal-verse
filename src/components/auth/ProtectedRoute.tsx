
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children,
  requiredRole
}) => {
  const { user, userRole, isLoading } = useAuth();
  const location = useLocation();

  // Durante desenvolvimento, sempre permitir acesso
  const isDevelopment = import.meta.env.DEV;
  
  if (isDevelopment) {
    return <>{children}</>;
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not authenticated, redirect to admin login for admin routes
  if (!user) {
    const isAdminRoute = location.pathname.startsWith('/admin');
    const redirectTo = isAdminRoute ? '/admin/login' : '/login';
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If role is required and user doesn't have it, redirect to unauthorized page
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // If all checks pass, render the children
  return <>{children}</>;
};
