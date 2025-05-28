
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
              <h1 className="text-2xl font-heading font-bold mb-6 text-center text-nuflow-charcoal">
                Entrar na sua conta
              </h1>
              
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
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1 text-nuflow-charcoal">
                    Senha
                  </label>
                  <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-nuflow-mineral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-nuflow-forest"
                    placeholder="••••••••"
                    required
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-nuflow-forest focus:ring-nuflow-forest border-nuflow-mineral/30 rounded"
                    />
                    <label htmlFor="remember" className="ml-2 block text-sm text-nuflow-charcoal">
                      Lembrar de mim
                    </label>
                  </div>
                  
                  <a 
                    href="#" 
                    className="text-sm text-nuflow-forest hover:text-nuflow-emerald focus:outline-none focus:ring-2 focus:ring-nuflow-forest rounded"
                  >
                    Esqueceu a senha?
                  </a>
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
