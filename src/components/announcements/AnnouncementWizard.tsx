
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import StepIndicator from './StepIndicator';
import ProductTypeStep from './steps/ProductTypeStep';
import ProductDetailsStep from './steps/ProductDetailsStep';
import PriceConditionStep from './steps/PriceConditionStep';
import PhotoUploadStep from './steps/PhotoUploadStep';
import DescriptionStep from './steps/DescriptionStep';
import SummaryStep from './steps/SummaryStep';

export interface AnnouncementData {
  category: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  condition: string;
  photos: string[];
  description: string;
  technicalDetails: string;
  location: string;
  contactPhone: string;
}

const STEPS = [
  { id: 1, title: 'Tipo do Produto', description: 'Categoria e marca' },
  { id: 2, title: 'Detalhes', description: 'Modelo e ano' },
  { id: 3, title: 'Preço e Estado', description: 'Valor e condição' },
  { id: 4, title: 'Fotos', description: 'Imagens do produto' },
  { id: 5, title: 'Descrição', description: 'Detalhes técnicos' },
  { id: 6, title: 'Resumo', description: 'Confirmar dados' }
];

const AnnouncementWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState<Partial<AnnouncementData>>({});

  const updateData = (newData: Partial<AnnouncementData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return data.category && data.brand;
      case 2:
        return data.model && data.year;
      case 3:
        return data.price && data.condition;
      case 4:
        return data.photos && data.photos.length > 0;
      case 5:
        return data.description;
      case 6:
        return true;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Anúncio criado com sucesso!",
        description: "Seu anúncio está em análise e será publicado em breve.",
      });
      
      // Reset form
      setData({});
      setCurrentStep(1);
    }, 2000);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <ProductTypeStep data={data} onUpdate={updateData} />;
      case 2:
        return <ProductDetailsStep data={data} onUpdate={updateData} />;
      case 3:
        return <PriceConditionStep data={data} onUpdate={updateData} />;
      case 4:
        return <PhotoUploadStep data={data} onUpdate={updateData} />;
      case 5:
        return <DescriptionStep data={data} onUpdate={updateData} />;
      case 6:
        return <SummaryStep data={data} onUpdate={updateData} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <StepIndicator steps={STEPS} currentStep={currentStep} />
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-2xl font-heading">
            {STEPS[currentStep - 1].title}
          </CardTitle>
          <p className="text-gray-600">
            {STEPS[currentStep - 1].description}
          </p>
        </CardHeader>
        <CardContent>
          {renderStep()}
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Voltar
            </Button>
            
            {currentStep < STEPS.length ? (
              <Button
                onClick={nextStep}
                disabled={!canProceedToNext()}
                className="bg-nuflow-moss text-white hover:bg-nuflow-darkForest flex items-center gap-2"
              >
                Próximo
                <ArrowRight size={16} />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canProceedToNext() || isSubmitting}
                className="bg-nuflow-moss text-white hover:bg-nuflow-darkForest flex items-center gap-2"
              >
                {isSubmitting ? (
                  <span className="animate-spin">○</span>
                ) : (
                  <Check size={16} />
                )}
                {isSubmitting ? 'Publicando...' : 'Publicar Anúncio'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnnouncementWizard;
