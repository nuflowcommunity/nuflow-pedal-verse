
import React from 'react';
import { Calendar, MapPin, DollarSign, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface EventsStatsProps {
  totalEvents: number;
  averagePrice: number;
  citiesCount: number;
  totalParticipants: number;
}

export const EventsStats: React.FC<EventsStatsProps> = ({
  totalEvents,
  averagePrice,
  citiesCount,
  totalParticipants
}) => {
  const stats = [
    {
      icon: Calendar,
      label: 'Eventos Disponíveis',
      value: totalEvents.toString(),
      color: 'text-blue-600'
    },
    {
      icon: DollarSign,
      label: 'Preço Médio',
      value: averagePrice > 0 ? `R$ ${averagePrice.toFixed(0)}` : 'Gratuito',
      color: 'text-green-600'
    },
    {
      icon: MapPin,
      label: 'Cidades',
      value: citiesCount.toString(),
      color: 'text-purple-600'
    },
    {
      icon: Users,
      label: 'Participantes',
      value: `${totalParticipants}+`,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card key={index} className="bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-50 mb-3`}>
                <IconComponent className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">
                {stat.label}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
