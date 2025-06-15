
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
      {/* Desktop Step Indicator - Polymer Style */}
      <div className="hidden lg:flex items-center justify-between relative">
        {/* Background Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
        <div 
          className="absolute top-5 left-0 h-0.5 bg-trailflow-green transition-all duration-500 -z-10"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        ></div>
        
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center relative bg-white px-4">
            {/* Step Circle */}
            <div
              className={`
                w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 polymer-interactive
                ${currentStep > step.id 
                  ? 'bg-trailflow-green text-white shadow-lg' 
                  : currentStep === step.id 
                  ? 'bg-white text-trailflow-green border-2 border-trailflow-green shadow-lg' 
                  : 'bg-gray-100 text-gray-400 border border-gray-200'
                }
              `}
            >
              {currentStep > step.id ? (
                <Check size={16} />
              ) : (
                step.id
              )}
            </div>
            
            {/* Step Text */}
            <div className="mt-3 text-center min-w-0 max-w-32">
              <p className={`text-sm font-medium polymer-body transition-colors duration-300 ${
                currentStep >= step.id ? 'text-trailflow-dark' : 'text-gray-400'
              }`}>
                {step.title}
              </p>
              <p className="text-xs text-gray-500 mt-1 polymer-body">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Tablet Step Indicator */}
      <div className="hidden md:flex lg:hidden items-center justify-center space-x-4 mb-6">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300
                ${currentStep > step.id 
                  ? 'bg-trailflow-green text-white' 
                  : currentStep === step.id 
                  ? 'bg-white text-trailflow-green border-2 border-trailflow-green' 
                  : 'bg-gray-100 text-gray-400'
                }
              `}
            >
              {currentStep > step.id ? (
                <Check size={14} />
              ) : (
                step.id
              )}
            </div>
            
            {index < steps.length - 1 && (
              <div
                className={`w-8 h-0.5 mx-2 transition-colors duration-300 ${
                  currentStep > step.id ? 'bg-trailflow-green' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      
      {/* Mobile Step Indicator - Polymer Style */}
      <div className="md:hidden">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-500 mb-3">
            <span className="polymer-body font-medium">Etapa {currentStep}</span>
            <span className="polymer-body">{steps.length} etapas</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-trailflow-green to-trailflow-green-dark h-2 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>
        
        {/* Current Step Info */}
        <div className="text-center polymer-text-reveal animate">
          <div className="polymer-text-reveal-inner">
            <h3 className="text-xl font-semibold text-trailflow-dark mb-2 polymer-heading">
              {steps[currentStep - 1].title}
            </h3>
            <p className="text-sm text-trailflow-medium polymer-body">
              {steps[currentStep - 1].description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
