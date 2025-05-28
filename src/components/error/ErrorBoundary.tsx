
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetKeys?: Array<string | number>;
  resetOnPropsChange?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  eventId: string | null;
}

class ErrorBoundary extends Component<Props, State> {
  private resetTimeoutId: number | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      eventId: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const eventId = this.logErrorToService(error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
      eventId
    });

    // Call onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { resetKeys, resetOnPropsChange } = this.props;
    const { hasError } = this.state;

    if (hasError && !prevState.hasError) {
      // Error just occurred
      return;
    }

    if (resetOnPropsChange && hasError) {
      // Reset on any prop change
      this.resetErrorBoundary();
      return;
    }

    if (resetKeys && hasError) {
      // Reset if resetKeys changed
      const hasResetKeyChanged = resetKeys.some(
        (key, index) => prevProps.resetKeys?.[index] !== key
      );
      
      if (hasResetKeyChanged) {
        this.resetErrorBoundary();
      }
    }
  }

  logErrorToService = (error: Error, errorInfo: ErrorInfo): string => {
    // Generate a unique event ID
    const eventId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Log to console in development
    console.group('🚨 Error Boundary Caught An Error');
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
    console.error('Event ID:', eventId);
    console.groupEnd();

    // In production, send to error tracking service
    if (process.env.NODE_ENV === 'production') {
      // Implement your error tracking service here
      // e.g., Sentry, LogRocket, etc.
    }

    return eventId;
  };

  resetErrorBoundary = () => {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }

    this.resetTimeoutId = window.setTimeout(() => {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        eventId: null
      });
    }, 100);
  };

  handleRetry = () => {
    this.resetErrorBoundary();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      // Custom fallback UI
      if (fallback) {
        return fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-nuflow-sand p-4">
          <Card className="max-w-md w-full">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <AlertTriangle className="h-16 w-16 text-red-500" />
              </div>
              <CardTitle className="text-2xl">Oops! Algo deu errado</CardTitle>
              <CardDescription>
                Encontramos um problema inesperado. Nossa equipe foi notificada automaticamente.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <details className="text-sm text-gray-600 bg-gray-50 p-3 rounded border">
                  <summary className="cursor-pointer font-medium">
                    Detalhes técnicos
                  </summary>
                  <pre className="mt-2 whitespace-pre-wrap text-xs">
                    {error.message}
                  </pre>
                </details>
              )}
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={this.handleRetry}
                  className="flex items-center justify-center"
                  variant="default"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Tentar Novamente
                </Button>
                
                <Button 
                  onClick={this.handleGoHome}
                  variant="outline"
                  className="flex items-center justify-center"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Ir para Início
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
