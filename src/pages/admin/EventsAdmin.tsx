
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Settings } from 'lucide-react';
import { EventApprovalPage } from '@/components/admin/events/EventApprovalPage';
import EventManagementPage from '@/components/admin/events/EventManagementPage';

const EventsAdmin = () => {
  const [activeTab, setActiveTab] = useState('management');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Administração de Eventos</h1>
          <p className="text-gray-600">Sistema completo de gerenciamento de eventos esportivos.</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="management" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Gerenciamento Completo
          </TabsTrigger>
          <TabsTrigger value="approval" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Aprovação Rápida
          </TabsTrigger>
        </TabsList>

        <TabsContent value="management" className="mt-6">
          <EventManagementPage />
        </TabsContent>

        <TabsContent value="approval" className="mt-6">
          <EventApprovalPage />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventsAdmin;
