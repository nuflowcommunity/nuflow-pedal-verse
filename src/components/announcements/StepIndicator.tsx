
import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="w-full">
      {/* Desktop Step Indicator - Enhanced Polymer Style */}
      <div className="hidden lg:flex items-center justify-between relative">
        {/* Background Line */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
        <div 
          className="absolute top-6 left-0 h-0.5 bg-trailflow-green transition-all duration-700 -z-10"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        ></div>
        
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center relative bg-white px-6">
            {/* Step Circle - Touch Friendly */}
            <div
              className={`
                w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 polymer-interactive
                ${currentStep > step.id 
                  ? 'bg-trailflow-green text-white shadow-lg' 
                  : currentStep === step.id 
                  ? 'bg-white text-trailflow-green border-2 border-trailflow-green shadow-lg' 
                  : 'bg-gray-100 text-gray-600 border border-gray-300'
                }
              `}
            >
              {currentStep > step.id ? (
                <Check size={18} />
              ) : (
                step.id
              )}
            </div>
            
            {/* Step Text */}
            <div className="mt-4 text-center min-w-0 max-w-36">
              <p className={`polymer-body-small polymer-light transition-colors duration-300 ${
                currentStep >= step.id ? 'text-gray-800' : 'text-gray-600'
              }`}>
                {step.title}
              </p>
              <p className="polymer-body-small text-gray-700 mt-2 polymer-light opacity-80">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Tablet Step Indicator */}
      <div className="hidden md:flex lg:hidden items-center justify-center space-x-6 mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`
                w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300
                ${currentStep > step.id 
                  ? 'bg-trailflow-green text-white' 
                  : currentStep === step.id 
                  ? 'bg-white text-trailflow-green border-2 border-trailflow-green' 
                  : 'bg-gray-100 text-gray-600'
                }
              `}
            >
              {currentStep > step.id ? (
                <Check size={16} />
              ) : (
                step.id
              )}
            </div>
            
            {index < steps.length - 1 && (
              <div
                className={`w-12 h-0.5 mx-3 transition-colors duration-300 ${
                  currentStep > step.id ? 'bg-trailflow-green' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      
      {/* Mobile Step Indicator - Enhanced Polymer Style */}
      <div className="md:hidden">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between polymer-body-small text-gray-700 mb-4 polymer-light">
            <span className="font-medium">Etapa {currentStep}</span>
            <span>{steps.length} etapas</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-trailflow-green to-trailflow-green-dark h-2 rounded-full transition-all duration-700 shadow-sm"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>
        
        {/* Current Step Info */}
        <div className="text-center polymer-text-reveal animate">
          <div className="polymer-text-reveal-inner">
            <h3 className="polymer-heading-xs text-gray-800 mb-4 polymer-thin">
              {steps[currentStep - 1].title}
            </h3>
            <p className="polymer-body-regular text-gray-700 polymer-light">
              {steps[currentStep - 1].description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
