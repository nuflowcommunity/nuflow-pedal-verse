
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { usePartner } from '@/contexts/PartnerContext';
import { Button } from '@/components/ui/button';
import { 
  CreditCard, 
  Calendar, 
  Users, 
  CalendarDays,
  Menu,
  X,
  Home,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: Home,
    path: '/partner/dashboard',
    alwaysVisible: true
  },
  {
    key: 'creditos',
    label: 'Créditos',
    icon: CreditCard,
    path: '/partner/creditos',
    permission: 'creditos'
  },
  {
    key: 'day_use',
    label: 'Day Use',
    icon: CalendarDays,
    path: '/partner/day-use',
    permission: 'day_use'
  },
  {
    key: 'assinaturas',
    label: 'Assinaturas',
    icon: Users,
    path: '/partner/assinaturas',
    permission: 'assinaturas'
  },
  {
    key: 'eventos',
    label: 'Eventos',
    icon: Calendar,
    path: '/partner/eventos',
    permission: 'eventos'
  },
  {
    key: 'configuracoes',
    label: 'Configurações',
    icon: Settings,
    path: '/partner/configuracoes',
    alwaysVisible: true
  }
];

export const PartnerSidebar: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { hasPermission, loading } = usePartner();
  const location = useLocation();

  const visibleItems = menuItems.filter(item => 
    item.alwaysVisible || (item.permission && hasPermission(item.permission))
  );

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-white">Menu do Parceiro</h2>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-10 bg-white/10 rounded animate-pulse" />
            ))}
          </div>
        ) : (
          visibleItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.key}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-white text-nuflow-primary"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })
        )}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 md:hidden bg-white shadow-md"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>

      {/* Desktop sidebar */}
      <div className="hidden md:flex w-64 bg-nuflow-primary flex-col">
        <SidebarContent />
      </div>

      {/* Mobile sidebar overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full w-64 bg-nuflow-primary">
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
};
