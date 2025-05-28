
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, AlertCircle, AlertTriangle, Info, Loader2 } from 'lucide-react';

export interface FeedbackOptions {
  title?: string;
  description?: string;
  duration?: number;
  action?: React.ReactNode;
}

export const useFeedback = () => {
  const { toast } = useToast();

  const showSuccess = ({ title = "Sucesso!", description, duration = 5000, action }: FeedbackOptions) => {
    toast({
      title,
      description,
      duration,
      action,
      className: "border-green-200 bg-green-50 text-green-900",
    });
  };

  const showError = ({ title = "Erro", description = "Algo deu errado. Tente novamente.", duration = 7000, action }: FeedbackOptions) => {
    toast({
      title,
      description,
      duration,
      action,
      variant: "destructive",
      className: "border-red-200 bg-red-50 text-red-900",
    });
  };

  const showWarning = ({ title = "Atenção", description, duration = 6000, action }: FeedbackOptions) => {
    toast({
      title,
      description,
      duration,
      action,
      className: "border-yellow-200 bg-yellow-50 text-yellow-900",
    });
  };

  const showInfo = ({ title = "Informação", description, duration = 4000, action }: FeedbackOptions) => {
    toast({
      title,
      description,
      duration,
      action,
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

  // Feedback específicos para ações comuns
  const feedback = {
    // Ações de CRUD
    saveSuccess: (item: string = "item") => showSuccess({ 
      title: "Salvo com sucesso!", 
      description: `${item} foi salvo com sucesso.` 
    }),
    
    saveError: (item: string = "item") => showError({ 
      title: "Erro ao salvar", 
      description: `Não foi possível salvar ${item}. Tente novamente.` 
    }),
    
    deleteSuccess: (item: string = "item") => showSuccess({ 
      title: "Excluído com sucesso!", 
      description: `${item} foi excluído com sucesso.` 
    }),
    
    deleteError: (item: string = "item") => showError({ 
      title: "Erro ao excluir", 
      description: `Não foi possível excluir ${item}. Tente novamente.` 
    }),
    
    updateSuccess: (item: string = "item") => showSuccess({ 
      title: "Atualizado com sucesso!", 
      description: `${item} foi atualizado com sucesso.` 
    }),
    
    updateError: (item: string = "item") => showError({ 
      title: "Erro ao atualizar", 
      description: `Não foi possível atualizar ${item}. Tente novamente.` 
    }),

    // Ações de autenticação
    loginSuccess: () => showSuccess({ 
      title: "Login realizado!", 
      description: "Bem-vindo de volta!" 
    }),
    
    loginError: () => showError({ 
      title: "Erro no login", 
      description: "Verifique suas credenciais e tente novamente." 
    }),
    
    logoutSuccess: () => showSuccess({ 
      title: "Logout realizado!", 
      description: "Até logo!" 
    }),
    
    passwordResetSent: () => showSuccess({ 
      title: "Email enviado!", 
      description: "Verifique sua caixa de entrada para redefinir sua senha." 
    }),

    // Ações de eventos
    eventApproved: () => showSuccess({ 
      title: "Evento aprovado!", 
      description: "O evento foi aprovado e está disponível para inscrições." 
    }),
    
    eventRejected: () => showSuccess({ 
      title: "Evento rejeitado", 
      description: "O evento foi rejeitado conforme solicitado." 
    }),
    
    registrationSuccess: () => showSuccess({ 
      title: "Inscrição realizada!", 
      description: "Sua inscrição foi confirmada com sucesso." 
    }),
    
    registrationError: () => showError({ 
      title: "Erro na inscrição", 
      description: "Não foi possível realizar sua inscrição. Tente novamente." 
    }),

    // Ações de exportação
    exportSuccess: (format: string = "arquivo") => showSuccess({ 
      title: "Exportação concluída!", 
      description: `${format} foi exportado com sucesso.` 
    }),
    
    exportError: (format: string = "arquivo") => showError({ 
      title: "Erro na exportação", 
      description: `Não foi possível exportar ${format}. Tente novamente.` 
    }),

    // Ações de compra
    purchaseSuccess: () => showSuccess({ 
      title: "Compra finalizada!", 
      description: "Seu pedido foi processado com sucesso." 
    }),
    
    purchaseError: () => showError({ 
      title: "Erro no pagamento", 
      description: "Não foi possível processar seu pagamento. Tente novamente." 
    }),

    // Ações de conexão/rede
    networkError: () => showError({ 
      title: "Problema de conexão", 
      description: "Verifique sua conexão com a internet e tente novamente." 
    }),
    
    serverError: () => showError({ 
      title: "Erro do servidor", 
      description: "Nossos servidores estão temporariamente indisponíveis." 
    }),

    // Loading states
    saving: () => showLoading({ 
      title: "Salvando...", 
      description: "Aguarde enquanto salvamos suas alterações." 
    }),
    
    loading: () => showLoading({ 
      title: "Carregando...", 
      description: "Aguarde um momento." 
    }),
    
    processing: () => showLoading({ 
      title: "Processando...", 
      description: "Sua solicitação está sendo processada." 
    }),

    // Validações
    validationError: (field: string) => showWarning({ 
      title: "Campo obrigatório", 
      description: `Por favor, preencha o campo ${field}.` 
    }),
    
    invalidFormat: (field: string) => showWarning({ 
      title: "Formato inválido", 
      description: `O formato do campo ${field} não é válido.` 
    }),
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showLoading,
    feedback,
  };
};
