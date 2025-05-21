import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  ShoppingCart, 
  Users, 
  MessageSquare, 
  BarChart2, 
  Settings, 
  LogOut,
  TrendingUp,
  Search,
  Facebook,
  DollarSign,
  Receipt,
  Wallet,
  CreditCard,
  FileText,
  BarChart,
  PieChart,
  Package2
} from 'lucide-react';
import { 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarFooter,
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarSeparator,
  SidebarGroupLabel
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

// Main menu items
const menuItems = [
  { 
    title: 'Dashboard', 
    path: '/admin', 
    icon: LayoutDashboard 
  },
  { 
    title: 'Eventos', 
    path: '/admin/eventos', 
    icon: Calendar 
  },
  {
    title: 'Entidades',
    path: '/admin/entidades',
    icon: Package2
  },
  { 
    title: 'Pedidos', 
    path: '/admin/pedidos', 
    icon: ShoppingCart 
  },
  { 
    title: 'Usuários', 
    path: '/admin/usuarios', 
    icon: Users 
  },
  { 
    title: 'Mensagens', 
    path: '/admin/mensagens', 
    icon: MessageSquare 
  },
  { 
    title: 'Relatórios', 
    path: '/admin/relatorios', 
    icon: BarChart2 
  },
  { 
    title: 'Configurações', 
    path: '/admin/configuracoes', 
    icon: Settings 
  },
];

// Marketing menu items
const marketingItems = [
  {
    title: 'Marketing',
    path: '/admin/marketing',
    icon: TrendingUp
  },
  {
    title: 'Google Ads',
    path: '/admin/marketing/google-ads',
    icon: Search
  },
  {
    title: 'Meta Ads',
    path: '/admin/marketing/meta-ads',
    icon: Facebook
  }
];

// Financial menu items
const financeItems = [
  {
    title: 'Visão Financeira',
    path: '/admin/financeiro',
    icon: DollarSign
  },
  {
    title: 'Fluxo de Caixa',
    path: '/admin/financeiro/fluxo-caixa',
    icon: Wallet
  },
  {
    title: 'Receitas',
    path: '/admin/financeiro/receitas',
    icon: BarChart
  },
  {
    title: 'Despesas',
    path: '/admin/financeiro/despesas',
    icon: CreditCard
  },
  {
    title: 'Contas',
    path: '/admin/financeiro/contas',
    icon: Receipt
  },
  {
    title: 'Relatórios',
    path: '/admin/financeiro/relatorios',
    icon: PieChart
  },
  {
    title: 'Contabilidade',
    path: '/admin/financeiro/contabilidade',
    icon: FileText
  }
];

const AdminSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { signOut } = useAuth();
  
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center py-6">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold">NuFlow Admin</h2>
        </div>
      </SidebarHeader>
      <SidebarContent className="py-4">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                asChild 
                isActive={currentPath === item.path}
                tooltip={item.title}
              >
                <Link to={item.path} className="w-full">
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        
        {/* Marketing Section Separator */}
        <div className="py-2">
          <SidebarSeparator />
          <SidebarGroupLabel className="px-2 py-1 mt-2">Marketing</SidebarGroupLabel>
        </div>
        
        <SidebarMenu>
          {marketingItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                asChild 
                isActive={currentPath === item.path}
                tooltip={item.title}
              >
                <Link to={item.path} className="w-full">
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        
        {/* Finance Section Separator */}
        <div className="py-2">
          <SidebarSeparator />
          <SidebarGroupLabel className="px-2 py-1 mt-2">Financeiro</SidebarGroupLabel>
        </div>
        
        <SidebarMenu>
          {financeItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                asChild 
                isActive={currentPath === item.path || currentPath.startsWith(item.path + '/')}
                tooltip={item.title}
              >
                <Link to={item.path} className="w-full">
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="mt-auto pb-4">
        <div className="flex flex-col items-center gap-2 px-2">
          <Button variant="outline" className="w-full gap-2" onClick={() => signOut()}>
            <LogOut size={18} />
            <span>Sair</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
