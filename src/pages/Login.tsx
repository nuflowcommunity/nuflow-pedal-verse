
import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import SEOHead from '@/components/seo/SEOHead';
import SocialAuthButtons from '@/components/auth/SocialAuthButtons';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

const Login = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { signIn, isLoading } = useAuth();
  const navigate = useNavigate();

  // Handle URL parameters for messages
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

  // For development purposes, provide a direct access button
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

  if (showForgotPassword) {
    return (
      <>
        <SEOHead
          title="Recuperar senha - Redefinir acesso"
          description="Recupere o acesso à sua conta NuFlow através do email de redefinição de senha."
          keywords={['recuperar senha', 'redefinir senha', 'esqueci senha', 'reset password']}
          url="/login"
          noIndex={true}
        />
        
        <div className="min-h-screen flex flex-col">
          <Navbar />
          
          <main className="flex-grow py-16 bg-nuflow-sand">
            <div className="container-custom">
              <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
                <ForgotPasswordForm 
                  onBackToLogin={() => setShowForgotPassword(false)}
                  userType="user"
                />
              </div>
            </div>
          </main>
          
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title="Login - Entrar na sua conta"
        description="Faça login na sua conta NuFlow para acessar eventos de ciclismo, marketplace e comunidade."
        keywords={['login', 'entrar', 'conta', 'autenticação', 'ciclismo']}
        url="/login"
        noIndex={true}
      />
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow py-16 bg-nuflow-sand">
          <div className="container-custom">
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
              <h1 className="text-2xl font-heading font-bold mb-6 text-center text-nuflow-charcoal">
                Entrar na sua conta
              </h1>
              
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
                  <label htmlFor="email" className="block text-sm font-medium mb-1 text-nuflow-charcoal">
                    Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-nuflow-mineral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-nuflow-forest"
                    placeholder="seu@email.com"
                    required
                    disabled={isLoading}
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1 text-nuflow-charcoal">
                    Senha
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-3 pr-10 border border-nuflow-mineral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-nuflow-forest"
                      placeholder="••••••••"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-nuflow-charcoal/50 hover:text-nuflow-charcoal"
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
                      className="h-4 w-4 text-nuflow-forest focus:ring-nuflow-forest border-nuflow-mineral/30 rounded"
                      disabled={isLoading}
                    />
                    <label htmlFor="remember" className="ml-2 block text-sm text-nuflow-charcoal">
                      Lembrar de mim
                    </label>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-nuflow-forest hover:text-nuflow-emerald focus:outline-none focus:ring-2 focus:ring-nuflow-forest rounded transition-colors"
                    disabled={isLoading}
                  >
                    Esqueceu a senha?
                  </button>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-nuflow-forest text-white hover:bg-nuflow-darkForest"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2" aria-hidden="true">○</span>
                      Entrando...
                    </span>
                  ) : 'Entrar'}
                </Button>

                <Button 
                  type="button" 
                  className="w-full mt-4 bg-nuflow-emerald text-nuflow-forest hover:bg-nuflow-mint"
                  onClick={handleDirectAccess}
                  disabled={isLoading}
                >
                  Acessar Diretamente (Modo Desenvolvimento)
                </Button>
              </form>
              
              <SocialAuthButtons mode="signin" />
              
              <div className="mt-6 text-center">
                <p className="text-sm text-nuflow-charcoal">
                  Não tem uma conta?{" "}
                  <Link 
                    to="#" 
                    className="text-nuflow-forest hover:text-nuflow-emerald font-semibold focus:outline-none focus:ring-2 focus:ring-nuflow-forest rounded"
                  >
                    Cadastre-se
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Login;
