
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
import { Eye, EyeOff, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';

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
        
        <div className="min-h-screen bg-trailflow-white polymer-light-section">
          <div className="container-editorial py-16 lg:py-24">
            <div className="max-w-2xl mx-auto">
              <button
                onClick={() => setShowForgotPassword(false)}
                className="polymer-btn inline-flex items-center mb-8 text-trailflow-medium hover:text-trailflow-green transition-colors duration-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao login
              </button>
              
              <div className="bg-trailflow-white border border-trailflow-light/20 rounded-none p-8 lg:p-12">
                <ForgotPasswordForm 
                  onBackToLogin={() => setShowForgotPassword(false)}
                  userType="partner"
                  title="Recuperar senha - Parceiro"
                  description="Digite seu email de parceiro para receber instruções de recuperação."
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
        title="Portal do Parceiro - Acesso"
        description="Acesse sua conta de parceiro para gerenciar eventos e vendas."
        noIndex={true}
      />
      
      <div className="min-h-screen bg-trailflow-white polymer-light-section">
        <div className="container-editorial py-16 lg:py-24">
          <div className="max-w-2xl mx-auto">
            
            {/* Header Section */}
            <div className="text-center mb-12 lg:mb-16">
              <div className="mb-8">
                <div className="w-1 h-24 bg-trailflow-green mx-auto mb-8 polymer-editorial-line"></div>
              </div>
              
              <h1 className="polymer-heading-md text-trailflow-dark mb-6">
                Portal do Parceiro
              </h1>
              
              <p className="polymer-body-large text-trailflow-medium max-w-lg mx-auto leading-relaxed">
                Acesse sua conta para gerenciar eventos, visualizar vendas e acompanhar o desempenho do seu negócio.
              </p>
            </div>
            
            {/* Alert Messages */}
            {searchParams.get('message') === 'password_reset_success' && (
              <div className="mb-8 p-4 bg-trailflow-accent border-l-4 border-trailflow-green">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-trailflow-green mr-3" />
                  <span className="polymer-body text-trailflow-dark">
                    Senha redefinida com sucesso! Faça login com sua nova senha.
                  </span>
                </div>
              </div>
            )}
            
            {searchParams.get('error') === 'invalid_reset_link' && (
              <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-400">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
                  <span className="polymer-body text-red-800">
                    Link de redefinição inválido ou expirado.
                  </span>
                </div>
              </div>
            )}
            
            {/* Form Container */}
            <div className="bg-trailflow-white border border-trailflow-light/20 rounded-none p-8 lg:p-12">
              
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
                    placeholder="seu.email@empresa.com"
                    className="w-full h-14 px-4 border-0 border-b-2 border-trailflow-light/30 rounded-none bg-transparent focus:border-trailflow-green focus:ring-0 polymer-body transition-all duration-300"
                    required
                    disabled={isLoading}
                  />
                  <Label 
                    htmlFor="email" 
                    className="polymer-specs text-trailflow-medium uppercase tracking-wider"
                  >
                    Email corporativo
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
                      className="w-full h-14 px-4 pr-12 border-0 border-b-2 border-trailflow-light/30 rounded-none bg-transparent focus:border-trailflow-green focus:ring-0 polymer-body transition-all duration-300"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 p-3 text-trailflow-medium hover:text-trailflow-green transition-colors duration-300"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <Label 
                    htmlFor="password" 
                    className="polymer-specs text-trailflow-medium uppercase tracking-wider"
                  >
                    Senha
                  </Label>
                </div>
                
                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="polymer-specs text-trailflow-medium hover:text-trailflow-green transition-colors duration-300 uppercase tracking-wider"
                    disabled={isLoading}
                  >
                    Esqueceu a senha?
                  </button>
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full h-14 polymer-btn bg-trailflow-green text-trailflow-white hover:bg-trailflow-green-dark border-0 rounded-none uppercase tracking-wider font-light text-sm transition-all duration-300 hover:scale-[1.02]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <span className="animate-spin mr-3 w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                        Processando...
                      </span>
                    ) : 'Acessar Portal'}
                  </Button>
                </div>
              </form>
              
              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-trailflow-light/20">
                <div className="text-center">
                  <p className="polymer-specs text-trailflow-medium uppercase tracking-wider">
                    Ainda não é parceiro?{" "}
                    <a 
                      href="#" 
                      className="text-trailflow-green hover:text-trailflow-green-dark transition-colors duration-300"
                    >
                      Torne-se um parceiro
                    </a>
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

export default PartnerLogin;
