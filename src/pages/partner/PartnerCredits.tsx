
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Plus, History } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const PartnerCredits: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Créditos</h1>
          <p className="text-gray-600 mt-2">
            Gerencie os créditos disponíveis para seus clientes
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          Novo Crédito
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Créditos Ativos
            </CardTitle>
            <CreditCard className="h-4 w-4 ml-auto text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">
              +12% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Créditos Utilizados
            </CardTitle>
            <History className="h-4 w-4 ml-auto text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">189</div>
            <p className="text-xs text-muted-foreground">
              +8% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Créditos Pendentes
            </CardTitle>
            <CreditCard className="h-4 w-4 ml-auto text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">58</div>
            <p className="text-xs text-muted-foreground">
              Aguardando validação
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Créditos</CardTitle>
          <CardDescription>
            Visualize todos os créditos criados e seu status atual
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <CreditCard size={48} className="mx-auto mb-4 opacity-50" />
            <p>Nenhum crédito encontrado</p>
            <p className="text-sm">Comece criando seu primeiro pacote de créditos</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
