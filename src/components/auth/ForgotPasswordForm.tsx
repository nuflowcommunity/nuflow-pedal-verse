
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePasswordReset } from '@/hooks/usePasswordReset';
import { Mail, ArrowLeft, Loader2 } from 'lucide-react';

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
  userType?: 'admin' | 'partner' | 'user';
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ 
  onBackToLogin, 
  userType = 'user' 
}) => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const { isLoading, sendResetEmail } = usePasswordReset();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      return;
    }

    const success = await sendResetEmail(email);
    if (success) {
      setEmailSent(true);
    }
  };

  const getUserTypeLabel = () => {
    switch (userType) {
      case 'admin':
        return 'Administrador';
      case 'partner':
        return 'Parceiro';
      default:
        return 'Usuário';
    }
  };

  if (emailSent) {
    return (
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-nuflow-emerald/10 rounded-full flex items-center justify-center">
            <Mail className="w-8 h-8 text-nuflow-forest" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-xl font-heading font-bold text-nuflow-charcoal">
            Email enviado!
          </h2>
          <p className="text-sm text-nuflow-charcoal/70">
            Se o email <span className="font-medium">{email}</span> existir em nossa base, 
            você receberá instruções para redefinir sua senha.
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
          Recuperar senha
        </h2>
        <p className="text-sm text-nuflow-charcoal/70">
          Digite seu email para receber instruções de recuperação de senha para {getUserTypeLabel().toLowerCase()}.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="reset-email" className="text-sm font-medium text-nuflow-charcoal">
            Email
          </Label>
          <Input
            id="reset-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-nuflow-mineral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-nuflow-forest"
            placeholder="seu@email.com"
            required
            disabled={isLoading}
          />
        </div>
        
        <div className="space-y-3">
          <Button 
            type="submit" 
            className="w-full bg-nuflow-forest text-white hover:bg-nuflow-darkForest"
            disabled={isLoading || !email.trim()}
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
