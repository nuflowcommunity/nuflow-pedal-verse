
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePasswordReset } from '@/hooks/usePasswordReset';
import { Mail, ArrowLeft, Loader2, AlertCircle, CheckCircle, Eye } from 'lucide-react';

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
  userType?: 'admin' | 'partner' | 'user';
  title?: string;
  description?: string;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ 
  onBackToLogin, 
  userType = 'user',
  title,
  description
}) => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const { isLoading, error, requestPasswordReset, validateEmail, clearError } = usePasswordReset();

  const isEmailValid = validateEmail(email);
  const showEmailError = emailTouched && email && !isEmailValid;

  useEffect(() => {
    if (error) {
      const timer = setTimeout(clearError, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setEmailTouched(true);
      return;
    }

    if (!isEmailValid) {
      return;
    }

    const success = await requestPasswordReset(email, userType);
    if (success) {
      setEmailSent(true);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) clearError();
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
  };

  const getUserTypeConfig = () => {
    const configs = {
      admin: {
        label: 'Administrador',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200'
      },
      partner: {
        label: 'Parceiro',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200'
      },
      user: {
        label: 'Usuário',
        color: 'text-nuflow-forest',
        bgColor: 'bg-nuflow-mint',
        borderColor: 'border-nuflow-emerald'
      }
    };
    return configs[userType];
  };

  const config = getUserTypeConfig();

  if (emailSent) {
    return (
      <div className="space-y-6 text-center animate-fade-in">
        <div className="flex justify-center">
          <div className={`w-16 h-16 ${config.bgColor} rounded-full flex items-center justify-center`}>
            <CheckCircle className={`w-8 h-8 ${config.color}`} />
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-xl font-heading font-bold text-nuflow-charcoal">
            Email enviado!
          </h2>
          <p className="text-sm text-nuflow-charcoal/70">
            Se o email <span className="font-medium">{email}</span> existir como {config.label.toLowerCase()} em nossa base, 
            você receberá instruções para redefinir sua senha.
          </p>
          <p className="text-xs text-nuflow-charcoal/50 mt-2">
            Verifique também sua caixa de spam
          </p>
        </div>
        
        <div className="space-y-3">
          <Button
            onClick={onBackToLogin}
            variant="outline"
            className="w-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao login
          </Button>
          
          <Button
            onClick={() => setEmailSent(false)}
            variant="ghost"
            className="w-full text-sm"
          >
            Tentar com outro email
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-heading font-bold text-nuflow-charcoal">
          {title || 'Recuperar senha'}
        </h2>
        {userType !== 'user' && (
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.color} ${config.borderColor} border`}>
            <Eye className="w-3 h-3 mr-1" />
            {config.label}
          </div>
        )}
        <p className="text-sm text-nuflow-charcoal/70">
          {description || `Digite seu email para receber instruções de recuperação de senha${userType !== 'user' ? ` para ${config.label.toLowerCase()}` : ''}.`}
        </p>
      </div>

      {error && (
        <div className={`p-3 rounded-md border animate-fade-in ${
          error.type === 'rate_limit' ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-start space-x-2">
            <AlertCircle className={`w-4 h-4 mt-0.5 ${
              error.type === 'rate_limit' ? 'text-yellow-600' : 'text-red-600'
            }`} />
            <span className={`text-sm ${
              error.type === 'rate_limit' ? 'text-yellow-800' : 'text-red-800'
            }`}>
              {error.message}
            </span>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="reset-email" className="text-sm font-medium text-nuflow-charcoal">
            Email
          </Label>
          <div className="relative">
            <Input
              id="reset-email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                showEmailError 
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                  : isEmailValid && email 
                    ? 'border-green-300 focus:ring-nuflow-forest focus:border-nuflow-forest'
                    : 'border-nuflow-mineral/30 focus:ring-nuflow-forest focus:border-nuflow-forest'
              }`}
              placeholder="seu@email.com"
              required
              disabled={isLoading}
              aria-describedby={showEmailError ? "email-error" : undefined}
            />
            {email && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {isEmailValid ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : emailTouched ? (
                  <AlertCircle className="w-4 h-4 text-red-500" />
                ) : null}
              </div>
            )}
          </div>
          
          {showEmailError && (
            <p id="email-error" className="text-sm text-red-600 flex items-center space-x-1 animate-fade-in">
              <AlertCircle className="w-3 h-3" />
              <span>Por favor, digite um email válido</span>
            </p>
          )}
        </div>
        
        <div className="space-y-3">
          <Button 
            type="submit" 
            className={`w-full text-white transition-all ${
              userType === 'admin' ? 'bg-red-600 hover:bg-red-700' :
              userType === 'partner' ? 'bg-blue-600 hover:bg-blue-700' :
              'bg-nuflow-forest hover:bg-nuflow-darkForest'
            }`}
            disabled={isLoading || !email.trim() || !isEmailValid}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" />
                Enviar instruções
              </>
            )}
          </Button>
          
          <Button
            type="button"
            onClick={onBackToLogin}
            variant="outline"
            className="w-full"
            disabled={isLoading}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
