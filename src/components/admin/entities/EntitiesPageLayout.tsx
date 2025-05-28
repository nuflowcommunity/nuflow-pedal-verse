
import React from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { EntityHeader } from './EntityHeader';
import { EntityStats } from './EntityStats';
import { EntityTypesTabs } from './EntityTypesTabs';
import { EntityTableContent } from './EntityTableContent';
import LoadingSkeleton from '@/components/ui/loading-skeleton';

interface EntitiesPageLayoutProps {
  loading: boolean;
  activeTab: string;
  stats: any;
  onTabChange: (value: string) => void;
  onRefresh: () => void;
  onViewIssues: () => void;
  children: React.ReactNode;
}

export const EntitiesPageLayout: React.FC<EntitiesPageLayoutProps> = ({
  loading,
  activeTab,
  stats,
  onTabChange,
  onRefresh,
  onViewIssues,
  children
}) => {
  if (loading) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton variant="card" count={1} />
        <LoadingSkeleton variant="text" count={3} />
        <LoadingSkeleton variant="card" count={2} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <EntityHeader onRefresh={onRefresh} />
      
      <EntityStats 
        stats={stats}
        onViewIssues={onViewIssues}
      />
      
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <EntityTypesTabs 
          activeTab={activeTab}
          onTabChange={onTabChange}
        />
        
        <TabsContent value={activeTab} className="mt-6">
          {children}
        </TabsContent>
      </Tabs>
    </div>
  );
};
