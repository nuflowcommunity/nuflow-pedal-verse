
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface AdminSignUpFormProps {
  onBackToLogin: () => void;
}

const AdminSignUpForm: React.FC<AdminSignUpFormProps> = ({ onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Senhas não coincidem",
        description: "As senhas digitadas não são iguais.",
        variant: "destructive"
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Senha muito fraca",
        description: "A senha deve ter pelo menos 6 caracteres.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Primeiro, verificar se o usuário já existe tentando fazer login
      console.log('Tentando fazer login primeiro...');
      try {
        await signIn(email, password);
        toast({
          title: "Login realizado com sucesso!",
          description: "Usuário já existia, fazendo login...",
        });
        return; // Se conseguiu fazer login, não precisa criar conta
      } catch (loginError) {
        console.log('Login falhou, tentando criar conta...', loginError);
      }

      // Se o login falhou, tentar criar a conta
      console.log('Criando nova conta...');
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`
        }
      });

      if (signUpError) {
        throw signUpError;
      }

      console.log('Conta criada com sucesso:', signUpData);

      if (signUpData.user && !signUpData.session) {
        toast({
          title: "Verificação de email necessária",
          description: "Verifique seu email para ativar a conta, depois faça login.",
        });
        onBackToLogin();
      } else if (signUpData.session) {
        toast({
          title: "Conta criada e login realizado!",
          description: "Redirecionando para o painel administrativo...",
        });
        // A redireção será feita pelo AuthContext
      } else {
        toast({
          title: "Conta criada!",
          description: "Faça login com suas credenciais.",
        });
        onBackToLogin();
      }

    } catch (error: any) {
      console.error('Erro no processo de signup/login:', error);
      
      // Se o erro for relacionado ao usuário já existir, tentar fazer login
      if (error.message?.includes('User already registered') || 
          error.message?.includes('already registered') ||
          error.message?.includes('Database error saving new user')) {
        
        console.log('Usuário já existe, tentando fazer login...');
        try {
          await signIn(email, password);
          toast({
            title: "Login realizado!",
            description: "O usuário já existia, fazendo login...",
          });
        } catch (finalLoginError: any) {
          console.error('Erro final no login:', finalLoginError);
          toast({
            title: "Problema com as credenciais",
            description: "Usuário pode já existir com senha diferente. Tente fazer login ou use a opção de recuperar senha.",
            variant: "destructive"
          });
          onBackToLogin();
        }
      } else {
        toast({
          title: "Erro ao processar solicitação",
          description: error.message || "Tente novamente ou use a opção de login.",
          variant: "destructive"
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <Label 
          htmlFor="email" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Email administrativo
        </Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@sistema.com"
          className="w-full h-11 px-3 border border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all duration-200"
          required
          disabled={isLoading}
        />
      </div>
      
      <div>
        <Label 
          htmlFor="password" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Senha de acesso
        </Label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            className="w-full h-11 px-3 pr-10 border border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all duration-200"
            required
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            disabled={isLoading}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div>
        <Label 
          htmlFor="confirmPassword" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Confirmar senha
        </Label>
        <div className="relative">
          <Input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••••••"
            className="w-full h-11 px-3 pr-10 border border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all duration-200"
            required
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            disabled={isLoading}
          >
            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        <Button 
          type="submit" 
          className="w-full h-11 bg-gray-900 text-white hover:bg-gray-800 focus:bg-gray-800 transition-colors duration-200 font-medium"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <span className="animate-spin mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
              Processando...
            </span>
          ) : 'Criar conta administrativa'}
        </Button>

        <Button 
          type="button" 
          variant="outline"
          className="w-full h-11 border-gray-300 text-gray-700 hover:bg-gray-50 focus:bg-gray-50 transition-colors duration-200 font-medium"
          onClick={onBackToLogin}
          disabled={isLoading}
        >
          Voltar ao login
        </Button>
      </div>
    </form>
  );
};

export default AdminSignUpForm;
