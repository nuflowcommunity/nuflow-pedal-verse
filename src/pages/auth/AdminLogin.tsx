
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import SEOHead from '@/components/seo/SEOHead';
import SocialAuthButtons from '@/components/auth/SocialAuthButtons';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import { Eye, EyeOff, AlertCircle, CheckCircle, ArrowLeft, Shield } from 'lucide-react';

const AdminLogin = () => {
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
      navigate('/admin');
    } catch (error) {
      console.error('Admin login error:', error);
    }
  };

  if (showForgotPassword) {
    return (
      <>
        <SEOHead
          title="Recuperar senha - Admin"
          description="Recupere o acesso à sua conta de administrador."
          noIndex={true}
        />
        
        <div className="min-h-screen bg-trailflow-dark polymer-dark-section">
          <div className="container-editorial py-16 lg:py-24">
            <div className="max-w-2xl mx-auto">
              <button
                onClick={() => setShowForgotPassword(false)}
                className="polymer-btn inline-flex items-center mb-8 text-trailflow-white hover:text-red-400 transition-colors duration-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao login
              </button>
              
              <div className="bg-trailflow-dark border border-red-500/20 rounded-none p-8 lg:p-12">
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

  return (
    <>
      <SEOHead
        title="Acesso Administrativo - Sistema"
        description="Acesso exclusivo para administradores do sistema."
        noIndex={true}
      />
      
      <div className="min-h-screen bg-trailflow-dark polymer-dark-section">
        <div className="container-editorial py-16 lg:py-24">
          <div className="max-w-2xl mx-auto">
            
            {/* Header Section */}
            <div className="text-center mb-12 lg:mb-16">
              <div className="mb-8">
                <div className="w-16 h-16 mx-auto mb-8 bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-red-400" />
                </div>
                <div className="w-1 h-24 bg-red-500 mx-auto polymer-editorial-line"></div>
              </div>
              
              <h1 className="polymer-heading-md text-trailflow-white mb-6">
                Sistema Administrativo
              </h1>
              
              <p className="polymer-body-large text-trailflow-white/70 max-w-lg mx-auto leading-relaxed">
                Acesso restrito para administradores. Gerencie usuários, eventos, configurações e monitore o sistema.
              </p>
            </div>
            
            {/* Alert Messages */}
            {searchParams.get('message') === 'password_reset_success' && (
              <div className="mb-8 p-4 bg-green-500/10 border-l-4 border-green-400">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span className="polymer-body text-green-300">
                    Senha redefinida com sucesso! Faça login com sua nova senha.
                  </span>
                </div>
              </div>
            )}
            
            {searchParams.get('error') === 'invalid_reset_link' && (
              <div className="mb-8 p-4 bg-red-500/10 border-l-4 border-red-400">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
                  <span className="polymer-body text-red-300">
                    Link de redefinição inválido ou expirado.
                  </span>
                </div>
              </div>
            )}
            
            {/* Form Container */}
            <div className="bg-trailflow-dark border border-red-500/20 rounded-none p-8 lg:p-12">
              
              {/* Social Auth Buttons */}
              <div className="mb-8">
                <SocialAuthButtons mode="signin" />
              </div>
              
              {/* Login Form */}
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="form-floating">
                  <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@sistema.com"
                    className="w-full h-14 px-4 border-0 border-b-2 border-red-500/30 rounded-none bg-transparent text-trailflow-white placeholder:text-trailflow-white/50 focus:border-red-400 focus:ring-0 polymer-body transition-all duration-300"
                    required
                    disabled={isLoading}
                  />
                  <Label 
                    htmlFor="email" 
                    className="polymer-specs text-trailflow-white/70 uppercase tracking-wider"
                  >
                    Email administrativo
                  </Label>
                </div>
                
                <div className="form-floating">
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full h-14 px-4 pr-12 border-0 border-b-2 border-red-500/30 rounded-none bg-transparent text-trailflow-white placeholder:text-trailflow-white/50 focus:border-red-400 focus:ring-0 polymer-body transition-all duration-300"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 p-3 text-trailflow-white/70 hover:text-red-400 transition-colors duration-300"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <Label 
                    htmlFor="password" 
                    className="polymer-specs text-trailflow-white/70 uppercase tracking-wider"
                  >
                    Senha de acesso
                  </Label>
                </div>
                
                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="polymer-specs text-trailflow-white/70 hover:text-red-400 transition-colors duration-300 uppercase tracking-wider"
                    disabled={isLoading}
                  >
                    Esqueceu a senha?
                  </button>
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full h-14 polymer-btn bg-red-500 text-trailflow-white hover:bg-red-600 border-0 rounded-none uppercase tracking-wider font-light text-sm transition-all duration-300 hover:scale-[1.02]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <span className="animate-spin mr-3 w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                        Processando...
                      </span>
                    ) : 'Acessar Sistema'}
                  </Button>
                </div>
              </form>
              
              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-red-500/20">
                <div className="text-center">
                  <p className="polymer-specs text-trailflow-white/50 uppercase tracking-wider text-xs">
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
