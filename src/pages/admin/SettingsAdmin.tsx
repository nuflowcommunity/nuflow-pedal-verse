
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import SettingsTabs from '@/components/admin/settings/SettingsTabs';
import TabContent from '@/components/admin/settings/TabContent';

const SettingsAdmin = () => {
  const { toast } = useToast();
  const [saveLoading, setSaveLoading] = useState(false);

  const handleSaveSettings = () => {
    setSaveLoading(true);
    // Simulate saving
    setTimeout(() => {
      setSaveLoading(false);
      toast({
        title: "Configurações salvas",
        description: "Suas configurações foram salvas com sucesso.",
        variant: "default"
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">Gerencie as configurações da sua plataforma.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Cancelar</Button>
          <Button 
            className="bg-[#19c37d] hover:bg-[#16a86c]" 
            onClick={handleSaveSettings}
            disabled={saveLoading}
          >
            {saveLoading ? (
              <>
                <span className="animate-spin mr-2">○</span>
                Salvando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </>
            )}
          </Button>
        </div>
      </div>
      <Tabs defaultValue="general" className="animate-fade-in">
        <SettingsTabs />
        
        <TabContent value="general" />
        <TabContent value="users" />
        <TabContent value="notifications" />
        <TabContent value="appearance" />
        <TabContent value="api" />
        <TabContent value="security" />
        <TabContent value="backups" />
      </Tabs>
    </div>
  );
};

export default SettingsAdmin;
