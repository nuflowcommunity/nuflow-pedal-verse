import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import SEOHead from '@/components/seo/SEOHead';
import SocialAuthButtons from '@/components/auth/SocialAuthButtons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { signIn, isLoading } = useAuth();
  const navigate = useNavigate();

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
              <h1 className="text-2xl font-heading font-bold mb-6 text-center">
                Entrar na sua conta
              </h1>
              
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-nuflow-mineral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-nuflow-moss"
                    placeholder="seu@email.com"
                    required
                    aria-describedby="email-error"
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1">
                    Senha
                  </label>
                  <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-nuflow-mineral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-nuflow-moss"
                    placeholder="••••••••"
                    required
                    aria-describedby="password-error"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-nuflow-moss focus:ring-nuflow-moss border-nuflow-mineral/30 rounded"
                    />
                    <label htmlFor="remember" className="ml-2 block text-sm">
                      Lembrar de mim
                    </label>
                  </div>
                  
                  <a 
                    href="#" 
                    className="text-sm text-nuflow-moss hover:text-nuflow-neon focus:outline-none focus:ring-2 focus:ring-nuflow-moss rounded"
                  >
                    Esqueceu a senha?
                  </a>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-nuflow-moss text-white hover:bg-nuflow-neon hover:text-nuflow-moss"
                  disabled={isLoading}
                  aria-describedby={isLoading ? "loading-status" : undefined}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2" aria-hidden="true">○</span>
                      Entrando...
                    </span>
                  ) : 'Entrar'}
                </Button>
                {isLoading && (
                  <div id="loading-status" className="sr-only">
                    Processando login, aguarde...
                  </div>
                )}

                <Button 
                  type="button" 
                  className="w-full mt-4 bg-blue-500 text-white hover:bg-blue-600"
                  onClick={handleDirectAccess}
                >
                  Acessar Diretamente (Modo Desenvolvimento)
                </Button>
              </form>
              
              <SocialAuthButtons mode="signin" />
              
              <div className="mt-6 text-center">
                <p className="text-sm">
                  Não tem uma conta?{" "}
                  <Link 
                    to="#" 
                    className="text-nuflow-moss hover:text-nuflow-neon font-semibold focus:outline-none focus:ring-2 focus:ring-nuflow-moss rounded"
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
