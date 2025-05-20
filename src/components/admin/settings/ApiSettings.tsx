
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

const ApiSettings = () => {
  return (
    <div className="space-y-6">
      <Card className="transition-all hover:shadow-md">
        <CardHeader>
          <CardTitle>Chaves de API</CardTitle>
          <CardDescription>Gerencie suas chaves de API para integrações</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">Chave de API</Label>
            <div className="flex gap-2">
              <Input id="api-key" defaultValue="sk_test_****************" type="password" />
              <Button variant="outline">Mostrar</Button>
              <Button variant="outline">Gerar Nova</Button>
            </div>
            <p className="text-xs text-gray-500">Use esta chave para acessar a API do NuFlow</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="webhook">URL de Webhook</Label>
            <Input id="webhook" placeholder="https://seu-site.com/webhook" />
            <p className="text-xs text-gray-500">Receba notificações em tempo real</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="transition-all hover:shadow-md">
        <CardHeader>
          <CardTitle>Integrações</CardTitle>
          <CardDescription>Configure integrações com serviços externos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-md bg-[#0066FF] flex items-center justify-center text-white">
                P
              </div>
              <div>
                <h4 className="text-sm font-medium">Integração de Pagamentos</h4>
                <p className="text-xs text-gray-500">Processe pagamentos online</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-md bg-[#4285F4] flex items-center justify-center text-white">
                G
              </div>
              <div>
                <h4 className="text-sm font-medium">Google Analytics</h4>
                <p className="text-xs text-gray-500">Acompanhe o tráfego do site</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-md bg-[#FFE01B] flex items-center justify-center text-black">
                M
              </div>
              <div>
                <h4 className="text-sm font-medium">MailChimp</h4>
                <p className="text-xs text-gray-500">Gerencie listas de email</p>
              </div>
            </div>
            <Switch />
          </div>
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-md bg-[#4A154B] flex items-center justify-center text-white">
                S
              </div>
              <div>
                <h4 className="text-sm font-medium">Slack</h4>
                <p className="text-xs text-gray-500">Receba notificações no Slack</p>
              </div>
            </div>
            <Switch />
          </div>
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-md bg-[#F56565] flex items-center justify-center text-white">
                Z
              </div>
              <div>
                <h4 className="text-sm font-medium">Zapier</h4>
                <p className="text-xs text-gray-500">Automatize tarefas entre apps</p>
              </div>
            </div>
            <Switch />
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="ml-auto">
            Adicionar Nova Integração
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ApiSettings;
