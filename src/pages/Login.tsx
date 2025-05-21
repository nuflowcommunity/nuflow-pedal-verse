
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { signIn, isLoading, user } = useAuth();
  const navigate = useNavigate();

  // If already authenticated, redirect to admin
  useEffect(() => {
    if (user) {
      navigate('/admin');
    }
  }, [user, navigate]);

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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16 bg-nuflow-sand">
        <div className="container-custom">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-heading font-bold mb-6 text-center">Entrar na sua conta</h1>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-nuflow-mineral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-nuflow-moss"
                  placeholder="seu@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">Senha</label>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-nuflow-mineral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-nuflow-moss"
                  placeholder="••••••••"
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
                
                <a href="#" className="text-sm text-nuflow-moss hover:text-nuflow-neon">
                  Esqueceu a senha?
                </a>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-nuflow-moss text-white hover:bg-nuflow-neon hover:text-nuflow-moss"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <span className="animate-spin mr-2">○</span>
                    Entrando...
                  </span>
                ) : 'Entrar'}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm">
                Não tem uma conta?{" "}
                <Link to="#" className="text-nuflow-moss hover:text-nuflow-neon font-semibold">
                  Cadastre-se
                </Link>
              </p>
            </div>
            
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-nuflow-mineral/20"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-4 text-nuflow-mineral">Ou continue com</span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button variant="outline" className="border-nuflow-mineral/30">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12 5c1.6 0 3 .5 4.1 1.4l3.1-3.1C17.1 1.7 14.7 1 12 1S6.9 1.7 4.9 3.3l3.1 3.1C9 5.5 10.4 5 12 5zm0 14c-1.6 0-3-.5-4.1-1.4l-3.1 3.1C6.9 22.3 9.3 23 12 23s5.1-.7 7.1-2.3l-3.1-3.1c-1.1.9-2.5 1.4-4.1 1.4zm-7.9-7c0-1.3.3-2.6.9-3.7L1.9 5.2C.7 7.2 0 9.5 0 12s.7 4.8 1.9 6.8l3.1-3.1c-.6-1.1-.9-2.4-.9-3.7zm15.8 0c0 1.3-.3 2.6-.9 3.7l3.1 3.1c1.2-2 1.9-4.3 1.9-6.8s-.7-4.8-1.9-6.8l-3.1 3.1c.6 1.1.9 2.4.9 3.7z"
                    ></path>
                  </svg>
                  Google
                </Button>
                
                <Button variant="outline" className="border-nuflow-mineral/30">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    ></path>
                  </svg>
                  Facebook
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
