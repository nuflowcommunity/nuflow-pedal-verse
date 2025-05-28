
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePasswordReset } from '@/hooks/usePasswordReset';
import { Eye, EyeOff, Lock, Loader2, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/seo/SEOHead';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);
  const { isLoading, resetPassword } = usePasswordReset();

  const accessToken = searchParams.get('access_token');
  const refreshToken = searchParams.get('refresh_token');

  useEffect(() => {
    if (!accessToken || !refreshToken) {
      navigate('/login?error=invalid_reset_link');
    }
  }, [accessToken, refreshToken, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return;
    }

    if (password.length < 6) {
      return;
    }

    if (!accessToken) {
      return;
    }

    const success = await resetPassword(password, accessToken);
    if (success) {
      setPasswordReset(true);
      setTimeout(() => {
        navigate('/login?message=password_reset_success');
      }, 3000);
    }
  };

  const getPasswordStrength = (password: string) => {
    if (password.length < 6) return { strength: 'weak', color: 'bg-red-500', text: 'Muito fraca' };
    if (password.length < 8) return { strength: 'medium', color: 'bg-yellow-500', text: 'Média' };
    if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)) {
      return { strength: 'strong', color: 'bg-green-500', text: 'Forte' };
    }
    return { strength: 'medium', color: 'bg-yellow-500', text: 'Média' };
  };

  const passwordStrength = getPasswordStrength(password);
  const isValidPassword = password.length >= 6;
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;

  if (passwordReset) {
    return (
      <>
        <SEOHead
          title="Senha redefinida com sucesso"
          description="Sua senha foi redefinida com sucesso."
          noIndex={true}
        />
        
        <div className="min-h-screen flex flex-col">
          <Navbar />
          
          <main className="flex-grow flex items-center justify-center py-16 bg-nuflow-sand">
            <div className="container-custom">
              <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md text-center space-y-6">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h1 className="text-2xl font-heading font-bold text-nuflow-charcoal">
                    Senha redefinida!
                  </h1>
                  <p className="text-sm text-nuflow-charcoal/70">
                    Sua senha foi redefinida com sucesso. Você será redirecionado para a página de login em alguns segundos.
                  </p>
                </div>
                
                <Button
                  onClick={() => navigate('/login')}
                  className="w-full bg-nuflow-forest text-white hover:bg-nuflow-darkForest"
                >
                  Ir para o login
                </Button>
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
        title="Redefinir senha"
        description="Redefina sua senha para acessar sua conta."
        noIndex={true}
      />
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow flex items-center justify-center py-16 bg-nuflow-sand">
          <div className="container-custom">
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
              <div className="text-center space-y-2 mb-6">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-nuflow-emerald/10 rounded-full flex items-center justify-center">
                    <Lock className="w-8 h-8 text-nuflow-forest" />
                  </div>
                </div>
                <h1 className="text-2xl font-heading font-bold text-nuflow-charcoal">
                  Redefinir senha
                </h1>
                <p className="text-sm text-nuflow-charcoal/70">
                  Digite sua nova senha abaixo.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-nuflow-charcoal">
                    Nova senha
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
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
                  
                  {password && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-nuflow-charcoal/70">Força da senha:</span>
                        <span className={`font-medium ${
                          passwordStrength.strength === 'strong' ? 'text-green-600' :
                          passwordStrength.strength === 'medium' ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {passwordStrength.text}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div 
                          className={`h-1 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                          style={{ 
                            width: passwordStrength.strength === 'strong' ? '100%' : 
                                   passwordStrength.strength === 'medium' ? '60%' : '30%' 
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-nuflow-charcoal">
                    Confirmar nova senha
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full p-3 pr-10 border border-nuflow-mineral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-nuflow-forest"
                      placeholder="••••••••"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-nuflow-charcoal/50 hover:text-nuflow-charcoal"
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  
                  {confirmPassword && (
                    <div className="flex items-center space-x-1 text-xs">
                      {passwordsMatch ? (
                        <>
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span className="text-green-600">As senhas coincidem</span>
                        </>
                      ) : (
                        <span className="text-red-600">As senhas não coincidem</span>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="text-xs text-nuflow-charcoal/60 space-y-1">
                  <p>Sua senha deve ter:</p>
                  <ul className="list-disc list-inside space-y-0.5 ml-2">
                    <li className={isValidPassword ? 'text-green-600' : ''}>
                      Pelo menos 6 caracteres
                    </li>
                    <li>Recomendado: letras maiúsculas, minúsculas e números</li>
                  </ul>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-nuflow-forest text-white hover:bg-nuflow-darkForest"
                  disabled={isLoading || !isValidPassword || !passwordsMatch}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Redefinindo...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Redefinir senha
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default ResetPassword;
