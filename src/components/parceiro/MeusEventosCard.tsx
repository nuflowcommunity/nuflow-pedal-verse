
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, MapPin, Users } from 'lucide-react';

interface PartnerEvent {
  id: string;
  title: string;
  date: string;
  city: string;
  location: string;
  registrations_count: number;
  status: string;
}

interface MeusEventosCardProps {
  events: PartnerEvent[];
  isLoading: boolean;
}

const MeusEventosCard: React.FC<MeusEventosCardProps> = ({ events, isLoading }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      'active': { label: 'Ativo', color: 'bg-green-100 text-green-800' },
      'completed': { label: 'Encerrado', color: 'bg-gray-100 text-gray-800' },
      'cancelled': { label: 'Cancelado', color: 'bg-red-100 text-red-800' },
      'draft': { label: 'Rascunho', color: 'bg-yellow-100 text-yellow-800' }
    };

    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.draft;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
        {statusInfo.label}
      </span>
    );
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-800">🟦 Meus Eventos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-lg p-4">
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-blue-800">🟦 Meus Eventos</CardTitle>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-4xl mb-4">📅</div>
            <p className="text-gray-600 mb-4">Você ainda não criou nenhum evento.</p>
            <Button 
              onClick={() => window.location.href = '/criar-evento'}
              className="bg-trailflow-green hover:bg-trailflow-green/90"
            >
              Criar seu primeiro evento
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-lg text-trailflow-dark">
                    {event.title}
                  </h3>
                  {getStatusBadge(event.status)}
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDate(event.date)}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.city} - {event.location}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Users className="h-4 w-4 mr-2" />
                    {event.registrations_count} ingressos vendidos
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.location.href = `/eventos/${event.id}`}
                >
                  Ver detalhes
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MeusEventosCard;
