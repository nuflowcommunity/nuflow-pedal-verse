
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface UsePasswordResetResult {
  isLoading: boolean;
  sendResetEmail: (email: string) => Promise<boolean>;
  resetPassword: (password: string, accessToken: string) => Promise<boolean>;
}

export const usePasswordReset = (): UsePasswordResetResult => {
  const [isLoading, setIsLoading] = useState(false);

  const sendResetEmail = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        console.error('Password reset error:', error);
        toast({
          title: "Erro ao enviar email",
          description: "Não foi possível enviar o email de recuperação. Tente novamente.",
          variant: "destructive"
        });
        return false;
      }

      toast({
        title: "Email enviado!",
        description: "Se o email existir em nossa base, você receberá instruções para redefinir sua senha.",
      });

      // Log the request for security monitoring
      try {
        await supabase.rpc('request_password_reset', { email_address: email });
      } catch (logError) {
        console.warn('Failed to log password reset request:', logError);
      }

      return true;
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Erro inesperado",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (password: string, accessToken: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser(
        { password },
        { accessToken }
      );

      if (error) {
        console.error('Password update error:', error);
        toast({
          title: "Erro ao redefinir senha",
          description: "Não foi possível redefinir a senha. Tente novamente.",
          variant: "destructive"
        });
        return false;
      }

      toast({
        title: "Senha redefinida!",
        description: "Sua senha foi redefinida com sucesso. Você já pode fazer login.",
      });

      return true;
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Erro inesperado",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    sendResetEmail,
    resetPassword
  };
};
