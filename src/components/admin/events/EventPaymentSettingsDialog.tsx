
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { LoadingButton } from '@/components/ui/loading-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ExtendedEvent } from '@/types/eventApproval';
import { useEventApproval } from '@/hooks/useEventApproval';
import { useFeedback } from '@/hooks/useFeedback';
import { FormFeedback } from '@/components/ui/form-feedback';
import { Settings } from 'lucide-react';

interface EventPaymentSettingsDialogProps {
  event: ExtendedEvent;
  isOpen: boolean;
  onClose: () => void;
}

export const EventPaymentSettingsDialog: React.FC<EventPaymentSettingsDialogProps> = ({
  event,
  isOpen,
  onClose,
}) => {
  const { updatePaymentSettings, isProcessing } = useEventApproval();
  const { feedback } = useFeedback();
  const [settings, setSettings] = useState({
    allow_installments: event.payment_settings?.allow_installments || false,
    max_installments: event.payment_settings?.max_installments || 1,
    min_installment_amount: event.payment_settings?.min_installment_amount || undefined,
  });
  const [validationError, setValidationError] = useState<string | null>(null);

  const validateSettings = () => {
    if (settings.allow_installments && settings.min_installment_amount && event.price) {
      const maxPossibleInstallments = Math.floor(event.price / settings.min_installment_amount);
      if (settings.max_installments > maxPossibleInstallments) {
        setValidationError(
          `Com o valor mínimo definido, são possíveis no máximo ${maxPossibleInstallments} parcelas.`
        );
        return false;
      }
    }
    setValidationError(null);
    return true;
  };

  const handleSave = () => {
    if (!validateSettings()) {
      feedback.validationError("configurações de parcelamento");
      return;
    }

    updatePaymentSettings({
      eventId: event.id,
      settings: settings,
    });
    onClose();
  };

  const installmentOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  useEffect(() => {
    validateSettings();
  }, [settings, event.price]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configurações de Pagamento
          </DialogTitle>
          <p className="text-sm text-gray-600">
            Configure as opções de parcelamento para o evento "{event.title}"
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações do evento */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium">{event.title}</h4>
            <p className="text-sm text-gray-600">
              Preço: {event.price 
                ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(event.price)
                : 'Gratuito'
              }
            </p>
          </div>

          {/* Configurações de parcelamento */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">
                  Permitir Parcelamento
                </Label>
                <p className="text-sm text-gray-600">
                  Permita que os usuários paguem em parcelas
                </p>
              </div>
              <Switch
                checked={settings.allow_installments}
                onCheckedChange={(checked) =>
                  setSettings(prev => ({ ...prev, allow_installments: checked }))
                }
              />
            </div>

            {settings.allow_installments && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="maxInstallments">
                    Número Máximo de Parcelas
                  </Label>
                  <select
                    id="maxInstallments"
                    value={settings.max_installments}
                    onChange={(e) =>
                      setSettings(prev => ({ 
                        ...prev, 
                        max_installments: parseInt(e.target.value) 
                      }))
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {installmentOptions.map(option => (
                      <option key={option} value={option}>
                        {option}x
                      </option>
                    ))}
                  </select>
                  <p className="text-sm text-gray-500">
                    Os usuários poderão escolher entre 1x e {settings.max_installments}x
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minInstallmentAmount">
                    Valor Mínimo por Parcela (Opcional)
                  </Label>
                  <Input
                    id="minInstallmentAmount"
                    type="number"
                    step="0.01"
                    min="0"
                    value={settings.min_installment_amount || ''}
                    onChange={(e) =>
                      setSettings(prev => ({
                        ...prev,
                        min_installment_amount: e.target.value ? parseFloat(e.target.value) : undefined
                      }))
                    }
                    placeholder="Ex: 50.00"
                  />
                  <p className="text-sm text-gray-500">
                    Se definido, limitará o parcelamento para não ter parcelas menores que este valor
                  </p>
                </div>

                {validationError && (
                  <FormFeedback
                    type="warning"
                    message={validationError}
                    title="Configuração inválida"
                  />
                )}
              </>
            )}
          </div>

          {/* Preview das opções */}
          {settings.allow_installments && event.price && !validationError && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="font-medium text-blue-900 mb-2">
                Preview das Opções de Pagamento
              </h5>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {installmentOptions.slice(0, settings.max_installments).map(installments => {
                  const installmentValue = event.price! / installments;
                  const isValidInstallment = !settings.min_installment_amount || 
                    installmentValue >= settings.min_installment_amount;
                  
                  if (!isValidInstallment) return null;
                  
                  return (
                    <div key={installments} className="text-sm text-blue-800">
                      {installments}x de {
                        new Intl.NumberFormat('pt-BR', { 
                          style: 'currency', 
                          currency: 'BRL' 
                        }).format(installmentValue)
                      }
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Configurações atuais */}
          {event.payment_settings && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-medium mb-2">Configurações Atuais</h5>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Parcelamento: {event.payment_settings.allow_installments ? 'Habilitado' : 'Desabilitado'}</p>
                <p>Máximo de parcelas: {event.payment_settings.max_installments}x</p>
                {event.payment_settings.min_installment_amount && (
                  <p>Valor mínimo por parcela: {
                    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
                      .format(event.payment_settings.min_installment_amount)
                  }</p>
                )}
              </div>
            </div>
          )}

          {/* Ações */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <LoadingButton 
              variant="outline" 
              onClick={onClose}
              disabled={isProcessing}
            >
              Cancelar
            </LoadingButton>
            <LoadingButton 
              onClick={handleSave}
              loading={isProcessing}
              loadingText="Salvando..."
              disabled={!!validationError}
              className="bg-nuflow-forest hover:bg-nuflow-darkForest"
            >
              Salvar Configurações
            </LoadingButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
