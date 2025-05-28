
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, Users, CreditCard } from 'lucide-react';
import { useBreakpoint } from '@/hooks/use-breakpoint';

interface EntityTypesTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const EntityTypesTabs: React.FC<EntityTypesTabsProps> = ({
  activeTab,
  onTabChange
}) => {
  const isMobile = useBreakpoint('md');

  return (
    <div className="w-full overflow-x-auto">
      <TabsList className={`grid w-full ${isMobile ? 'grid-cols-3' : 'grid-cols-5'} ${isMobile ? 'min-w-max' : ''}`}>
        <TabsTrigger value="todos" className="flex items-center gap-1 text-xs sm:text-sm">
          Todos
        </TabsTrigger>
        <TabsTrigger value="evento" className="flex items-center gap-1 text-xs sm:text-sm">
          <Calendar className="h-4 w-4" />
          <span>Eventos</span>
        </TabsTrigger>
        <TabsTrigger value="mensalidade" className="flex items-center gap-1 text-xs sm:text-sm">
          <Clock className="h-4 w-4" />
          <span>Mensalidades</span>
        </TabsTrigger>
        <TabsTrigger value="dayUse" className="flex items-center gap-1 text-xs sm:text-sm">
          <Users className="h-4 w-4" />
          <span>Day Use</span>
        </TabsTrigger>
        <TabsTrigger value="credito" className="flex items-center gap-1 text-xs sm:text-sm">
          <CreditCard className="h-4 w-4" />
          <span>Créditos</span>
        </TabsTrigger>
      </TabsList>
    </div>
  );
};
