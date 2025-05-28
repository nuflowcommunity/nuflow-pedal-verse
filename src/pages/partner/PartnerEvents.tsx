
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Plus, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const PartnerEvents: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Eventos</h1>
          <p className="text-gray-600 mt-2">
            Organize e gerencie eventos no seu estabelecimento
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          Novo Evento
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Eventos Este Mês
            </CardTitle>
            <Calendar className="h-4 w-4 ml-auto text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              +2 em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Participantes Totais
            </CardTitle>
            <Users className="h-4 w-4 ml-auto text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234</div>
            <p className="text-xs text-muted-foreground">
              Média de 29 por evento
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Próximo Evento
            </CardTitle>
            <Clock className="h-4 w-4 ml-auto text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2 dias</div>
            <p className="text-xs text-muted-foreground">
              Mountain Bike Adventure
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Taxa de Ocupação
            </CardTitle>
            <Calendar className="h-4 w-4 ml-auto text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">
              Média de ocupação dos eventos
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Calendário de Eventos</CardTitle>
          <CardDescription>
            Visualize todos os eventos programados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Calendar size={48} className="mx-auto mb-4 opacity-50" />
            <p>Nenhum evento programado</p>
            <p className="text-sm">Comece criando eventos para atrair mais clientes</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
