
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const AppearanceSettings = () => {
  return (
    <div className="space-y-6">
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
    </div>
  );
}

export default AppearanceSettings;
