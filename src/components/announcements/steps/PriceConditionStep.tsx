
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AnnouncementData } from '../AnnouncementWizard';

interface PriceConditionStepProps {
  data: Partial<AnnouncementData>;
  onUpdate: (data: Partial<AnnouncementData>) => void;
}

const PriceConditionStep: React.FC<PriceConditionStepProps> = ({ data, onUpdate }) => {
  const conditions = [
    { value: 'novo', label: 'Novo', description: 'Produto nunca usado, com embalagem original' },
    { value: 'seminovo', label: 'Semi-novo', description: 'Usado poucas vezes, em excelente estado' },
    { value: 'usado', label: 'Usado', description: 'Usado regularmente, com sinais de uso normais' }
  ];

  const formatPrice = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const price = parseInt(numbers) / 100;
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const price = parseInt(value) / 100;
    onUpdate({ price: isNaN(price) ? 0 : price });
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="price" className="text-base font-medium text-gray-800">
          Preço de Venda *
        </Label>
        <p className="text-sm text-gray-700 mb-3">
          Digite o valor que você deseja receber pela bicicleta
        </p>
        <Input
          id="price"
          type="text"
          placeholder="R$ 0,00"
          value={data.price ? formatPrice((data.price * 100).toString()) : ""}
          onChange={handlePriceChange}
          className="w-full text-lg font-semibold bg-gray-100/80 backdrop-blur-sm border-gray-300/60 hover:bg-gray-50/85 focus:bg-gray-50/90 transition-all duration-200"
        />
        <p className="text-xs text-gray-700 mt-2">
          💡 Pesquise preços similares no marketplace para definir um valor competitivo
        </p>
      </div>

      <div>
        <Label htmlFor="condition" className="text-base font-medium text-gray-800">
          Estado da Bicicleta *
        </Label>
        <p className="text-sm text-gray-700 mb-3">
          Seja honesto sobre o estado para gerar confiança nos compradores
        </p>
        <Select value={data.condition || ""} onValueChange={(value) => onUpdate({ condition: value })}>
          <SelectTrigger className="w-full bg-gray-100/80 backdrop-blur-sm border-gray-300/60 hover:bg-gray-50/85 focus:bg-gray-50/90 transition-all duration-200">
            <SelectValue placeholder="Selecione o estado" />
          </SelectTrigger>
          <SelectContent className="bg-white/95 backdrop-blur-lg border-white/50">
            {conditions.map((condition) => (
              <SelectItem key={condition.value} value={condition.value} className="hover:bg-trailflow-accent/20">
                <div>
                  <p className="font-medium text-gray-800">{condition.label}</p>
                  <p className="text-xs text-gray-600">{condition.description}</p>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="contactPhone" className="text-base font-medium text-gray-800">
          Telefone para Contato
        </Label>
        <p className="text-sm text-gray-700 mb-3">
          Número de WhatsApp para interessados entrarem em contato (opcional)
        </p>
        <Input
          id="contactPhone"
          type="tel"
          placeholder="(11) 99999-9999"
          value={data.contactPhone || ""}
          onChange={(e) => onUpdate({ contactPhone: e.target.value })}
          className="w-full bg-gray-100/80 backdrop-blur-sm border-gray-300/60 hover:bg-gray-50/85 focus:bg-gray-50/90 transition-all duration-200"
        />
      </div>

      <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-gray-300">
        <p className="text-sm text-gray-800 font-medium">
          💰 Dica: Preços justos e descrições honestas aumentam as chances de venda
        </p>
      </div>
    </div>
  );
};

export default PriceConditionStep;
