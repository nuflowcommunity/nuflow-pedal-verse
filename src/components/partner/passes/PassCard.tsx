
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Mail, CreditCard } from 'lucide-react';
import { Pass } from '@/types/passes';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface PassCardProps {
  pass: Pass;
}

export const PassCard: React.FC<PassCardProps> = ({ pass }) => {
  const getTypeLabel = (type: string) => {
    const labels = {
      day_use: 'Day Use',
      mensalista: 'Mensalista',
      evento: 'Evento',
      credito: 'Crédito'
    };
    return labels[type as keyof typeof labels];
  };

  const getStatusColor = (status: string) => {
    const colors = {
      futuro: 'bg-green-100 text-green-800 border-green-200',
      usado: 'bg-gray-100 text-gray-800 border-gray-200',
      cancelado: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status as keyof typeof colors];
  };

  const getCardBorderColor = (status: string) => {
    return status === 'futuro' ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-gray-300';
  };

  return (
    <Card className={`hover:shadow-md transition-shadow ${getCardBorderColor(pass.status)}`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex gap-2">
            <Badge variant="outline" className="text-xs">
              {getTypeLabel(pass.type)}
            </Badge>
            <Badge className={`text-xs ${getStatusColor(pass.status)}`}>
              {pass.status === 'futuro' ? 'Futuro' : pass.status === 'usado' ? 'Usado' : 'Cancelado'}
            </Badge>
          </div>
          <div className="text-right">
            <div className="font-bold text-lg text-nuflow-forest">
              R$ {pass.price.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <User size={16} />
            <span className="font-medium">{pass.participantName}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail size={16} />
            <span>{pass.participantEmail}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CreditCard size={16} />
            <span>{pass.partner}</span>
          </div>

          {pass.validDate && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar size={16} />
              <span>
                Válido: {format(new Date(pass.validDate), 'dd/MM/yyyy', { locale: ptBR })}
              </span>
            </div>
          )}

          {pass.usedAt && (
            <div className="text-xs text-gray-500 mt-2 pt-2 border-t">
              Usado em: {format(new Date(pass.usedAt), 'dd/MM/yyyy \'às\' HH:mm', { locale: ptBR })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
