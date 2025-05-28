
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, Monitor, CreditCard, Calendar, MapPin, Users, AlertCircle } from 'lucide-react';
import { ExtendedEvent } from '@/types/eventApproval';

interface PreviewFormDialogProps {
  event: ExtendedEvent;
  isOpen: boolean;
  onClose: () => void;
}

export const PreviewFormDialog: React.FC<PreviewFormDialogProps> = ({
  event,
  isOpen,
  onClose,
}) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [currentStep, setCurrentStep] = useState(0);

  const formatPrice = (price?: number) => {
    if (!price) return 'Gratuito';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const steps = [
    {
      title: 'Informações do Evento',
      content: (
        <div className="space-y-6">
          {/* Event Header */}
          <div className="text-center space-y-4">
            {event.image_url && (
              <img
                src={event.image_url}
                alt={event.title}
                className="w-full h-48 object-cover rounded-lg"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{event.title}</h1>
              <p className="text-gray-600 mt-2">{event.short_description}</p>
            </div>
          </div>

          {/* Event Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Data e Hora</p>
                <p className="font-medium">{formatDate(event.date)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <MapPin className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Local</p>
                <p className="font-medium">{event.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <CreditCard className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Preço</p>
                <p className="font-medium">{formatPrice(event.price)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Participantes</p>
                <p className="font-medium">
                  {event.max_participants ? `Máximo ${event.max_participants}` : 'Ilimitado'}
                </p>
              </div>
            </div>
          </div>

          {event.description && (
            <div>
              <h3 className="font-semibold mb-2">Descrição do Evento</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{event.description}</p>
            </div>
          )}
        </div>
      )
    },
    {
      title: 'Dados Pessoais',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Nome *</Label>
              <Input
                id="firstName"
                placeholder="Seu nome"
                value={formData.firstName || ''}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Sobrenome *</Label>
              <Input
                id="lastName"
                placeholder="Seu sobrenome"
                value={formData.lastName || ''}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">E-mail *</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email || ''}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Telefone *</Label>
            <Input
              id="phone"
              placeholder="(11) 99999-9999"
              value={formData.phone || ''}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              required
            />
          </div>
        </div>
      )
    }
  ];

  // Add custom questions step if they exist
  if (event.custom_questions && event.custom_questions.length > 0) {
    steps.push({
      title: 'Informações Adicionais',
      content: (
        <div className="space-y-4">
          {event.custom_questions.map((question) => (
            <div key={question.id}>
              <Label htmlFor={`question_${question.id}`} className="flex items-center gap-2">
                {question.question_text}
                {question.is_required && (
                  <span className="text-red-500">*</span>
                )}
              </Label>
              
              {question.placeholder_text && (
                <p className="text-sm text-gray-600 mb-2">{question.placeholder_text}</p>
              )}

              {question.question_type === 'text' && (
                <Input
                  id={`question_${question.id}`}
                  placeholder={question.placeholder_text}
                  value={formData[`question_${question.id}`] || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    [`question_${question.id}`]: e.target.value
                  })}
                  required={question.is_required}
                />
              )}

              {question.question_type === 'textarea' && (
                <Textarea
                  id={`question_${question.id}`}
                  placeholder={question.placeholder_text}
                  value={formData[`question_${question.id}`] || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    [`question_${question.id}`]: e.target.value
                  })}
                  required={question.is_required}
                />
              )}

              {question.question_type === 'select' && (
                <Select
                  value={formData[`question_${question.id}`] || ''}
                  onValueChange={(value) => setFormData({
                    ...formData,
                    [`question_${question.id}`]: value
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                  <SelectContent>
                    {question.options?.map((option) => (
                      <SelectItem key={option.id} value={option.option_value}>
                        {option.option_text}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {question.question_type === 'radio' && (
                <RadioGroup
                  value={formData[`question_${question.id}`] || ''}
                  onValueChange={(value) => setFormData({
                    ...formData,
                    [`question_${question.id}`]: value
                  })}
                >
                  {question.options?.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.option_value} id={`${question.id}_${option.id}`} />
                      <Label htmlFor={`${question.id}_${option.id}`}>{option.option_text}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {question.question_type === 'checkbox' && (
                <div className="space-y-2">
                  {question.options?.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${question.id}_${option.id}`}
                        checked={formData[`question_${question.id}`]?.includes(option.option_value) || false}
                        onCheckedChange={(checked) => {
                          const current = formData[`question_${question.id}`] || [];
                          const updated = checked
                            ? [...current, option.option_value]
                            : current.filter((v: string) => v !== option.option_value);
                          setFormData({
                            ...formData,
                            [`question_${question.id}`]: updated
                          });
                        }}
                      />
                      <Label htmlFor={`${question.id}_${option.id}`}>{option.option_text}</Label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )
    });
  }

  // Add payment step if event has price
  if (event.price && event.price > 0) {
    steps.push({
      title: 'Pagamento',
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Resumo do Pedido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Inscrição: {event.title}</span>
                  <span>{formatPrice(event.price)}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(event.price)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {event.payment_settings?.allow_installments && (
            <div>
              <Label>Forma de Pagamento</Label>
              <RadioGroup value={formData.paymentMethod || 'credit_card'}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="credit_card" id="credit_card" />
                  <Label htmlFor="credit_card">Cartão de Crédito</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pix" id="pix" />
                  <Label htmlFor="pix">PIX</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {event.payment_settings?.allow_installments && formData.paymentMethod === 'credit_card' && (
            <div>
              <Label>Número de Parcelas</Label>
              <Select value={formData.installments || '1'}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: event.payment_settings.max_installments }, (_, i) => i + 1).map((installments) => (
                    <SelectItem key={installments} value={installments.toString()}>
                      {installments}x de {formatPrice(event.price! / installments)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      )
    });
  }

  const containerClass = viewMode === 'mobile' 
    ? 'max-w-sm mx-auto' 
    : 'max-w-4xl';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${containerClass} max-h-[90vh] overflow-y-auto`}>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Preview do Formulário de Inscrição</DialogTitle>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'desktop' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('desktop')}
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'mobile' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('mobile')}
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Step indicator */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentStep 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step title */}
          <div className="text-center">
            <h2 className="text-xl font-semibold">{steps[currentStep].title}</h2>
            <p className="text-sm text-gray-600">
              Passo {currentStep + 1} de {steps.length}
            </p>
          </div>

          {/* Step content */}
          <div className="min-h-[400px]">
            {steps[currentStep].content}
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              Anterior
            </Button>
            
            {currentStep < steps.length - 1 ? (
              <Button
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              >
                Próximo
              </Button>
            ) : (
              <Button className="bg-green-600 hover:bg-green-700">
                Finalizar Inscrição
              </Button>
            )}
          </div>

          {/* Security note */}
          <div className="flex items-center gap-2 text-xs text-gray-500 justify-center">
            <AlertCircle className="h-4 w-4" />
            Este é apenas um preview. Nenhum dado será salvo.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
