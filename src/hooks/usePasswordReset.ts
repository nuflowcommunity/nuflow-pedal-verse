
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PasswordResetError {
  type: 'invalid_email' | 'network_error' | 'rate_limit' | 'unknown';
  message: string;
}

export const usePasswordReset = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<PasswordResetError | null>(null);
  const { toast } = useToast();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const getUserTypeFromEmail = (email: string): 'admin' | 'partner' | 'user' => {
    // Detecta tipo de usuário baseado no domínio ou padrões do email
    if (email.includes('admin') || email.endsWith('@nuflow.admin')) {
      return 'admin';
    }
    if (email.includes('partner') || email.includes('parceiro')) {
      return 'partner';
    }
    return 'user';
  };

  const requestPasswordReset = async (email: string, userType?: 'admin' | 'partner' | 'user') => {
    setIsLoading(true);
    setError(null);

    if (!validateEmail(email)) {
      setError({
        type: 'invalid_email',
        message: 'Por favor, digite um email válido.'
      });
      setIsLoading(false);
      return false;
    }

    try {
      const detectedUserType = userType || getUserTypeFromEmail(email);
      
      // Determine redirect URL based on user type
      const redirectUrls = {
        admin: `${window.location.origin}/admin/reset-password`,
        partner: `${window.location.origin}/partner/reset-password`, 
        user: `${window.location.origin}/auth/reset-password`
      };

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrls[detectedUserType],
      });

      if (error) {
        if (error.message.includes('rate limit')) {
          setError({
            type: 'rate_limit',
            message: 'Muitas tentativas. Aguarde alguns minutos antes de tentar novamente.'
          });
        } else {
          setError({
            type: 'network_error',
            message: 'Erro de conexão. Verifique sua internet e tente novamente.'
          });
        }
        throw error;
      }

      const userTypeLabels = {
        admin: 'administrador',
        partner: 'parceiro',
        user: 'usuário'
      };

      toast({
        title: "Email enviado com sucesso!",
        description: `Se o email existir como ${userTypeLabels[detectedUserType]} em nossa base, você receberá instruções para redefinir sua senha.`,
      });

      return true;
    } catch (error) {
      console.error('Password reset error:', error);
      
      if (!error) {
        setError({
          type: 'unknown',
          message: 'Ocorreu um erro inesperado. Tente novamente.'
        });
      }

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (newPassword: string, accessToken: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Set the session using the access token
      const { error: sessionError } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: '', // We only need access token for password reset
      });

      if (sessionError) throw sessionError;

      // Update the password
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      toast({
        title: "Senha redefinida com sucesso!",
        description: "Sua senha foi redefinida. Faça login com sua nova senha.",
      });

      return true;
    } catch (error) {
      console.error('Password reset error:', error);
      setError({
        type: 'unknown',
        message: 'Ocorreu um erro ao redefinir sua senha. Tente novamente.'
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    isLoading,
    error,
    requestPasswordReset,
    resetPassword,
    validateEmail,
    clearError,
  };
};
