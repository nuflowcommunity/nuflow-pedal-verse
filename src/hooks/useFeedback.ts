
import { useToast } from '@/hooks/use-toast';

export interface FeedbackOptions {
  title?: string;
  description?: string;
  duration?: number;
}

export const useFeedback = () => {
  const { toast } = useToast();

  const showSuccess = ({ title = "Sucesso!", description, duration = 5000 }: FeedbackOptions) => {
    toast({
      title,
      description,
      duration,
      className: "border-green-200 bg-green-50 text-green-900",
    });
  };

  const showError = ({ title = "Erro", description = "Algo deu errado. Tente novamente.", duration = 7000 }: FeedbackOptions) => {
    toast({
      title,
      description,
      duration,
      variant: "destructive",
    });
  };

  const showWarning = ({ title = "Atenção", description, duration = 6000 }: FeedbackOptions) => {
    toast({
      title,
      description,
      duration,
      className: "border-yellow-200 bg-yellow-50 text-yellow-900",
    });
  };

  const showInfo = ({ title = "Informação", description, duration = 4000 }: FeedbackOptions) => {
    toast({
      title,
      description,
      duration,
      className: "border-blue-200 bg-blue-50 text-blue-900",
    });
  };

  const showLoading = ({ title = "Processando...", description = "Aguarde um momento", duration = 30000 }: FeedbackOptions) => {
    toast({
      title,
      description,
      duration,
      className: "border-gray-200 bg-gray-50 text-gray-900",
    });
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showLoading,
  };
};
