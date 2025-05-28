
import React from 'react';
import { usePartner } from '@/contexts/PartnerContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Calendar, Users, CalendarDays } from 'lucide-react';

export const PartnerDashboard: React.FC = () => {
  const { getEnabledFunctions, loading } = usePartner();

  const enabledFunctions = getEnabledFunctions();

  const functionLabels = {
    creditos: { label: 'Créditos', icon: CreditCard, color: 'text-blue-600' },
    day_use: { label: 'Day Use', icon: CalendarDays, color: 'text-green-600' },
    assinaturas: { label: 'Assinaturas', icon: Users, color: 'text-purple-600' },
    eventos: { label: 'Eventos', icon: Calendar, color: 'text-orange-600' }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard do Parceiro</h1>
        <p className="text-gray-600 mt-2">
          Bem-vindo ao seu painel de controle. Aqui você pode gerenciar suas funções habilitadas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Funções Habilitadas</CardTitle>
            <CardDescription>
              Você tem acesso às seguintes funções
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-nuflow-primary">
              {enabledFunctions.length}
            </div>
          </CardContent>
        </Card>

        {enabledFunctions.map(func => {
          const config = functionLabels[func as keyof typeof functionLabels];
          if (!config) return null;
          
          const Icon = config.icon;
          
          return (
            <Card key={func}>
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {config.label}
                </CardTitle>
                <Icon className={`h-4 w-4 ml-auto ${config.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Ativo</div>
                <p className="text-xs text-muted-foreground">
                  Função habilitada para uso
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {enabledFunctions.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Nenhuma Função Habilitada</CardTitle>
            <CardDescription>
              Entre em contato com o administrador para habilitar suas funções.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
};
