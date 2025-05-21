
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const breadcrumbMap: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/eventos': 'Eventos',
  '/admin/pedidos': 'Pedidos',
  '/admin/usuarios': 'Usuários',
  '/admin/mensagens': 'Mensagens',
  '/admin/relatorios': 'Relatórios',
  '/admin/configuracoes': 'Configurações',
  '/admin/entidades': 'Entidades',
};

const AdminHeader = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const pageName = breadcrumbMap[currentPath] || 'Dashboard';
  const { user, signOut } = useAuth();
  
  // Get user email and initials for avatar
  const userEmail = user?.email || 'Admin';
  const userInitials = userEmail.split('@')[0].substring(0, 2).toUpperCase();
  
  return (
    <header className="flex justify-between items-center py-4 px-6 bg-white border-b">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-gray-800">{pageName}</h1>
        <div className="flex text-sm text-gray-500 mt-1">
          <span>Admin</span>
          <span className="mx-2">/</span>
          <span>{pageName}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <span className="text-gray-700 hidden sm:block">Bem-vindo, {userEmail}</span>
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback>{userInitials}</AvatarFallback>
        </Avatar>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => signOut()}
          className="text-gray-600 hover:text-gray-900"
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Sair</span>
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
