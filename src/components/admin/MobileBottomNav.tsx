
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  ShoppingCart, 
  Users, 
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';

const mobileNavItems = [
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
];

const MobileBottomNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-2">
        {mobileNavItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <Link
              key={item.title}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-colors min-w-0 flex-1",
                isActive 
                  ? "text-nuflow-forest bg-nuflow-mint/30" 
                  : "text-gray-600 hover:text-nuflow-forest hover:bg-gray-100"
              )}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span className="text-xs truncate">{item.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;
