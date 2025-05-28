
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
  
  // Default user info for development
  const userEmail = 'admin@nuflow.com';
  const userInitials = 'AD';
  
  return (
    <header className="flex justify-between items-center py-4 px-6 bg-white border-b border-gray-200">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-nuflow-charcoal">{pageName}</h1>
        <div className="flex text-sm text-nuflow-mineral mt-1">
          <span>Admin</span>
          <span className="mx-2">/</span>
          <span>{pageName}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <span className="text-nuflow-charcoal hidden sm:block">Bem-vindo, {userEmail}</span>
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback className="bg-nuflow-emerald text-nuflow-forest">{userInitials}</AvatarFallback>
        </Avatar>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => signOut()}
          className="text-nuflow-charcoal hover:text-nuflow-forest hover:bg-nuflow-mint/50"
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Sair</span>
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
