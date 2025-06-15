
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, Menu } from 'lucide-react';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const breadcrumbMap: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/eventos': 'Eventos',
  '/admin/pedidos': 'Pedidos',
  '/admin/usuarios': 'Usuários',
  '/admin/mensagens': 'Mensagens',
  '/admin/relatorios': 'Relatórios',
  '/admin/configuracoes': 'Configurações',
  '/admin/entidades': 'Entidades',
  '/admin/cupons': 'Cupons',
  '/admin/marketing': 'Marketing',
  '/admin/marketing/google-ads': 'Google Ads',
  '/admin/marketing/meta-ads': 'Meta Ads',
  '/admin/financeiro': 'Visão Financeira',
  '/admin/financeiro/contabilidade': 'Contabilidade',
  '/admin/financeiro/fluxo-caixa': 'Fluxo de Caixa',
  '/admin/financeiro/receitas': 'Receitas',
  '/admin/financeiro/despesas': 'Despesas',
  '/admin/financeiro/relatorios': 'Relatórios Financeiros',
  '/admin/financeiro/contas': 'Contas',
};

const AdminHeader = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const pageName = breadcrumbMap[currentPath] || 'Dashboard';
  const { signOut } = useAuth();
  const { isMobile } = useSidebar();
  
  // Default user info for development
  const userEmail = 'admin@nuflow.com';
  const userInitials = 'AD';
  
  return (
    <header className="flex justify-between items-center py-3 px-4 md:py-4 md:px-6 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center gap-3">
        {/* Mobile sidebar trigger */}
        <SidebarTrigger className="md:hidden" />
        
        <div className="flex flex-col">
          <h1 className="text-lg md:text-2xl font-bold text-gray-900">{pageName}</h1>
          <div className="hidden sm:flex text-sm text-gray-600 mt-1">
            <span className="text-gray-700">Admin</span>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-600">{pageName}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-3">
        {/* Desktop layout */}
        <div className="hidden md:flex items-center gap-3">
          <span className="text-gray-700">Bem-vindo, {userEmail}</span>
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-trailflow-green text-white font-medium">{userInitials}</AvatarFallback>
          </Avatar>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => signOut()}
            className="text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>

        {/* Mobile layout - dropdown menu */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-trailflow-green text-white text-xs font-medium">{userInitials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white border border-gray-200 shadow-lg z-50">
              <div className="flex flex-col space-y-1 p-2">
                <p className="text-sm font-medium leading-none text-gray-900">{userEmail}</p>
                <p className="text-xs leading-none text-gray-600">Administrador</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()} className="text-red-600 hover:bg-red-50">
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
