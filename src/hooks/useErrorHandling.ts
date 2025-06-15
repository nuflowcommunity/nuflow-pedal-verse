
import { useCallback } from 'react';
import { useFeedback } from './useFeedback';

export interface ErrorOptions {
  context?: string;
  showToast?: boolean;
  logToConsole?: boolean;
}

export const useErrorHandling = () => {
  const { showError, showWarning } = useFeedback();

  const handleError = useCallback((
    error: Error | unknown,
    options: ErrorOptions = {}
  ) => {
    const {
      context = 'Operação',
      showToast = true,
      logToConsole = true
    } = options;

    const errorMessage = error instanceof Error ? error.message : String(error);
    
    if (logToConsole) {
      console.error(`[${context}] Error:`, error);
    }

    if (showToast) {
      const isNetworkError = errorMessage.includes('fetch') || 
                           errorMessage.includes('network');
      
      if (isNetworkError) {
        showError({
          title: 'Problema de conexão',
          description: 'Verifique sua conexão e tente novamente.'
        });
      } else {
        showError({
          title: `Erro em ${context}`,
          description: 'Tente novamente em alguns instantes.'
        });
      }
    }

    return { error: errorMessage, context };
  }, [showError]);

  const handleAsyncOperation = useCallback(async <T>(
    operation: () => Promise<T>,
    options: ErrorOptions = {}
  ): Promise<T | null> => {
    try {
      return await operation();
    } catch (error) {
      handleError(error, options);
      return null;
    }
  }, [handleError]);

  const handleValidationError = useCallback((
    field: string,
    message?: string
  ) => {
    showWarning({
      title: 'Campo obrigatório',
      description: message || `Por favor, preencha o campo ${field}.`
    });
  }, [showWarning]);

  return {
    handleError,
    handleAsyncOperation,
    handleValidationError
  };
};
