
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, User, Bell, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const PartnerSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600 mt-2">
          Gerencie as configurações da sua conta e preferências
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User size={20} />
              Informações do Perfil
            </CardTitle>
            <CardDescription>
              Atualize suas informações pessoais e de contato
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" placeholder="Nome do parceiro" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="email@exemplo.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" placeholder="(11) 99999-9999" />
            </div>
            <Button>Salvar Alterações</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell size={20} />
              Notificações
            </CardTitle>
            <CardDescription>
              Configure suas preferências de notificação
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Novas reservas</p>
                <p className="text-sm text-gray-600">Receber notificações de novas reservas</p>
              </div>
              <Button variant="outline" size="sm">Ativar</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Cancelamentos</p>
                <p className="text-sm text-gray-600">Receber notificações de cancelamentos</p>
              </div>
              <Button variant="outline" size="sm">Ativar</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Relatórios</p>
                <p className="text-sm text-gray-600">Receber relatórios semanais por email</p>
              </div>
              <Button variant="outline" size="sm">Ativar</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield size={20} />
              Segurança
            </CardTitle>
            <CardDescription>
              Configure suas opções de segurança
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Senha atual</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">Nova senha</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar nova senha</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <Button>Alterar Senha</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings size={20} />
              Preferências Gerais
            </CardTitle>
            <CardDescription>
              Configure suas preferências de uso do sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Modo escuro</p>
                <p className="text-sm text-gray-600">Ativar tema escuro do sistema</p>
              </div>
              <Button variant="outline" size="sm">Desativar</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Confirmações automáticas</p>
                <p className="text-sm text-gray-600">Confirmar reservas automaticamente</p>
              </div>
              <Button variant="outline" size="sm">Ativar</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
