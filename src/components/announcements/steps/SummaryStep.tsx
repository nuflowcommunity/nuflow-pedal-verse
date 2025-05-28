
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AnnouncementData } from '../AnnouncementWizard';

interface SummaryStepProps {
  data: Partial<AnnouncementData>;
  onUpdate: (data: Partial<AnnouncementData>) => void;
}

const SummaryStep: React.FC<SummaryStepProps> = ({ data }) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const getConditionLabel = (condition: string) => {
    const conditions: Record<string, string> = {
      'novo': 'Novo',
      'seminovo': 'Semi-novo',
      'usado': 'Usado'
    };
    return conditions[condition] || condition;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-nuflow-darkForest">
          Resumo do Anúncio
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Info */}
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Categoria</p>
              <p className="font-medium">{data.category}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Marca e Modelo</p>
              <p className="font-medium">{data.brand} {data.model}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Ano</p>
              <p className="font-medium">{data.year}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Localização</p>
              <p className="font-medium">{data.location}</p>
            </div>
          </div>
          
          {/* Price and Condition */}
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Preço</p>
              <p className="text-2xl font-bold text-nuflow-moss">
                {data.price ? formatPrice(data.price) : 'R$ 0,00'}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Estado</p>
              <Badge variant="outline" className="mt-1">
                {data.condition ? getConditionLabel(data.condition) : 'Não informado'}
              </Badge>
            </div>
            
            {data.contactPhone && (
              <div>
                <p className="text-sm text-gray-600">Contato</p>
                <p className="font-medium">{data.contactPhone}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Description */}
        {data.description && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Descrição</p>
            <p className="text-sm text-gray-800 leading-relaxed">
              {data.description}
            </p>
          </div>
        )}
        
        {/* Technical Details */}
        {data.technicalDetails && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Detalhes Técnicos</p>
            <p className="text-sm text-gray-800 leading-relaxed">
              {data.technicalDetails}
            </p>
          </div>
        )}
        
        {/* Photos */}
        {data.photos && data.photos.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3">Fotos ({data.photos.length})</p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {data.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Foto ${index + 1}`}
                  className="w-full h-16 object-cover rounded"
                />
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-nuflow-lime/10 p-4 rounded-lg border border-nuflow-lime/20">
        <p className="text-sm text-nuflow-darkForest font-medium">
          ✅ Seu anúncio está pronto para ser publicado!
        </p>
        <p className="text-xs text-nuflow-darkForest/70 mt-1">
          Após a publicação, seu anúncio será analisado e estará disponível no marketplace em breve.
        </p>
      </div>
    </div>
  );
};

export default SummaryStep;
