
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
  Package2,
  Ticket
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
    title: 'Cupons',
    path: '/admin/cupons',
    icon: Ticket
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
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarHeader className="flex items-center justify-center py-4 md:py-6 border-b border-gray-200 bg-white">
        <div className="flex flex-col items-center">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">NuFlow Admin</h2>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="py-2 md:py-4 bg-white">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                asChild 
                isActive={currentPath === item.path}
                tooltip={item.title}
                className={`
                  w-full text-gray-700 hover:bg-gray-100 hover:text-gray-900
                  ${currentPath === item.path 
                    ? 'bg-gray-100 text-gray-900 font-semibold' 
                    : ''
                  }
                `}
              >
                <Link to={item.path} className="w-full">
                  <item.icon className="text-gray-600" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        
        {/* Marketing Section */}
        <div className="py-2">
          <SidebarSeparator className="bg-gray-200" />
          <SidebarGroupLabel className="px-2 py-1 mt-2 text-gray-700 font-medium">Marketing</SidebarGroupLabel>
        </div>
        
        <SidebarMenu>
          {marketingItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                asChild 
                isActive={currentPath === item.path}
                tooltip={item.title}
                className={`
                  w-full text-gray-700 hover:bg-gray-100 hover:text-gray-900
                  ${currentPath === item.path 
                    ? 'bg-gray-100 text-gray-900 font-semibold' 
                    : ''
                  }
                `}
              >
                <Link to={item.path} className="w-full">
                  <item.icon className="text-gray-600" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        
        {/* Finance Section */}
        <div className="py-2">
          <SidebarSeparator className="bg-gray-200" />
          <SidebarGroupLabel className="px-2 py-1 mt-2 text-gray-700 font-medium">Financeiro</SidebarGroupLabel>
        </div>
        
        <SidebarMenu>
          {financeItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                asChild 
                isActive={currentPath === item.path || currentPath.startsWith(item.path + '/')}
                tooltip={item.title}
                className={`
                  w-full text-gray-700 hover:bg-gray-100 hover:text-gray-900
                  ${(currentPath === item.path || currentPath.startsWith(item.path + '/'))
                    ? 'bg-gray-100 text-gray-900 font-semibold' 
                    : ''
                  }
                `}
              >
                <Link to={item.path} className="w-full">
                  <item.icon className="text-gray-600" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="mt-auto pb-4 border-t border-gray-200 bg-white">
        <div className="flex flex-col items-center gap-2 px-2">
          <Button 
            variant="outline" 
            className="w-full gap-2 text-red-600 border-red-200 hover:bg-red-50 bg-white" 
            onClick={() => signOut()}
          >
            <LogOut size={18} />
            <span>Sair</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
