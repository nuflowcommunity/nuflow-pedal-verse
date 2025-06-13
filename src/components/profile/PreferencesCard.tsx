
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Settings } from 'lucide-react';
import { UserProfile, PreferencesUpdateData } from '@/types/profile';

interface PreferencesCardProps {
  profile: UserProfile;
  isUpdating: boolean;
  onUpdate: (data: PreferencesUpdateData) => void;
}

export const PreferencesCard: React.FC<PreferencesCardProps> = ({
  profile,
  isUpdating,
  onUpdate
}) => {
  const [formData, setFormData] = useState<PreferencesUpdateData>({
    allowMarketing: profile.allowMarketing,
    preferredContact: profile.preferredContact,
    preferredLanguage: profile.preferredLanguage
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  const handleContactMethodChange = (method: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      preferredContact: checked
        ? [...prev.preferredContact, method]
        : prev.preferredContact.filter(m => m !== method)
    }));
  };

  const contactMethods = [
    { id: 'email', label: 'E-mail' },
    { id: 'whatsapp', label: 'WhatsApp' },
    { id: 'sms', label: 'SMS' }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-trailflow-dark">
          <Settings size={20} />
          Preferências e Marketing
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Marketing */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="allowMarketing"
                checked={formData.allowMarketing}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, allowMarketing: checked as boolean }))
                }
              />
              <Label htmlFor="allowMarketing">
                Gostaria de receber novidades por e-mail?
              </Label>
            </div>
            <p className="text-sm text-gray-600">
              Manteremos você informado sobre eventos, promoções e novidades da plataforma.
            </p>
          </div>

          {/* Meios de contato preferidos */}
          <div className="space-y-3">
            <Label>Meios preferidos de contato</Label>
            <div className="space-y-2">
              {contactMethods.map(method => (
                <div key={method.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={method.id}
                    checked={formData.preferredContact.includes(method.id)}
                    onCheckedChange={(checked) => 
                      handleContactMethodChange(method.id, checked as boolean)
                    }
                  />
                  <Label htmlFor={method.id}>{method.label}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Idioma preferido */}
          <div className="space-y-2">
            <Label htmlFor="preferredLanguage">Idioma preferido</Label>
            <Select
              value={formData.preferredLanguage}
              onValueChange={(value) => setFormData(prev => ({ 
                ...prev, 
                preferredLanguage: value as 'pt' | 'en' 
              }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pt">Português</SelectItem>
                <SelectItem value="en">Inglês</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-trailflow-green hover:bg-trailflow-green-dark"
            disabled={isUpdating}
          >
            {isUpdating ? 'Atualizando...' : 'Atualizar preferências'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
