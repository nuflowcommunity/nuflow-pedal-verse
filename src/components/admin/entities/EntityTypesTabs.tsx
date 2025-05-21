
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { entityTypeIcons } from './EntityIcons';

interface EntityTypesTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const EntityTypesTabs: React.FC<EntityTypesTabsProps> = ({
  activeTab,
  setActiveTab
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-5 md:w-auto w-full">
        <TabsTrigger value="todos">Todos</TabsTrigger>
        <TabsTrigger value="evento" className="flex items-center gap-1">
          {entityTypeIcons.evento}
          Eventos
        </TabsTrigger>
        <TabsTrigger value="mensalidade" className="flex items-center gap-1">
          {entityTypeIcons.mensalidade}
          Mensalidades
        </TabsTrigger>
        <TabsTrigger value="dayUse" className="flex items-center gap-1">
          {entityTypeIcons.dayUse}
          Day Use
        </TabsTrigger>
        <TabsTrigger value="credito" className="flex items-center gap-1">
          {entityTypeIcons.credito}
          Créditos
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
