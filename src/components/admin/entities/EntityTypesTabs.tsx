
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { entityTypeIcons } from './EntityIcons';
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
          <span className="hidden sm:inline">{entityTypeIcons.evento}</span>
          <span>Eventos</span>
        </TabsTrigger>
        <TabsTrigger value="mensalidade" className="flex items-center gap-1 text-xs sm:text-sm">
          <span className="hidden sm:inline">{entityTypeIcons.mensalidade}</span>
          <span>Mensalidades</span>
        </TabsTrigger>
        <TabsTrigger value="dayUse" className="flex items-center gap-1 text-xs sm:text-sm">
          <span className="hidden sm:inline">{entityTypeIcons.dayUse}</span>
          <span>Day Use</span>
        </TabsTrigger>
        <TabsTrigger value="credito" className="flex items-center gap-1 text-xs sm:text-sm">
          <span className="hidden sm:inline">{entityTypeIcons.credito}</span>
          <span>Créditos</span>
        </TabsTrigger>
      </TabsList>
    </div>
  );
};
