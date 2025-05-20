
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const GeneralSettings = () => {
  return (
    <div className="space-y-6">
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
    </div>
  );
}

export default GeneralSettings;
