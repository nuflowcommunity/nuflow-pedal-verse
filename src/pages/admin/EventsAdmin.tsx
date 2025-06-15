
import React from 'react';
import EventManagementPage from '@/components/admin/events/EventManagementPage';

const EventsAdmin = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Gerenciamento de Eventos</h1>
      </div>
      <EventManagementPage />
    </div>
  );
};

export default EventsAdmin;
