
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const breadcrumbMap: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/eventos': 'Eventos',
  '/admin/pedidos': 'Pedidos',
  '/admin/usuarios': 'Usuários',
  '/admin/mensagens': 'Mensagens',
  '/admin/relatorios': 'Relatórios',
  '/admin/configuracoes': 'Configurações',
};

const AdminHeader = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const pageName = breadcrumbMap[currentPath] || 'Dashboard';
  
  // Mock user data - in a real app, this would come from a user context or auth state
  const adminName = "João Silva";
  
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
        <span className="text-gray-700 hidden sm:block">Bem-vindo, {adminName}</span>
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback>JS</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default AdminHeader;
