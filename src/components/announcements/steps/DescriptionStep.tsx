
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
        <Label htmlFor="description" className="text-base font-medium text-trailflow-dark drop-shadow-sm">
          Descrição do Produto *
        </Label>
        <p className="text-sm text-trailflow-medium mb-3 drop-shadow-sm">
          Descreva sua bicicleta de forma detalhada para atrair compradores
        </p>
        <Textarea
          id="description"
          placeholder="Ex: Bicicleta em excelente estado de conservação, usado apenas em finais de semana. Todas as revisões em dia, pneus novos..."
          value={data.description || ""}
          onChange={(e) => onUpdate({ description: e.target.value })}
          className="min-h-32 w-full bg-white/60 backdrop-blur-sm border-white/40 hover:bg-white/70 focus:bg-white/80 transition-all duration-200"
        />
        <p className="text-xs text-trailflow-medium mt-2 drop-shadow-sm">
          {data.description?.length || 0}/500 caracteres
        </p>
      </div>

      <div>
        <Label htmlFor="technicalDetails" className="text-base font-medium text-trailflow-dark drop-shadow-sm">
          Detalhes Técnicos
        </Label>
        <p className="text-sm text-trailflow-medium mb-3 drop-shadow-sm">
          Informações técnicas como grupo, rodas, freios, etc. (opcional)
        </p>
        <Textarea
          id="technicalDetails"
          placeholder="Ex: Grupo Shimano XT, Rodas DT Swiss, Freios a disco hidráulico, Suspensão Fox 32..."
          value={data.technicalDetails || ""}
          onChange={(e) => onUpdate({ technicalDetails: e.target.value })}
          className="min-h-24 w-full bg-white/60 backdrop-blur-sm border-white/40 hover:bg-white/70 focus:bg-white/80 transition-all duration-200"
        />
      </div>

      <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg border border-white/30">
        <p className="text-sm text-trailflow-dark font-medium mb-2 drop-shadow-sm">
          📝 O que incluir na descrição:
        </p>
        <ul className="text-xs text-trailflow-medium space-y-1 drop-shadow-sm">
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
