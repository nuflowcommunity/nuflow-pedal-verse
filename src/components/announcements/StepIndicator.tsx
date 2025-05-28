
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
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            {/* Step Circle */}
            <div className="flex items-center">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
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
                    w-16 h-0.5 mx-2
                    ${currentStep > step.id 
                      ? 'bg-nuflow-moss' 
                      : 'bg-gray-200'
                    }
                  `}
                />
              )}
            </div>
            
            {/* Step Text */}
            <div className="mt-2 text-center hidden md:block">
              <p className={`text-sm font-medium ${currentStep >= step.id ? 'text-nuflow-darkForest' : 'text-gray-500'}`}>
                {step.title}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Mobile Step Text */}
      <div className="mt-4 text-center md:hidden">
        <p className="text-lg font-medium text-nuflow-darkForest">
          {steps[currentStep - 1].title}
        </p>
        <p className="text-sm text-gray-500">
          Etapa {currentStep} de {steps.length}
        </p>
      </div>
    </div>
  );
};

export default StepIndicator;
