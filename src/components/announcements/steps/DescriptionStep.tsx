
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AnnouncementData } from '../AnnouncementWizard';

interface DescriptionStepProps {
  data: Partial<AnnouncementData>;
  onUpdate: (data: Partial<AnnouncementData>) => void;
}

const DescriptionStep: React.FC<DescriptionStepProps> = ({ data, onUpdate }) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="description" className="text-base font-medium">
          Descrição do Produto *
        </Label>
        <p className="text-sm text-gray-600 mb-3">
          Descreva sua bicicleta de forma detalhada para atrair compradores
        </p>
        <Textarea
          id="description"
          placeholder="Ex: Bicicleta em excelente estado de conservação, usado apenas em finais de semana. Todas as revisões em dia, pneus novos..."
          value={data.description || ""}
          onChange={(e) => onUpdate({ description: e.target.value })}
          className="min-h-32 w-full"
        />
        <p className="text-xs text-gray-500 mt-2">
          {data.description?.length || 0}/500 caracteres
        </p>
      </div>

      <div>
        <Label htmlFor="technicalDetails" className="text-base font-medium">
          Detalhes Técnicos
        </Label>
        <p className="text-sm text-gray-600 mb-3">
          Informações técnicas como grupo, rodas, freios, etc. (opcional)
        </p>
        <Textarea
          id="technicalDetails"
          placeholder="Ex: Grupo Shimano XT, Rodas DT Swiss, Freios a disco hidráulico, Suspensão Fox 32..."
          value={data.technicalDetails || ""}
          onChange={(e) => onUpdate({ technicalDetails: e.target.value })}
          className="min-h-24 w-full"
        />
      </div>

      <div className="bg-purple-50 p-4 rounded-lg">
        <p className="text-sm text-purple-800 font-medium mb-2">
          📝 O que incluir na descrição:
        </p>
        <ul className="text-xs text-purple-700 space-y-1">
          <li>• Estado geral da bicicleta</li>
          <li>• Histórico de uso (urbano, trilhas, competição)</li>
          <li>• Upgrades e modificações feitas</li>
          <li>• Itens inclusos (bomba, suporte, etc.)</li>
          <li>• Motivo da venda</li>
          <li>• Defeitos ou reparos necessários</li>
        </ul>
      </div>
    </div>
  );
};

export default DescriptionStep;
