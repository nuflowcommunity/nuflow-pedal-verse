
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const usePasswordReset = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const requestPasswordReset = async (email: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;

      toast({
        title: "Email enviado",
        description: "Se o email existir em nossa base, você receberá instruções para redefinir sua senha.",
      });

      return true;
    } catch (error) {
      console.error('Password reset error:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao enviar o email de recuperação. Tente novamente.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (newPassword: string, accessToken: string) => {
    setIsLoading(true);
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
        title: "Senha redefinida",
        description: "Sua senha foi redefinida com sucesso.",
      });

      return true;
    } catch (error) {
      console.error('Password reset error:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao redefinir sua senha. Tente novamente.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    requestPasswordReset,
    resetPassword,
  };
};
