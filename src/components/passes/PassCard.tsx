
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Ticket, Eye } from 'lucide-react';
import { Pass } from '@/types/passes';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface PassCardProps {
  pass: Pass;
  onViewDetails: (pass: Pass) => void;
}

export const PassCard: React.FC<PassCardProps> = ({ pass, onViewDetails }) => {
  const getTypeLabel = (type: string) => {
    const labels = {
      day_use: 'Day Use',
      mensalista: 'Mensalista',
      evento: 'Evento',
      credito: 'Crédito'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getStatusConfig = (status: string) => {
    const configs = {
      futuro: {
        label: 'Ativo',
        className: 'bg-green-100 text-green-800 border-green-200'
      },
      usado: {
        label: 'Usado',
        className: 'bg-gray-100 text-gray-800 border-gray-200'
      },
      cancelado: {
        label: 'Cancelado',
        className: 'bg-red-100 text-red-800 border-red-200'
      }
    };
    return configs[status as keyof typeof configs] || {
      label: status,
      className: 'bg-gray-100 text-gray-800 border-gray-200'
    };
  };

  const statusConfig = getStatusConfig(pass.status);
  const isActive = pass.status === 'futuro';

  return (
    <Card className={`hover:shadow-lg transition-all duration-300 ${isActive ? 'border-l-4 border-l-trailflow-green' : 'border-l-4 border-l-gray-300'}`}>
      <CardContent className="p-6">
        {/* Header with badges */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-2">
            <Badge variant="outline" className="text-xs">
              {getTypeLabel(pass.type)}
            </Badge>
            <Badge className={`text-xs ${statusConfig.className}`}>
              {statusConfig.label}
            </Badge>
          </div>
          <div className="text-right">
            <div className="font-bold text-lg text-trailflow-green">
              R$ {pass.price.toFixed(2).replace('.', ',')}
            </div>
          </div>
        </div>

        {/* Event details */}
        <div className="space-y-3 mb-4">
          <div>
            <h3 className="font-semibold text-lg text-trailflow-dark mb-1">
              {pass.partner}
            </h3>
            <p className="text-sm text-gray-600">{pass.participantName}</p>
          </div>

          {pass.validDate && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar size={16} className="text-trailflow-green" />
              <span>
                {format(new Date(pass.validDate), 'dd/MM/yyyy', { locale: ptBR })}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin size={16} className="text-trailflow-green" />
            <span>Local do evento</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Ticket size={16} className="text-trailflow-green" />
            <span>{getTypeLabel(pass.type)}</span>
          </div>
        </div>

        {/* Additional info for used passes */}
        {pass.usedAt && (
          <div className="text-xs text-gray-500 mb-4 p-2 bg-gray-50 rounded">
            Utilizado em: {format(new Date(pass.usedAt), 'dd/MM/yyyy \'às\' HH:mm', { locale: ptBR })}
          </div>
        )}

        {/* View details button */}
        <Button
          onClick={() => onViewDetails(pass)}
          className="w-full bg-trailflow-green hover:bg-trailflow-green-dark"
        >
          <Eye size={16} className="mr-2" />
          Ver Passe
        </Button>
      </CardContent>
    </Card>
  );
};
