
import React, { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

export interface ErrorContext {
  component?: string;
  action?: string;
  userId?: string;
  additional?: Record<string, any>;
}

export interface ErrorHandlerOptions {
  showToast?: boolean;
  logToConsole?: boolean;
  logToService?: boolean;
  retryCallback?: () => void | Promise<void>;
}

export const useErrorHandler = () => {
  const { toast } = useToast();

  const handleError = useCallback((
    error: Error | unknown,
    context: ErrorContext = {},
    options: ErrorHandlerOptions = {}
  ) => {
    const {
      showToast = true,
      logToConsole = true,
      logToService = true,
      retryCallback
    } = options;

    // Normalize error
    const normalizedError = error instanceof Error ? error : new Error(String(error));
    
    // Create error report
    const errorReport = {
      message: normalizedError.message,
      stack: normalizedError.stack,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      context,
      errorId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    // Log to console
    if (logToConsole) {
      console.group('🚨 Error Handler');
      console.error('Error:', normalizedError);
      console.error('Context:', context);
      console.error('Report:', errorReport);
      console.groupEnd();
    }

    // Log to error tracking service
    if (logToService && process.env.NODE_ENV === 'production') {
      // Implement your error tracking service here
      // e.g., Sentry, LogRocket, etc.
      console.log('Would send to error service:', errorReport);
    }

    // Show user-friendly toast
    if (showToast) {
      const isNetworkError = normalizedError.message.includes('fetch') || 
                           normalizedError.message.includes('network') ||
                           normalizedError.message.includes('Failed to load');
      
      const isAuthError = normalizedError.message.includes('auth') || 
                         normalizedError.message.includes('unauthorized') ||
                         normalizedError.message.includes('forbidden');

      let title = 'Erro inesperado';
      let description = 'Tente novamente em alguns instantes.';

      if (isNetworkError) {
        title = 'Problema de conexão';
        description = 'Verifique sua conexão com a internet e tente novamente.';
      } else if (isAuthError) {
        title = 'Erro de autenticação';
        description = 'Faça login novamente para continuar.';
      } else if (context.action) {
        title = `Erro ao ${context.action}`;
        description = 'Por favor, tente novamente.';
      }

      toast({
        title,
        description,
        variant: "destructive",
        action: retryCallback ? React.createElement(Button, {
          variant: "outline",
          size: "sm",
          onClick: retryCallback,
          children: "Tentar novamente"
        }) : undefined
      });
    }

    return errorReport;
  }, [toast]);

  const handleAsyncError = useCallback(async (
    asyncFn: () => Promise<any>,
    context: ErrorContext = {},
    options: ErrorHandlerOptions = {}
  ) => {
    try {
      return await asyncFn();
    } catch (error) {
      handleError(error, context, options);
      throw error; // Re-throw for caller to handle if needed
    }
  }, [handleError]);

  return {
    handleError,
    handleAsyncError
  };
};

export default useErrorHandler;
