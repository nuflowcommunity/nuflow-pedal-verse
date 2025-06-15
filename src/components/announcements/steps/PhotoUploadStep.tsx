
import React, { useState } from 'react';
import { Upload, X, Image } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AnnouncementData } from '../AnnouncementWizard';

interface PhotoUploadStepProps {
  data: Partial<AnnouncementData>;
  onUpdate: (data: Partial<AnnouncementData>) => void;
}

const PhotoUploadStep: React.FC<PhotoUploadStepProps> = ({ data, onUpdate }) => {
  const [dragOver, setDragOver] = useState(false);
  const photos = data.photos || [];

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    
    const newPhotos = Array.from(files).map(file => URL.createObjectURL(file));
    const updatedPhotos = [...photos, ...newPhotos].slice(0, 6);
    onUpdate({ photos: updatedPhotos });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleRemovePhoto = (index: number) => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    onUpdate({ photos: updatedPhotos });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium text-trailflow-dark drop-shadow-sm">
          Fotos da Bicicleta *
        </Label>
        <p className="text-sm text-trailflow-medium mb-4 drop-shadow-sm">
          Adicione até 6 fotos de alta qualidade. A primeira foto será a capa do anúncio.
        </p>

        {/* Upload Area - Enhanced with glassmorphism */}
        {photos.length < 6 && (
          <div
            className={`
              relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 backdrop-blur-sm
              ${dragOver 
                ? 'border-trailflow-green bg-trailflow-accent/20 shadow-lg' 
                : 'border-white/40 hover:border-trailflow-green/60 hover:bg-trailflow-accent/10 bg-white/20'
              }
            `}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <Upload className="mx-auto h-12 w-12 text-trailflow-medium mb-4" />
            <p className="text-lg font-medium text-trailflow-dark mb-2 drop-shadow-sm">
              Arraste as fotos aqui ou clique para selecionar
            </p>
            <p className="text-sm text-trailflow-medium mb-4 drop-shadow-sm">
              PNG, JPG até 5MB cada
            </p>
            <Button
              type="button"
              variant="outline"
              className="mx-auto bg-white/50 backdrop-blur-sm border-trailflow-green/70 text-trailflow-green hover:bg-trailflow-green hover:text-white transition-all duration-300"
              onClick={() => document.getElementById('photo-upload')?.click()}
            >
              Selecionar Fotos
            </Button>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFileUpload(e.target.files)}
            />
          </div>
        )}

        {/* Photo Grid - Enhanced with glassmorphism */}
        {photos.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {photos.map((photo, index) => (
              <div key={index} className="relative group">
                <div className="relative overflow-hidden rounded-lg bg-white/20 backdrop-blur-sm border border-white/20">
                  <img
                    src={photo}
                    alt={`Foto ${index + 1}`}
                    className="w-full h-40 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(index)}
                    className="absolute top-2 right-2 bg-red-500/90 backdrop-blur-sm text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600"
                  >
                    <X size={16} />
                  </button>
                  {index === 0 && (
                    <div className="absolute bottom-2 left-2 bg-trailflow-green/90 backdrop-blur-sm text-white text-xs py-1 px-2 rounded-full border border-white/20">
                      Capa
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tips section with enhanced styling */}
      <div className="bg-amber-50/70 backdrop-blur-sm p-4 rounded-lg border border-amber-200/30">
        <div className="flex items-start gap-3">
          <Image className="text-amber-600 mt-0.5" size={20} />
          <div>
            <p className="text-sm text-amber-800 font-medium mb-1">
              Dicas para fotos que vendem:
            </p>
            <ul className="text-xs text-amber-700 space-y-1">
              <li>• Tire fotos em boa iluminação (luz natural é melhor)</li>
              <li>• Mostre a bike completa e detalhes importantes</li>
              <li>• Inclua fotos de diferentes ângulos</li>
              <li>• Destaque eventuais defeitos para ser transparente</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoUploadStep;
