
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
  onForgotPassword: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { signIn, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleDirectAccess = () => {
    navigate('/admin');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor preencha o email e a senha.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await signIn(email, password);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <Label 
          htmlFor="email" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Email
        </Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
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
          Senha
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
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
            disabled={isLoading}
          />
          <Label 
            htmlFor="remember" 
            className="ml-2 text-sm text-gray-700"
          >
            Lembrar de mim
          </Label>
        </div>
        
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          disabled={isLoading}
        >
          Esqueceu a senha?
        </button>
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
          ) : 'Entrar na conta'}
        </Button>

        <Button 
          type="button" 
          variant="outline"
          className="w-full h-11 border-gray-300 text-gray-700 hover:bg-gray-50 focus:bg-gray-50 transition-colors duration-200 font-medium"
          onClick={handleDirectAccess}
          disabled={isLoading}
        >
          Acesso Direto (Desenvolvimento)
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
