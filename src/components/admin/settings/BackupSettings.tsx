
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Server } from 'lucide-react';

const BackupSettings = () => {
  return (
    <div className="space-y-6">
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
    </div>
  );
}

export default BackupSettings;
