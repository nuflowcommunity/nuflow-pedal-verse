
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
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
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Anúncio criado com sucesso!",
        description: "Seu anúncio está em análise e será publicado em breve.",
      });
      
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
      
      {/* Main Content Card - Enhanced Polymer Style with Glassmorphism */}
      <Card className="polymer-product-card border-0 overflow-hidden relative">
        {/* Glassmorphism background */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl" />
        
        <CardHeader className="relative z-10 bg-gradient-to-r from-trailflow-accent/30 to-white/20 backdrop-blur-sm px-6 sm:px-8 lg:px-12 py-6 sm:py-8 border-b border-white/10">
          <div className="text-center">
            <CardTitle className="polymer-heading-sm text-gray-800 mb-2 drop-shadow-md">
              {STEPS[currentStep - 1].title}
            </CardTitle>
            <p className="polymer-body text-gray-700 drop-shadow-sm">
              {STEPS[currentStep - 1].description}
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="relative z-10 px-6 sm:px-8 lg:px-12 py-8 sm:py-12">
          {/* Step Content */}
          <div className="min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] flex items-start">
            <div className="w-full animate-fade-in">
              {renderStep()}
            </div>
          </div>
          
          {/* Navigation Buttons - Enhanced Polymer Style */}
          <div className="mt-8 sm:mt-12 pt-8 border-t border-white/20">
            {/* Mobile Navigation */}
            <div className="block sm:hidden space-y-4">
              {currentStep < STEPS.length ? (
                <Button
                  onClick={nextStep}
                  disabled={!canProceedToNext()}
                  className="w-full polymer-btn bg-trailflow-green/90 backdrop-blur-sm text-gray-800 hover:bg-trailflow-green hover:text-gray-900 hover:shadow-lg border border-white/20 h-12 text-base font-medium transition-all duration-300"
                >
                  Próximo
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceedToNext() || isSubmitting}
                  className="w-full polymer-btn bg-trailflow-green/90 backdrop-blur-sm text-gray-800 hover:bg-trailflow-green hover:text-gray-900 hover:shadow-lg border border-white/20 h-12 text-base font-medium transition-all duration-300"
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
                className="w-full polymer-btn bg-white/50 backdrop-blur-sm border-trailflow-green/70 text-gray-700 hover:bg-trailflow-green hover:text-gray-800 hover:shadow-lg h-12 text-base font-medium transition-all duration-300"
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
                className="polymer-btn bg-white/50 backdrop-blur-sm border-trailflow-green/70 text-gray-700 hover:bg-trailflow-green hover:text-gray-800 hover:shadow-lg px-8 h-12 text-base font-medium transition-all duration-300"
              >
                <ArrowLeft size={20} className="mr-2" />
                Voltar
              </Button>
              
              {/* Progress Info */}
              <div className="text-center">
                <p className="polymer-body text-gray-700 drop-shadow-sm font-medium">
                  Etapa {currentStep} de {STEPS.length}
                </p>
              </div>
              
              {currentStep < STEPS.length ? (
                <Button
                  onClick={nextStep}
                  disabled={!canProceedToNext()}
                  className="polymer-btn bg-trailflow-green/90 backdrop-blur-sm text-gray-800 hover:bg-trailflow-green hover:text-gray-900 hover:shadow-lg border border-white/20 px-8 h-12 text-base font-medium transition-all duration-300"
                >
                  Próximo
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceedToNext() || isSubmitting}
                  className="polymer-btn bg-trailflow-green/90 backdrop-blur-sm text-gray-800 hover:bg-trailflow-green hover:text-gray-900 hover:shadow-lg border border-white/20 px-8 h-12 text-base font-medium transition-all duration-300"
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
