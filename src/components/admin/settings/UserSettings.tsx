
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

const UserSettings = () => {
  return (
    <div className="space-y-6">
      <Card className="transition-all hover:shadow-md">
        <CardHeader>
          <CardTitle>Configurações de Usuários</CardTitle>
          <CardDescription>Gerencie as configurações relacionadas aos usuários</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Registro de Usuários</h4>
              <p className="text-sm text-gray-500">Permitir que novos usuários se registrem no site</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Verificação de Email</h4>
              <p className="text-sm text-gray-500">Exigir verificação de email para novos cadastros</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Registro de Parceiros</h4>
              <p className="text-sm text-gray-500">Permitir que empresas se tornem parceiras</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Aprovação de Parceiros</h4>
              <p className="text-sm text-gray-500">Aprovar manualmente novos parceiros</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
      
      <Card className="transition-all hover:shadow-md">
        <CardHeader>
          <CardTitle>Permissões</CardTitle>
          <CardDescription>Configure as permissões dos diferentes tipos de usuário</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Administradores</h4>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <Switch id="admin-events" defaultChecked />
                <Label htmlFor="admin-events">Gerenciar Eventos</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="admin-users" defaultChecked />
                <Label htmlFor="admin-users">Gerenciar Usuários</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="admin-settings" defaultChecked />
                <Label htmlFor="admin-settings">Configurações do Sistema</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="admin-orders" defaultChecked />
                <Label htmlFor="admin-orders">Gerenciar Pedidos</Label>
              </div>
            </div>
            
            <h4 className="text-sm font-medium mt-6">Parceiros</h4>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <Switch id="partner-events" defaultChecked />
                <Label htmlFor="partner-events">Criar Eventos</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="partner-reports" defaultChecked />
                <Label htmlFor="partner-reports">Ver Relatórios</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="partner-messages" defaultChecked />
                <Label htmlFor="partner-messages">Mensagens de Clientes</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="partner-billing" defaultChecked />
                <Label htmlFor="partner-billing">Gerenciar Cobranças</Label>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="ml-auto">
            Gerenciar Funções Avançadas
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default UserSettings;
