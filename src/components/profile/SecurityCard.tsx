
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield } from 'lucide-react';
import { PasswordUpdateData } from '@/types/profile';

interface SecurityCardProps {
  isUpdating: boolean;
  onUpdatePassword: (data: PasswordUpdateData) => void;
}

export const SecurityCard: React.FC<SecurityCardProps> = ({
  isUpdating,
  onUpdatePassword
}) => {
  const [formData, setFormData] = useState<PasswordUpdateData>({
    newPassword: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePassword(formData);
    // Clear form after submission
    setFormData({ newPassword: '', confirmPassword: '' });
  };

  const passwordsMatch = formData.newPassword === formData.confirmPassword;
  const isFormValid = formData.newPassword.length >= 6 && passwordsMatch;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-trailflow-dark">
          <Shield size={20} />
          Segurança
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="newPassword">Nova senha</Label>
            <Input
              id="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
              placeholder="Mínimo 6 caracteres"
              minLength={6}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              placeholder="Digite a senha novamente"
              required
              className={
                formData.confirmPassword && !passwordsMatch 
                  ? 'border-red-500 focus:border-red-500' 
                  : ''
              }
            />
            {formData.confirmPassword && !passwordsMatch && (
              <p className="text-sm text-red-600">As senhas não coincidem</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full bg-trailflow-green hover:bg-trailflow-green-dark"
            disabled={isUpdating || !isFormValid}
          >
            {isUpdating ? 'Atualizando...' : 'Atualizar senha'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
