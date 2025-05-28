
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CreditCard, 
  Calendar, 
  Users, 
  PartyPopper, 
  Settings,
  FileText
} from 'lucide-react';
import { usePartner } from '@/contexts/PartnerContext';

const menuItems = [
  {
    title: 'Dashboard',
    href: '/partner/dashboard',
    icon: LayoutDashboard,
    alwaysVisible: true
  },
  {
    title: 'Passes Vendidos',
    href: '/partner/passes',
    icon: FileText,
    alwaysVisible: true
  },
  {
    title: 'Créditos',
    href: '/partner/creditos',
    icon: CreditCard,
    permission: 'creditos'
  },
  {
    title: 'Day Use',
    href: '/partner/day-use',
    icon: Calendar,
    permission: 'day_use'
  },
  {
    title: 'Assinaturas',
    href: '/partner/assinaturas',
    icon: Users,
    permission: 'assinaturas'
  },
  {
    title: 'Eventos',
    href: '/partner/eventos',
    icon: PartyPopper,
    permission: 'eventos'
  },
  {
    title: 'Configurações',
    href: '/partner/configuracoes',
    icon: Settings,
    alwaysVisible: true
  }
];

export const PartnerSidebar: React.FC = () => {
  const { hasPermission, loading } = usePartner();

  if (loading) {
    return (
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <div className="animate-pulse space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  const visibleItems = menuItems.filter(item => 
    item.alwaysVisible || (item.permission && hasPermission(item.permission))
  );

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-nuflow-forest">Painel Parceiro</h2>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {visibleItems.map((item) => (
            <li key={item.href}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-nuflow-mint text-nuflow-forest'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <item.icon size={20} />
                <span>{item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
