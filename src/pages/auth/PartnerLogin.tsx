
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import SEOHead from '@/components/seo/SEOHead';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import { Eye, EyeOff, AlertCircle, CheckCircle, Users } from 'lucide-react';

const PartnerLogin = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { signIn, isLoading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    const error = searchParams.get('error');
    const message = searchParams.get('message');
    
    if (error === 'invalid_reset_link') {
      toast({
        title: "Link inválido",
        description: "O link de redefinição de senha é inválido ou expirou. Solicite um novo.",
        variant: "destructive"
      });
    }
    
    if (message === 'password_reset_success') {
      toast({
        title: "Senha redefinida!",
        description: "Sua senha foi redefinida com sucesso. Faça login com sua nova senha.",
      });
    }
  }, [searchParams]);

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
      navigate('/partner/dashboard');
    } catch (error) {
      console.error('Partner login error:', error);
    }
  };

  if (showForgotPassword) {
    return (
      <>
        <SEOHead
          title="Recuperar senha - Parceiro"
          description="Recupere o acesso à sua conta de parceiro."
          noIndex={true}
        />
        
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
          <div className="max-w-md w-full mx-4">
            <div className="bg-white p-8 rounded-lg shadow-lg border border-blue-100">
              <ForgotPasswordForm 
                onBackToLogin={() => setShowForgotPassword(false)}
                userType="partner"
                title="Recuperar senha - Parceiro"
                description="Digite seu email de parceiro para receber instruções de recuperação."
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title="Login Parceiro"
        description="Acesso exclusivo para parceiros do sistema."
        noIndex={true}
      />
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white p-8 rounded-lg shadow-lg border border-blue-100">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h1 className="text-2xl font-heading font-bold text-gray-800">
                Portal do Parceiro
              </h1>
              <p className="text-sm text-gray-600 mt-2">
                Entre com suas credenciais de parceiro
              </p>
            </div>
            
            {/* Success/Error Messages */}
            {searchParams.get('message') === 'password_reset_success' && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-800">
                  Senha redefinida com sucesso! Faça login com sua nova senha.
                </span>
              </div>
            )}
            
            {searchParams.get('error') === 'invalid_reset_link' && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-800">
                  Link de redefinição inválido ou expirado.
                </span>
              </div>
            )}
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700">
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="parceiro@exemplo.com"
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-700">
                  Senha
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded transition-colors"
                  disabled={isLoading}
                >
                  Esqueceu a senha?
                </button>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <span className="animate-spin mr-2" aria-hidden="true">○</span>
                    Entrando...
                  </span>
                ) : 'Entrar no Portal'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PartnerLogin;
