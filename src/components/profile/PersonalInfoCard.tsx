
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, User } from 'lucide-react';
import { UserProfile, ProfileUpdateData } from '@/types/profile';

interface PersonalInfoCardProps {
  profile: UserProfile;
  isUpdating: boolean;
  onUpdate: (data: ProfileUpdateData) => void;
}

export const PersonalInfoCard: React.FC<PersonalInfoCardProps> = ({
  profile,
  isUpdating,
  onUpdate
}) => {
  const [formData, setFormData] = useState<ProfileUpdateData>({
    name: profile.name,
    displayName: profile.displayName || '',
    phone: profile.phone,
    birthDate: profile.birthDate,
    city: profile.city,
    state: profile.state,
    gender: profile.gender,
    documentId: profile.documentId,
    avatarUrl: profile.avatarUrl
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
  };

  const brazilianStates = [
    { value: 'AC', label: 'Acre' },
    { value: 'AL', label: 'Alagoas' },
    { value: 'AP', label: 'Amapá' },
    { value: 'AM', label: 'Amazonas' },
    { value: 'BA', label: 'Bahia' },
    { value: 'CE', label: 'Ceará' },
    { value: 'DF', label: 'Distrito Federal' },
    { value: 'ES', label: 'Espírito Santo' },
    { value: 'GO', label: 'Goiás' },
    { value: 'MA', label: 'Maranhão' },
    { value: 'MT', label: 'Mato Grosso' },
    { value: 'MS', label: 'Mato Grosso do Sul' },
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'PA', label: 'Pará' },
    { value: 'PB', label: 'Paraíba' },
    { value: 'PR', label: 'Paraná' },
    { value: 'PE', label: 'Pernambuco' },
    { value: 'PI', label: 'Piauí' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'RN', label: 'Rio Grande do Norte' },
    { value: 'RS', label: 'Rio Grande do Sul' },
    { value: 'RO', label: 'Rondônia' },
    { value: 'RR', label: 'Roraima' },
    { value: 'SC', label: 'Santa Catarina' },
    { value: 'SP', label: 'São Paulo' },
    { value: 'SE', label: 'Sergipe' },
    { value: 'TO', label: 'Tocantins' }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-trailflow-dark">
          <User size={20} />
          Informações Pessoais
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={formData.avatarUrl} />
              <AvatarFallback className="bg-trailflow-accent text-trailflow-dark">
                {formData.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Button type="button" variant="outline" size="sm">
              <Camera size={16} className="mr-2" />
              Alterar foto
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nome completo */}
            <div className="space-y-2">
              <Label htmlFor="name" className="required">Nome completo</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>

            {/* Nome social */}
            <div className="space-y-2">
              <Label htmlFor="displayName">Nome social</Label>
              <Input
                id="displayName"
                value={formData.displayName}
                onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                placeholder="Como prefere ser chamado"
              />
            </div>

            {/* E-mail (readonly) */}
            <div className="space-y-2">
              <Label htmlFor="email" className="required">E-mail</Label>
              <Input
                id="email"
                value={profile.email}
                readOnly
                className="bg-gray-50 text-gray-600"
              />
            </div>

            {/* Telefone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="required">Telefone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  phone: formatPhone(e.target.value) 
                }))}
                placeholder="(11) 99999-9999"
                required
              />
            </div>

            {/* Data de nascimento */}
            <div className="space-y-2">
              <Label htmlFor="birthDate" className="required">Data de nascimento</Label>
              <Input
                id="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData(prev => ({ ...prev, birthDate: e.target.value }))}
                required
              />
            </div>

            {/* Gênero */}
            <div className="space-y-2">
              <Label htmlFor="gender">Gênero</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => setFormData(prev => ({ 
                  ...prev, 
                  gender: value as any 
                }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione seu gênero" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="feminino">Feminino</SelectItem>
                  <SelectItem value="masculino">Masculino</SelectItem>
                  <SelectItem value="nao-binario">Não-binário</SelectItem>
                  <SelectItem value="prefere-nao-dizer">Prefere não dizer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Cidade */}
            <div className="space-y-2">
              <Label htmlFor="city" className="required">Cidade</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                required
              />
            </div>

            {/* Estado */}
            <div className="space-y-2">
              <Label htmlFor="state" className="required">Estado</Label>
              <Select
                value={formData.state}
                onValueChange={(value) => setFormData(prev => ({ ...prev, state: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o estado" />
                </SelectTrigger>
                <SelectContent>
                  {brazilianStates.map(state => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* CPF */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="documentId" className="required">CPF</Label>
              <Input
                id="documentId"
                value={formData.documentId}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  documentId: formatCPF(e.target.value) 
                }))}
                placeholder="000.000.000-00"
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-trailflow-green hover:bg-trailflow-green-dark"
            disabled={isUpdating}
          >
            {isUpdating ? 'Salvando...' : 'Salvar dados pessoais'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
