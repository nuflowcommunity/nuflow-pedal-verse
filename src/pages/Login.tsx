
import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import SEOHead from '@/components/seo/SEOHead';
import SocialAuthButtons from '@/components/auth/SocialAuthButtons';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import LoginAlerts from '@/components/auth/LoginAlerts';
import LoginHeader from '@/components/auth/LoginHeader';
import LoginForm from '@/components/auth/LoginForm';
import LoginFooter from '@/components/auth/LoginFooter';
import { ArrowLeft } from 'lucide-react';

const Login = () => {
  const [searchParams] = useSearchParams();
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { isLoading } = useAuth();
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
                  userType="user"
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
        title="Entrar - TrailFlow"
        description="Faça login na sua conta TrailFlow para acessar eventos de ciclismo, marketplace e comunidade."
        keywords={['login', 'entrar', 'conta', 'autenticação', 'ciclismo']}
        url="/login"
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
            
            {/* Alert Messages */}
            <LoginAlerts />
            
            {/* Main Form Card */}
            <div className="bg-white shadow-sm border border-gray-200 p-8">
              
              {/* Header */}
              <LoginHeader />
              
              {/* Social Auth Buttons */}
              <div className="mb-8">
                <SocialAuthButtons mode="signin" />
              </div>
              
              {/* Login Form */}
              <LoginForm onForgotPassword={() => setShowForgotPassword(true)} />
              
              {/* Footer */}
              <LoginFooter />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
