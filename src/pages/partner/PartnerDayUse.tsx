
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, Plus, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const PartnerDayUse: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Day Use</h1>
          <p className="text-gray-600 mt-2">
            Gerencie as reservas de day use do seu estabelecimento
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          Nova Reserva
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Reservas Hoje
            </CardTitle>
            <CalendarDays className="h-4 w-4 ml-auto text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 em relação a ontem
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ocupação Atual
            </CardTitle>
            <Users className="h-4 w-4 ml-auto text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8/12</div>
            <p className="text-xs text-muted-foreground">
              66% de ocupação
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Próximas Chegadas
            </CardTitle>
            <Clock className="h-4 w-4 ml-auto text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Nas próximas 2 horas
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agenda de Reservas</CardTitle>
          <CardDescription>
            Visualize e gerencie todas as reservas de day use
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <CalendarDays size={48} className="mx-auto mb-4 opacity-50" />
            <p>Nenhuma reserva encontrada</p>
            <p className="text-sm">As reservas aparecerão aqui conforme forem criadas</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
