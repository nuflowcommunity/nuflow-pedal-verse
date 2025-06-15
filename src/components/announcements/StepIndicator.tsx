
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
      {/* Desktop Step Indicator */}
      <div className="hidden md:flex items-center justify-between overflow-x-auto pb-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center min-w-0 flex-1">
            {/* Step Circle and Connector */}
            <div className="flex items-center w-full">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0
                  ${currentStep > step.id 
                    ? 'bg-nuflow-moss text-white' 
                    : currentStep === step.id 
                    ? 'bg-nuflow-lime text-nuflow-darkForest border-2 border-nuflow-moss' 
                    : 'bg-gray-200 text-gray-500'
                  }
                `}
              >
                {currentStep > step.id ? (
                  <Check size={16} />
                ) : (
                  step.id
                )}
              </div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={`
                    flex-1 h-0.5 mx-2
                    ${currentStep > step.id 
                      ? 'bg-nuflow-moss' 
                      : 'bg-gray-200'
                    }
                  `}
                />
              )}
            </div>
            
            {/* Step Text */}
            <div className="mt-2 text-center min-w-0">
              <p className={`text-sm font-medium truncate ${currentStep >= step.id ? 'text-nuflow-darkForest' : 'text-gray-500'}`}>
                {step.title}
              </p>
              <p className="text-xs text-gray-500 mt-1 truncate">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Mobile Step Indicator */}
      <div className="md:hidden">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Etapa {currentStep}</span>
            <span>{steps.length} etapas</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-nuflow-moss h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>
        
        {/* Current Step Info */}
        <div className="text-center">
          <p className="text-lg font-medium text-nuflow-darkForest">
            {steps[currentStep - 1].title}
          </p>
          <p className="text-sm text-gray-500">
            {steps[currentStep - 1].description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
