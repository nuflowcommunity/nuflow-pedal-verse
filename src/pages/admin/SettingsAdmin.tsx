
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

const SettingsAdmin = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="general">
        <TabsList className="mb-6">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="appearance">Aparência</TabsTrigger>
          <TabsTrigger value="api">API & Integrações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Site</CardTitle>
              <CardDescription>Atualize as informações básicas do seu site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Nome do Site</Label>
                  <Input id="site-name" defaultValue="NuFlow" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-url">URL do Site</Label>
                  <Input id="site-url" defaultValue="https://nuflow.com.br" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-description">Descrição do Site</Label>
                <Input id="site-description" defaultValue="Plataforma de eventos de ciclismo" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Email de Contato</Label>
                <Input id="contact-email" type="email" defaultValue="contato@nuflow.com.br" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>SEO</CardTitle>
              <CardDescription>Configure as informações de SEO do site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta-title">Meta Title</Label>
                <Input id="meta-title" defaultValue="NuFlow - Eventos de Ciclismo" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta-description">Meta Description</Label>
                <Input id="meta-description" defaultValue="Encontre e participe dos melhores eventos de ciclismo no Brasil" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords</Label>
                <Input id="keywords" defaultValue="ciclismo, eventos, bike, mtb, speed, gravel" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-6">
          <Card>
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
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Verificação de Email</h4>
                  <p className="text-sm text-gray-500">Exigir verificação de email para novos cadastros</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Registro de Parceiros</h4>
                  <p className="text-sm text-gray-500">Permitir que empresas se tornem parceiras</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Aprovação de Parceiros</h4>
                  <p className="text-sm text-gray-500">Aprovar manualmente novos parceiros</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
          
          <Card>
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
                
                <h4 className="text-sm font-medium">Parceiros</h4>
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
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card>
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
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Templates de Email</CardTitle>
              <CardDescription>Personalize os templates de email enviados pelo sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="welcome-email">Email de Boas-vindas</Label>
                  <div className="h-32 rounded-md border border-gray-200 bg-gray-50 p-2 text-xs text-gray-500">
                    Template do email de boas-vindas enviado aos novos usuários
                  </div>
                  <Button variant="outline" size="sm">Editar Template</Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order-email">Confirmação de Pedido</Label>
                  <div className="h-32 rounded-md border border-gray-200 bg-gray-50 p-2 text-xs text-gray-500">
                    Template do email de confirmação de pedido
                  </div>
                  <Button variant="outline" size="sm">Editar Template</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Aparência do Site</CardTitle>
              <CardDescription>Personalize a aparência do site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Cor Primária</Label>
                  <div className="flex gap-2">
                    <div className="h-10 w-10 rounded-md bg-[#19c37d]" />
                    <Input id="primary-color" defaultValue="#19c37d" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondary-color">Cor Secundária</Label>
                  <div className="flex gap-2">
                    <div className="h-10 w-10 rounded-md bg-[#222222]" />
                    <Input id="secondary-color" defaultValue="#222222" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Modo do Site</Label>
                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="light-mode" defaultChecked />
                    <Label htmlFor="light-mode">Modo Claro</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="dark-mode" />
                    <Label htmlFor="dark-mode">Modo Escuro</Label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="logo">Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-md bg-gray-100 flex items-center justify-center text-gray-500 text-xs">
                    Logo
                  </div>
                  <Button variant="outline">Trocar Logo</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="favicon">Favicon</Label>
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-md bg-gray-100 flex items-center justify-center text-gray-500 text-xs">
                    Icon
                  </div>
                  <Button variant="outline">Trocar Favicon</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api" className="space-y-6">
          <Card>
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
          
          <Card>
            <CardHeader>
              <CardTitle>Integrações</CardTitle>
              <CardDescription>Configure integrações com serviços externos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center text-gray-500">
                    P
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Integração de Pagamentos</h4>
                    <p className="text-xs text-gray-500">Processe pagamentos online</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center text-gray-500">
                    G
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Google Analytics</h4>
                    <p className="text-xs text-gray-500">Acompanhe o tráfego do site</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center text-gray-500">
                    M
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">MailChimp</h4>
                    <p className="text-xs text-gray-500">Gerencie listas de email</p>
                  </div>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center text-gray-500">
                    S
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Slack</h4>
                    <p className="text-xs text-gray-500">Receba notificações no Slack</p>
                  </div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancelar</Button>
        <Button className="bg-[#19c37d] hover:bg-[#16a86c]">Salvar Alterações</Button>
      </div>
    </div>
  );
};

export default SettingsAdmin;
