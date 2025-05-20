
import React from 'react';
import GeneralSettings from './GeneralSettings';
import UserSettings from './UserSettings';
import NotificationSettings from './NotificationSettings';
import AppearanceSettings from './AppearanceSettings';
import ApiSettings from './ApiSettings';
import SecuritySettings from './SecuritySettings';
import BackupSettings from './BackupSettings';
import { TabsContent } from '@/components/ui/tabs';

type TabContentProps = {
  value: string;
};

const TabContent: React.FC<TabContentProps> = ({ value }) => {
  const renderContent = () => {
    switch (value) {
      case 'general':
        return <GeneralSettings />;
      case 'users':
        return <UserSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'appearance':
        return <AppearanceSettings />;
      case 'api':
        return <ApiSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'backups':
        return <BackupSettings />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <TabsContent value={value} className="space-y-6">
      {renderContent()}
    </TabsContent>
  );
};

export default TabContent;
