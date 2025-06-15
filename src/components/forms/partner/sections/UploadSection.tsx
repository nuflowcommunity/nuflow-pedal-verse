
import React from 'react';
import { Upload } from 'lucide-react';

export const UploadSection: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
        Identidade Visual (Opcional)
      </h3>
      <p className="text-sm text-gray-600 -mt-2">
        Logo da empresa ou fotos do local para enriquecer seu perfil
      </p>
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-2 font-medium">Clique para fazer upload ou arraste as imagens aqui</p>
        <p className="text-sm text-gray-500">PNG, JPG até 5MB por arquivo</p>
        <p className="text-xs text-gray-400 mt-2">Recomendado: Logo da empresa, fotos do local, certificações</p>
      </div>
    </div>
  );
};
