
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  Users, 
  Bell, 
  Palette, 
  Key, 
  Shield, 
  Database 
} from 'lucide-react';

const SettingsTabs: React.FC = () => {
  return (
    <TabsList className="mb-6 flex flex-wrap w-full sm:w-auto">
      <TabsTrigger value="general" className="flex items-center gap-2">
        <Settings size={16} />
        <span>Geral</span>
      </TabsTrigger>
      <TabsTrigger value="users" className="flex items-center gap-2">
        <Users size={16} />
        <span>Usuários</span>
      </TabsTrigger>
      <TabsTrigger value="notifications" className="flex items-center gap-2">
        <Bell size={16} />
        <span>Notificações</span>
      </TabsTrigger>
      <TabsTrigger value="appearance" className="flex items-center gap-2">
        <Palette size={16} />
        <span>Aparência</span>
      </TabsTrigger>
      <TabsTrigger value="api" className="flex items-center gap-2">
        <Key size={16} />
        <span>API & Integrações</span>
      </TabsTrigger>
      <TabsTrigger value="security" className="flex items-center gap-2">
        <Shield size={16} />
        <span>Segurança</span>
      </TabsTrigger>
      <TabsTrigger value="backups" className="flex items-center gap-2">
        <Database size={16} />
        <span>Backups</span>
      </TabsTrigger>
    </TabsList>
  );
}

export default SettingsTabs;
