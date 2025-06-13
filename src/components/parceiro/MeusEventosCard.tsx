
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { StatusBadge } from '@/components/ui/status-badge';
import { Calendar, MapPin, Users, Plus } from 'lucide-react';

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
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleViewEvent = (eventId: string) => {
    navigate(`/eventos/${eventId}`);
  };

  const handleCreateEvent = () => {
    navigate('/criar-evento');
  };

  if (isLoading) {
    return (
      <Card className="bg-trailflow-white border-trailflow-lighter/20 shadow-modern">
        <CardHeader>
          <CardTitle className="text-trailflow-dark flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            Meus Eventos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-trailflow-lighter/20 rounded-lg p-4 space-y-3">
              <Skeleton className="h-5 w-3/4 bg-trailflow-lighter/30" />
              <Skeleton className="h-4 w-1/2 bg-trailflow-lighter/30" />
              <Skeleton className="h-4 w-1/3 bg-trailflow-lighter/30" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-trailflow-white border-trailflow-lighter/20 shadow-modern">
      <CardHeader>
        <CardTitle className="text-trailflow-dark flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          Meus Eventos
        </CardTitle>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 mx-auto bg-trailflow-accent rounded-full flex items-center justify-center">
              <Calendar className="w-8 h-8 text-trailflow-green" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-trailflow-dark">Nenhum evento criado</h3>
              <p className="text-trailflow-medium">Comece criando seu primeiro evento para atrair participantes.</p>
            </div>
            <Button 
              onClick={handleCreateEvent}
              className="bg-trailflow-green hover:bg-trailflow-green-dark text-white hover:shadow-lg transition-all duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              Criar primeiro evento
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div 
                key={event.id} 
                className="border border-trailflow-lighter/20 rounded-lg p-4 hover:shadow-md hover:border-trailflow-green/30 transition-all duration-200 hover-lift-sm"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-lg text-trailflow-dark leading-tight">
                    {event.title}
                  </h3>
                  <StatusBadge status={event.status as any} />
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-trailflow-medium text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-trailflow-green" />
                    {formatDate(event.date)}
                  </div>
                  <div className="flex items-center text-trailflow-medium text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-trailflow-green" />
                    <span className="truncate">{event.city} - {event.location}</span>
                  </div>
                  <div className="flex items-center text-trailflow-medium text-sm">
                    <Users className="h-4 w-4 mr-2 text-trailflow-green" />
                    {event.registrations_count} {event.registrations_count === 1 ? 'inscrito' : 'inscritos'}
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleViewEvent(event.id)}
                  className="border-trailflow-green text-trailflow-green hover:bg-trailflow-green hover:text-white transition-all duration-200"
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
