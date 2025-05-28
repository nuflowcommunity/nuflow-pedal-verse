
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useEventApproval } from '@/hooks/useEventApproval';
import { EventApprovalTable } from './EventApprovalTable';
import LoadingTransition from '@/components/ui/loading-transition';

const statusConfig = {
  pending: { label: 'Pendentes', color: 'bg-yellow-100 text-yellow-800', count: 0 },
  approved: { label: 'Aprovados', color: 'bg-green-100 text-green-800', count: 0 },
  rejected: { label: 'Rejeitados', color: 'bg-red-100 text-red-800', count: 0 },
  all: { label: 'Todos', color: 'bg-gray-100 text-gray-800', count: 0 },
};

export const EventApprovalPage: React.FC = () => {
  const { events, isLoading, selectedStatus, setSelectedStatus } = useEventApproval();

  // Calcular contadores
  const counters = React.useMemo(() => {
    const counts = { pending: 0, approved: 0, rejected: 0, all: events.length };
    events.forEach(event => {
      if (event.status === 'pending') counts.pending++;
      else if (event.status === 'approved') counts.approved++;
      else if (event.status === 'rejected') counts.rejected++;
    });
    return counts;
  }, [events]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingTransition />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Aprovação de Eventos</h1>
        <p className="text-gray-600">
          Gerencie aprovações, configure pagamentos e personalize formulários de inscrição.
        </p>
      </div>

      <Tabs value={selectedStatus} onValueChange={setSelectedStatus} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          {Object.entries(statusConfig).map(([key, config]) => (
            <TabsTrigger key={key} value={key} className="relative">
              {config.label}
              <Badge 
                variant="secondary" 
                className={`ml-2 ${config.color}`}
              >
                {counters[key as keyof typeof counters]}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.keys(statusConfig).map((status) => (
          <TabsContent key={status} value={status} className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  Eventos {statusConfig[status as keyof typeof statusConfig].label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <EventApprovalTable 
                  events={events}
                  status={status}
                />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
