
import React from 'react';
import SettingsTabs from '@/components/admin/settings/SettingsTabs';

const SettingsAdmin = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
      </div>
      <SettingsTabs />
    </div>
  );
};

export default SettingsAdmin;
