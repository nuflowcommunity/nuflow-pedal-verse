import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import SEOHead from '@/components/seo/SEOHead';
import SocialAuthButtons from '@/components/auth/SocialAuthButtons';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import AdminSignUpForm from '@/components/auth/AdminSignUpForm';
import { Eye, EyeOff, AlertCircle, CheckCircle, ArrowLeft, Shield, Code } from 'lucide-react';

const AdminLogin = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
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
      navigate('/admin');
    } catch (error) {
      console.error('Admin login error:', error);
    }
  };

  // Função de desenvolvimento para acessar sem login
  const handleDevAccess = () => {
    toast({
      title: "Acesso de desenvolvimento",
      description: "Redirecionando para o painel admin...",
    });
    navigate('/admin');
  };

  if (showForgotPassword) {
    return (
      <>
        <SEOHead
          title="Recuperar senha - Admin"
          description="Recupere o acesso à sua conta de administrador."
          noIndex={true}
        />
        
        <div className="min-h-screen bg-gray-50">
          <div className="flex min-h-screen items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
              <button
                onClick={() => setShowForgotPassword(false)}
                className="mb-6 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao login
              </button>
              
              <div className="bg-white shadow-sm border border-gray-200 p-8">
                <ForgotPasswordForm 
                  onBackToLogin={() => setShowForgotPassword(false)}
                  userType="admin"
                  title="Recuperar senha - Admin"
                  description="Digite seu email de administrador para receber instruções de recuperação."
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (showSignUp) {
    return (
      <>
        <SEOHead
          title="Criar conta administrativa"
          description="Criar nova conta de administrador do sistema."
          noIndex={true}
        />
        
        <div className="min-h-screen bg-gray-50">
          {/* Logo no canto superior direito */}
          <div className="absolute top-6 right-6 z-10">
            <Link to="/">
              <img 
                src="/lovable-uploads/adf44db0-c66b-4031-a615-a8e98fe5f77f.png" 
                alt="NuFlow" 
                className="w-12 h-12 object-contain opacity-60 hover:opacity-100 transition-opacity" 
              />
            </Link>
          </div>

          <div className="flex min-h-screen items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
              
              {/* Main Form Card */}
              <div className="bg-white shadow-sm border border-gray-200 p-8">
                
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-gray-600" />
                  </div>
                  <h1 className="text-2xl font-light text-gray-900 mb-2">
                    Criar Conta Administrativa
                  </h1>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Criar nova conta para administradores do sistema.
                  </p>
                </div>
                
                {/* Sign Up Form */}
                <AdminSignUpForm onBackToLogin={() => setShowSignUp(false)} />
                
                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Já tem conta? <button 
                        onClick={() => setShowSignUp(false)}
                        className="text-gray-900 hover:underline font-medium"
                      >
                        Fazer login
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title="Acesso Administrativo - Sistema"
        description="Acesso exclusivo para administradores do sistema."
        noIndex={true}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Logo no canto superior direito */}
        <div className="absolute top-6 right-6 z-10">
          <Link to="/">
            <img 
              src="/lovable-uploads/adf44db0-c66b-4031-a615-a8e98fe5f77f.png" 
              alt="NuFlow" 
              className="w-12 h-12 object-contain opacity-60 hover:opacity-100 transition-opacity" 
            />
          </Link>
        </div>

        {/* Botão de desenvolvimento no canto superior esquerdo */}
        <div className="absolute top-6 left-6 z-10">
          <Button
            onClick={handleDevAccess}
            variant="outline"
            size="sm"
            className="bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200"
          >
            <Code className="w-4 h-4 mr-2" />
            Dev Access
          </Button>
        </div>

        <div className="flex min-h-screen items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            
            {/* Alert Messages */}
            {searchParams.get('message') === 'password_reset_success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-sm">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-sm text-green-800">
                    Senha redefinida com sucesso! Faça login com sua nova senha.
                  </span>
                </div>
              </div>
            )}
            
            {searchParams.get('error') === 'invalid_reset_link' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-sm">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
                  <span className="text-sm text-red-800">
                    Link de redefinição inválido ou expirado.
                  </span>
                </div>
              </div>
            )}
            
            {/* Main Form Card */}
            <div className="bg-white shadow-sm border border-gray-200 p-8">
              
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-gray-600" />
                </div>
                <h1 className="text-2xl font-light text-gray-900 mb-2">
                  Sistema Administrativo
                </h1>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Acesso restrito para administradores do sistema.
                </p>
              </div>
              
              {/* Social Auth Buttons */}
              <div className="mb-8">
                <SocialAuthButtons mode="signin" />
              </div>
              
              {/* Login Form */}
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
                
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setShowSignUp(true)}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    disabled={isLoading}
                  >
                    Criar conta
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    disabled={isLoading}
                  >
                    Esqueceu a senha?
                  </button>
                </div>
                
                <div>
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
                    ) : 'Acessar Sistema'}
                  </Button>
                </div>
              </form>
              
              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Acesso restrito • Apenas administradores autorizados
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
