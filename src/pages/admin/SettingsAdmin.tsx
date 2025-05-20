
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, 
  Save, 
  Server, 
  Shield, 
  Bell, 
  Palette, 
  Key, 
  Users, 
  Lock, 
  Database,
  FileText
} from 'lucide-react';

const SettingsAdmin = () => {
  const { toast } = useToast();
  const [saveLoading, setSaveLoading] = useState(false);

  const handleSaveSettings = () => {
    setSaveLoading(true);
    // Simulate saving
    setTimeout(() => {
      setSaveLoading(false);
      toast({
        title: "Configurações salvas",
        description: "Suas configurações foram salvas com sucesso.",
        variant: "success"
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">Gerencie as configurações da sua plataforma.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Cancelar</Button>
          <Button 
            className="bg-[#19c37d] hover:bg-[#16a86c]" 
            onClick={handleSaveSettings}
            disabled={saveLoading}
          >
            {saveLoading ? (
              <>
                <span className="animate-spin mr-2">○</span>
                Salvando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </>
            )}
          </Button>
        </div>
      </div>
      <Tabs defaultValue="general" className="animate-fade-in">
        <TabsList className="mb-6 flex flex-wrap w-full sm:w-auto">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings size={16} />
            <span>Geral</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users size={16} />
            <span>Usuários</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell size={16} />
            <span>Notificações</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette size={16} />
            <span>Aparência</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Key size={16} />
            <span>API & Integrações</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield size={16} />
            <span>Segurança</span>
          </TabsTrigger>
          <TabsTrigger value="backups" className="flex items-center gap-2">
            <Database size={16} />
            <span>Backups</span>
          </TabsTrigger>
        </TabsList>
        
        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card className="transition-all hover:shadow-md">
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
                <Textarea id="site-description" defaultValue="Plataforma de eventos de ciclismo" className="min-h-20" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Email de Contato</Label>
                <Input id="contact-email" type="email" defaultValue="contato@nuflow.com.br" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="transition-all hover:shadow-md">
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
                <Textarea id="meta-description" defaultValue="Encontre e participe dos melhores eventos de ciclismo no Brasil" className="min-h-20" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords</Label>
                <Input id="keywords" defaultValue="ciclismo, eventos, bike, mtb, speed, gravel" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle>Configurações Regionais</CardTitle>
              <CardDescription>Ajuste as configurações de região e idioma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuso Horário</Label>
                  <select id="timezone" className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option value="America/Sao_Paulo">Brasília (GMT-3)</option>
                    <option value="America/Manaus">Manaus (GMT-4)</option>
                    <option value="America/Rio_Branco">Rio Branco (GMT-5)</option>
                    <option value="America/Noronha">Fernando de Noronha (GMT-2)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Moeda</Label>
                  <select id="currency" className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option value="BRL">Real Brasileiro (R$)</option>
                    <option value="USD">Dólar Americano ($)</option>
                    <option value="EUR">Euro (€)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-format">Formato de Data</Label>
                  <select id="date-format" className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option value="DD/MM/YYYY">DD/MM/AAAA</option>
                    <option value="MM/DD/YYYY">MM/DD/AAAA</option>
                    <option value="YYYY-MM-DD">AAAA-MM-DD</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <select id="language" className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en-US">English (United States)</option>
                    <option value="es">Español</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Users Settings */}
        <TabsContent value="users" className="space-y-6">
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
        </TabsContent>
        
        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
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
        </TabsContent>
        
        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <Card className="transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle>Aparência do Site</CardTitle>
              <CardDescription>Personalize a aparência do site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Cor Primária</Label>
                  <div className="flex gap-2">
                    <div className="relative h-10 w-10 rounded-md bg-[#19c37d] overflow-hidden">
                      <input 
                        type="color" 
                        id="primary-color" 
                        defaultValue="#19c37d" 
                        className="absolute inset-0 opacity-0 cursor-pointer h-full w-full" 
                      />
                    </div>
                    <Input id="primary-color-value" defaultValue="#19c37d" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondary-color">Cor Secundária</Label>
                  <div className="flex gap-2">
                    <div className="relative h-10 w-10 rounded-md bg-[#222222] overflow-hidden">
                      <input 
                        type="color" 
                        id="secondary-color" 
                        defaultValue="#222222" 
                        className="absolute inset-0 opacity-0 cursor-pointer h-full w-full" 
                      />
                    </div>
                    <Input id="secondary-color-value" defaultValue="#222222" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label>Visualização</Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="border rounded-md p-3 flex flex-col items-center hover:border-[#19c37d] cursor-pointer transition-all">
                    <div className="h-24 w-full bg-white mb-2 rounded flex items-center justify-center border">
                      <div className="w-3/4 h-1/2 bg-[#19c37d] rounded" />
                    </div>
                    <span className="text-xs font-medium">Padrão</span>
                  </div>
                  <div className="border rounded-md p-3 flex flex-col items-center hover:border-[#19c37d] cursor-pointer transition-all">
                    <div className="h-24 w-full bg-[#222222] mb-2 rounded flex items-center justify-center">
                      <div className="w-3/4 h-1/2 bg-[#19c37d] rounded" />
                    </div>
                    <span className="text-xs font-medium">Modo Escuro</span>
                  </div>
                  <div className="border rounded-md p-3 flex flex-col items-center hover:border-[#19c37d] cursor-pointer transition-all">
                    <div className="h-24 w-full bg-gradient-to-r from-blue-500 to-purple-500 mb-2 rounded flex items-center justify-center">
                      <div className="w-3/4 h-1/2 bg-white rounded" />
                    </div>
                    <span className="text-xs font-medium">Personalizado</span>
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
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-mode" />
                    <Label htmlFor="auto-mode">Automático</Label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="logo">Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-md bg-gray-100 flex items-center justify-center text-gray-500 text-xs border border-dashed border-gray-300">
                    Logo
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline">Trocar Logo</Button>
                    <p className="text-xs text-gray-500">Recomendado: 512x512px, formato PNG ou SVG</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="favicon">Favicon</Label>
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-md bg-gray-100 flex items-center justify-center text-gray-500 text-xs border border-dashed border-gray-300">
                    Icon
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline">Trocar Favicon</Button>
                    <p className="text-xs text-gray-500">Recomendado: 32x32px, formato ICO, PNG ou SVG</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle>Personalização da Interface</CardTitle>
              <CardDescription>Ajuste elementos da interface do usuário</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Estilo de Fontes</Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="border rounded-md p-3 flex flex-col items-center hover:border-[#19c37d] cursor-pointer transition-all">
                    <p className="font-sans">Aa Bb Cc 123</p>
                    <span className="text-xs font-medium mt-2">Sans-serif</span>
                  </div>
                  <div className="border rounded-md p-3 flex flex-col items-center hover:border-[#19c37d] cursor-pointer transition-all">
                    <p className="font-serif">Aa Bb Cc 123</p>
                    <span className="text-xs font-medium mt-2">Serif</span>
                  </div>
                  <div className="border rounded-md p-3 flex flex-col items-center hover:border-[#19c37d] cursor-pointer transition-all">
                    <p className="font-mono">Aa Bb Cc 123</p>
                    <span className="text-xs font-medium mt-2">Mono</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Layout do Menu</h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="border rounded-md p-3 flex flex-col items-center hover:border-[#19c37d] cursor-pointer transition-all">
                    <div className="h-24 w-full bg-white mb-2 rounded flex flex-col">
                      <div className="h-4 bg-gray-100 w-full mb-2"></div>
                      <div className="flex flex-1">
                        <div className="w-1/3 bg-gray-100 h-full mr-2"></div>
                        <div className="flex-1 bg-gray-50"></div>
                      </div>
                    </div>
                    <span className="text-xs font-medium">Lateral</span>
                  </div>
                  <div className="border rounded-md p-3 flex flex-col items-center hover:border-[#19c37d] cursor-pointer transition-all">
                    <div className="h-24 w-full bg-white mb-2 rounded flex flex-col">
                      <div className="h-4 bg-gray-100 w-full mb-2"></div>
                      <div className="h-6 bg-gray-100 w-full mb-2"></div>
                      <div className="flex-1 bg-gray-50"></div>
                    </div>
                    <span className="text-xs font-medium">Superior</span>
                  </div>
                  <div className="border rounded-md p-3 flex flex-col items-center hover:border-[#19c37d] cursor-pointer transition-all">
                    <div className="h-24 w-full bg-white mb-2 rounded flex flex-col">
                      <div className="h-4 bg-gray-100 w-full mb-2"></div>
                      <div className="flex-1 bg-gray-50 mb-2"></div>
                      <div className="h-6 bg-gray-100 w-full"></div>
                    </div>
                    <span className="text-xs font-medium">Inferior</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Animações da Interface</Label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="animations-enabled" defaultChecked />
                    <Label htmlFor="animations-enabled">Habilitar Animações</Label>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Desative as animações para melhorar o desempenho em dispositivos mais antigos</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* API & Integrations */}
        <TabsContent value="api" className="space-y-6">
          {/* Original api content */}
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
        </TabsContent>
        
        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card className="transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle>Segurança da Conta</CardTitle>
              <CardDescription>Configure as definições de segurança da plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Autenticação de Dois Fatores</h4>
                  <p className="text-sm text-gray-500">Exigir verificação adicional ao fazer login</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="my-4" />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Bloqueio de Conta</h4>
                  <p className="text-sm text-gray-500">Bloquear conta após 5 tentativas de login incorretas</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="my-4" />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Expiração de Senha</h4>
                  <p className="text-sm text-gray-500">Solicitar troca de senha a cada 90 dias</p>
                </div>
                <Switch />
              </div>
              <Separator className="my-4" />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Login Social</h4>
                  <p className="text-sm text-gray-500">Permitir login com contas sociais (Google, Facebook)</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
          
          <Card className="transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle>Proteção de Dados</CardTitle>
              <CardDescription>Configure como os dados são protegidos na plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Criptografia de Dados</h4>
                  <p className="text-sm text-gray-500">Criptografar dados sensíveis no banco de dados</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="my-4" />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Política de Privacidade</h4>
                  <p className="text-sm text-gray-500">Exigir aceitação da política de privacidade</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="my-4" />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Exclusão de Dados</h4>
                  <p className="text-sm text-gray-500">Permitir que usuários solicitem exclusão de seus dados</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Lock className="mr-2 h-4 w-4" />
                Verificar Conformidade com LGPD
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Backups Settings */}
        <TabsContent value="backups" className="space-y-6">
          <Card className="transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle>Backup e Recuperação</CardTitle>
              <CardDescription>Configure o backup automático de seus dados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Backup Automático</h4>
                  <p className="text-sm text-gray-500">Criar backups automáticos do sistema</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="backup-frequency">Frequência de Backup</Label>
                <select id="backup-frequency" className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option value="daily">Diário</option>
                  <option value="weekly">Semanal</option>
                  <option value="monthly">Mensal</option>
                </select>
                <p className="text-xs text-gray-500">Frequência com que os backups serão realizados</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="backup-retention">Retenção de Backup</Label>
                <select id="backup-retention" className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option value="30">30 dias</option>
                  <option value="60">60 dias</option>
                  <option value="90">90 dias</option>
                  <option value="365">365 dias</option>
                </select>
                <p className="text-xs text-gray-500">Por quanto tempo os backups serão mantidos</p>
              </div>
              
              <div className="space-y-2">
                <Label>Backups Disponíveis</Label>
                <div className="bg-gray-50 rounded-md border p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Backup Completo</p>
                      <p className="text-xs text-gray-500">20/05/2025 - 06:30</p>
                    </div>
                    <div className="space-x-2">
                      <Button size="sm" variant="outline">Restaurar</Button>
                      <Button size="sm" variant="outline">Download</Button>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Backup Completo</p>
                      <p className="text-xs text-gray-500">19/05/2025 - 06:30</p>
                    </div>
                    <div className="space-x-2">
                      <Button size="sm" variant="outline">Restaurar</Button>
                      <Button size="sm" variant="outline">Download</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Server className="mr-2 h-4 w-4" />
                Criar Backup Manual
              </Button>
              <Button variant="outline">
                Histórico de Backups
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsAdmin;
