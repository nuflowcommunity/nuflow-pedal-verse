
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { FileText } from 'lucide-react';

const NotificationSettings = () => {
  return (
    <div className="space-y-6">
      <Card className="transition-all hover:shadow-md">
        <CardHeader>
          <CardTitle>Notificações do Sistema</CardTitle>
          <CardDescription>Configure as notificações enviadas pelo sistema</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Notificações por Email</h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">Novos registros</p>
                  <p className="text-xs text-gray-500">Email para novos usuários cadastrados</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">Novos pedidos</p>
                  <p className="text-xs text-gray-500">Email para confirmação de pedidos</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">Lembretes de eventos</p>
                  <p className="text-xs text-gray-500">Email lembrando sobre eventos próximos</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">Marketing</p>
                  <p className="text-xs text-gray-500">Email com promoções e novidades</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Notificações do Sistema</h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">Mensagens não lidas</p>
                  <p className="text-xs text-gray-500">Alerta no dashboard para novas mensagens</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">Novos pedidos</p>
                  <p className="text-xs text-gray-500">Alerta no dashboard para novos pedidos</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">Notificações em tempo real</p>
                  <p className="text-xs text-gray-500">Atualizar informações sem recarregar</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">Resumo diário</p>
                  <p className="text-xs text-gray-500">Enviar relatório diário das atividades</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="transition-all hover:shadow-md">
        <CardHeader>
          <CardTitle>Templates de Email</CardTitle>
          <CardDescription>Personalize os templates de email enviados pelo sistema</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="welcome-email">Email de Boas-vindas</Label>
              <div className="h-32 rounded-md border border-gray-200 bg-gray-50 p-2 text-xs text-gray-500 overflow-auto">
                Olá {'{name}'},<br/><br/>
                Seja bem-vindo(a) ao NuFlow!<br/>
                Estamos felizes em tê-lo(a) conosco.<br/><br/>
                Atenciosamente,<br/>
                Equipe NuFlow
              </div>
              <Button variant="outline" size="sm" className="mt-2">
                <FileText className="mr-1 h-4 w-4" /> 
                Editar Template
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="order-email">Confirmação de Pedido</Label>
              <div className="h-32 rounded-md border border-gray-200 bg-gray-50 p-2 text-xs text-gray-500 overflow-auto">
                Olá {'{name}'},<br/><br/>
                Seu pedido #{'{order_id}'} foi confirmado!<br/>
                Valor: R$ {'{value}'}<br/><br/>
                Atenciosamente,<br/>
                Equipe NuFlow
              </div>
              <Button variant="outline" size="sm" className="mt-2">
                <FileText className="mr-1 h-4 w-4" /> 
                Editar Template
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="ml-auto">
            Gerenciar Todos os Templates
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default NotificationSettings;
