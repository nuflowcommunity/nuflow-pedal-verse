
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Info, 
  MapPin, 
  CreditCard, 
  HelpCircle, 
  FileText, 
  Settings,
  CheckCircle,
  AlertTriangle 
} from 'lucide-react';
import { ExtendedEvent } from '@/types/eventApproval';

interface TabbedEventDialogProps {
  event?: ExtendedEvent;
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit' | 'view';
}

interface TabValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export const TabbedEventDialog: React.FC<TabbedEventDialogProps> = ({
  event,
  isOpen,
  onClose,
  mode
}) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState(event || {});

  const tabs = [
    {
      id: 'basic',
      label: 'Informações Básicas',
      icon: Info,
      required: true
    },
    {
      id: 'location',
      label: 'Local e Data',
      icon: MapPin,
      required: true
    },
    {
      id: 'tickets',
      label: 'Ingressos',
      icon: CreditCard,
      required: false
    },
    {
      id: 'questions',
      label: 'Perguntas',
      icon: HelpCircle,
      required: false
    },
    {
      id: 'documents',
      label: 'Documentos',
      icon: FileText,
      required: false
    },
    {
      id: 'settings',
      label: 'Configurações',
      icon: Settings,
      required: false
    }
  ];

  // Simulação de validação para cada aba
  const getTabValidation = (tabId: string): TabValidation => {
    switch (tabId) {
      case 'basic':
        return {
          isValid: !!(formData.title && formData.description),
          errors: [
            ...(!formData.title ? ['Título é obrigatório'] : []),
            ...(!formData.description ? ['Descrição é obrigatória'] : [])
          ],
          warnings: [
            ...(!formData.short_description ? ['Descrição curta recomendada'] : []),
            ...(!formData.image_url ? ['Imagem recomendada'] : [])
          ]
        };
      case 'location':
        return {
          isValid: !!(formData.location && formData.date),
          errors: [
            ...(!formData.location ? ['Local é obrigatório'] : []),
            ...(!formData.date ? ['Data é obrigatória'] : [])
          ],
          warnings: [
            ...(!formData.meeting_point ? ['Ponto de encontro recomendado'] : [])
          ]
        };
      default:
        return {
          isValid: true,
          errors: [],
          warnings: []
        };
    }
  };

  const getTabIcon = (tab: any) => {
    const validation = getTabValidation(tab.id);
    
    if (validation.errors.length > 0) {
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
    
    if (validation.isValid && tab.required) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
    
    return <tab.icon className="h-4 w-4" />;
  };

  const getOverallProgress = () => {
    const requiredTabs = tabs.filter(tab => tab.required);
    const validTabs = requiredTabs.filter(tab => getTabValidation(tab.id).isValid);
    return (validTabs.length / requiredTabs.length) * 100;
  };

  const canSave = () => {
    const requiredTabs = tabs.filter(tab => tab.required);
    return requiredTabs.every(tab => getTabValidation(tab.id).isValid);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>
              {mode === 'create' ? 'Criar Novo Evento' : 
               mode === 'edit' ? 'Editar Evento' : 'Visualizar Evento'}
            </DialogTitle>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                Progresso: {Math.round(getOverallProgress())}%
              </div>
              <Progress value={getOverallProgress()} className="w-32" />
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <div className="border-b">
              <TabsList className="grid w-full grid-cols-6 h-auto p-1">
                {tabs.map((tab) => {
                  const validation = getTabValidation(tab.id);
                  
                  return (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-blue-50"
                    >
                      <div className="flex items-center gap-2">
                        {getTabIcon(tab)}
                        {tab.required && (
                          <span className="text-red-500 text-xs">*</span>
                        )}
                      </div>
                      <span className="text-xs font-medium hidden sm:block">
                        {tab.label}
                      </span>
                      {validation.errors.length > 0 && (
                        <Badge variant="destructive" className="text-xs px-1 py-0">
                          {validation.errors.length}
                        </Badge>
                      )}
                      {validation.warnings.length > 0 && validation.errors.length === 0 && (
                        <Badge variant="secondary" className="text-xs px-1 py-0">
                          {validation.warnings.length}
                        </Badge>
                      )}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <TabsContent value="basic" className="mt-0 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Informações Básicas do Evento</h3>
                  
                  {/* Validation feedback */}
                  {getTabValidation('basic').errors.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-red-800 mb-2">Campos obrigatórios:</h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        {getTabValidation('basic').errors.map((error, index) => (
                          <li key={index}>• {error}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {getTabValidation('basic').warnings.length > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-yellow-800 mb-2">Recomendações:</h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        {getTabValidation('basic').warnings.map((warning, index) => (
                          <li key={index}>• {warning}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Form fields would go here */}
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Campos básicos do evento como título, descrição, categoria, etc.
                    </p>
                    {/* Implementar campos de formulário */}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="location" className="mt-0 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Local e Data do Evento</h3>
                  
                  {/* Validation feedback */}
                  {getTabValidation('location').errors.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-red-800 mb-2">Campos obrigatórios:</h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        {getTabValidation('location').errors.map((error, index) => (
                          <li key={index}>• {error}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Configurações de local, data, horário e informações geográficas.
                    </p>
                    {/* Implementar campos de localização */}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tickets" className="mt-0 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Configuração de Ingressos</h3>
                  
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Configure tipos de ingressos, preços e opções de parcelamento.
                    </p>
                    {/* Implementar configuração de ingressos */}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="questions" className="mt-0 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Perguntas Customizadas</h3>
                  
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Configure perguntas específicas para os participantes.
                    </p>
                    {/* Implementar sistema de perguntas customizadas */}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="documents" className="mt-0 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Documentos e Imagens</h3>
                  
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Upload de imagens, documentos e arquivos relacionados ao evento.
                    </p>
                    {/* Implementar sistema de upload */}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="mt-0 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Configurações Avançadas</h3>
                  
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Políticas de cancelamento, configurações de notificação e outras opções.
                    </p>
                    {/* Implementar configurações avançadas */}
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Footer com ações */}
        <div className="border-t p-6 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {!canSave() ? (
              <span className="text-red-600">
                Complete os campos obrigatórios para salvar
              </span>
            ) : (
              <span className="text-green-600">
                Pronto para salvar
              </span>
            )}
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            {mode !== 'view' && (
              <Button 
                disabled={!canSave()}
                className="bg-green-600 hover:bg-green-700"
              >
                {mode === 'create' ? 'Criar Evento' : 'Salvar Alterações'}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
