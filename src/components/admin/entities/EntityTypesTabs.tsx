
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { entityTypeIcons } from './EntityIcons';

interface EntityTypesTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const EntityTypesTabs: React.FC<EntityTypesTabsProps> = ({
  activeTab,
  onTabChange
}) => {
  return (
    <TabsList className="grid grid-cols-5 md:w-auto w-full">
      <TabsTrigger value="todos" onClick={() => onTabChange('todos')}>Todos</TabsTrigger>
      <TabsTrigger value="evento" className="flex items-center gap-1" onClick={() => onTabChange('evento')}>
        {entityTypeIcons.evento}
        Eventos
      </TabsTrigger>
      <TabsTrigger value="mensalidade" className="flex items-center gap-1" onClick={() => onTabChange('mensalidade')}>
        {entityTypeIcons.mensalidade}
        Mensalidades
      </TabsTrigger>
      <TabsTrigger value="dayUse" className="flex items-center gap-1" onClick={() => onTabChange('dayUse')}>
        {entityTypeIcons.dayUse}
        Day Use
      </TabsTrigger>
      <TabsTrigger value="credito" className="flex items-center gap-1" onClick={() => onTabChange('credito')}>
        {entityTypeIcons.credito}
        Créditos
      </TabsTrigger>
    </TabsList>
  );
};
