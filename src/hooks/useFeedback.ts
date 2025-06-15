
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

  // Objeto feedback com métodos convenientes para compatibilidade
  const feedback = {
    // Métodos de operação
    processing: () => showLoading({ title: "Processando...", description: "Aguarde um momento" }),
    saving: () => showLoading({ title: "Salvando...", description: "Aguarde um momento" }),
    
    // Métodos de sucesso
    saveSuccess: (item: string) => showSuccess({ 
      title: "Salvo com sucesso", 
      description: `${item} foi salvo com sucesso.` 
    }),
    updateSuccess: (item: string) => showSuccess({ 
      title: "Atualizado com sucesso", 
      description: `${item} foi atualizado com sucesso.` 
    }),
    exportSuccess: (format: string) => showSuccess({ 
      title: "Exportação concluída", 
      description: `${format} foi exportado com sucesso.` 
    }),
    eventApproved: () => showSuccess({ 
      title: "Evento aprovado", 
      description: "O evento foi aprovado com sucesso." 
    }),
    eventRejected: () => showSuccess({ 
      title: "Evento rejeitado", 
      description: "O evento foi rejeitado." 
    }),
    
    // Métodos de erro
    saveError: (item: string) => showError({ 
      title: "Erro ao salvar", 
      description: `Não foi possível salvar ${item}. Tente novamente.` 
    }),
    updateError: (item: string) => showError({ 
      title: "Erro ao atualizar", 
      description: `Não foi possível atualizar ${item}. Tente novamente.` 
    }),
    exportError: (format: string) => showError({ 
      title: "Erro na exportação", 
      description: `Não foi possível exportar ${format}. Tente novamente.` 
    }),
    networkError: () => showError({ 
      title: "Erro de conexão", 
      description: "Verifique sua conexão e tente novamente." 
    }),
    
    // Métodos de validação
    validationError: (field: string) => showWarning({ 
      title: "Campo obrigatório", 
      description: `Por favor, preencha o campo ${field}.` 
    })
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showLoading,
    feedback
  };
};
