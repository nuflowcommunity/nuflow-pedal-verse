
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
      // Smooth scroll to top on mobile
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // Smooth scroll to top on mobile
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <div className="w-full max-w-5xl mx-auto">
      {/* Step Indicator */}
      <div className="mb-8 sm:mb-12">
        <StepIndicator steps={STEPS} currentStep={currentStep} />
      </div>
      
      {/* Main Content Card - Polymer Style */}
      <Card className="polymer-product-card border-0 shadow-xl bg-white overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-trailflow-accent to-white px-6 sm:px-8 lg:px-12 py-6 sm:py-8">
          <div className="text-center">
            <CardTitle className="polymer-heading-sm text-trailflow-dark mb-2">
              {STEPS[currentStep - 1].title}
            </CardTitle>
            <p className="polymer-body text-trailflow-medium">
              {STEPS[currentStep - 1].description}
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="px-6 sm:px-8 lg:px-12 py-8 sm:py-12">
          {/* Step Content */}
          <div className="min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] flex items-start">
            <div className="w-full animate-fade-in">
              {renderStep()}
            </div>
          </div>
          
          {/* Navigation Buttons - Polymer Style */}
          <div className="mt-8 sm:mt-12 pt-8 border-t border-gray-100">
            {/* Mobile Navigation */}
            <div className="block sm:hidden space-y-4">
              {currentStep < STEPS.length ? (
                <Button
                  onClick={nextStep}
                  disabled={!canProceedToNext()}
                  className="w-full polymer-btn bg-trailflow-green text-white hover:bg-trailflow-green-dark h-12 text-base font-medium"
                >
                  Próximo
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceedToNext() || isSubmitting}
                  className="w-full polymer-btn bg-trailflow-green text-white hover:bg-trailflow-green-dark h-12 text-base font-medium"
                >
                  {isSubmitting ? (
                    <span className="animate-spin mr-2">○</span>
                  ) : (
                    <Check size={20} className="mr-2" />
                  )}
                  {isSubmitting ? 'Publicando...' : 'Publicar Anúncio'}
                </Button>
              )}
              
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="w-full polymer-btn border-trailflow-green text-trailflow-green hover:bg-trailflow-green hover:text-white h-12 text-base font-medium"
              >
                <ArrowLeft size={20} className="mr-2" />
                Voltar
              </Button>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden sm:flex justify-between items-center">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="polymer-btn border-trailflow-green text-trailflow-green hover:bg-trailflow-green hover:text-white px-8 h-12 text-base font-medium"
              >
                <ArrowLeft size={20} className="mr-2" />
                Voltar
              </Button>
              
              {/* Progress Info */}
              <div className="text-center">
                <p className="polymer-body text-trailflow-medium">
                  Etapa {currentStep} de {STEPS.length}
                </p>
              </div>
              
              {currentStep < STEPS.length ? (
                <Button
                  onClick={nextStep}
                  disabled={!canProceedToNext()}
                  className="polymer-btn bg-trailflow-green text-white hover:bg-trailflow-green-dark px-8 h-12 text-base font-medium"
                >
                  Próximo
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceedToNext() || isSubmitting}
                  className="polymer-btn bg-trailflow-green text-white hover:bg-trailflow-green-dark px-8 h-12 text-base font-medium"
                >
                  {isSubmitting ? (
                    <span className="animate-spin mr-2">○</span>
                  ) : (
                    <Check size={20} className="mr-2" />
                  )}
                  {isSubmitting ? 'Publicando...' : 'Publicar Anúncio'}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnnouncementWizard;
