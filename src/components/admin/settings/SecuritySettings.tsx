
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Lock } from 'lucide-react';

const SecuritySettings = () => {
  return (
    <div className="space-y-6">
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
    </div>
  );
}

export default SecuritySettings;
