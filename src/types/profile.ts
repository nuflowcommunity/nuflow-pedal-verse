
export interface UserProfile {
  id: string;
  name: string;
  displayName?: string;
  email: string;
  phone: string;
  birthDate: string;
  city: string;
  state: string;
  gender?: 'feminino' | 'masculino' | 'nao-binario' | 'prefere-nao-dizer';
  documentId: string; // CPF
  avatarUrl?: string;
  allowMarketing: boolean;
  preferredContact: string[]; // ['email', 'whatsapp', 'sms']
  preferredLanguage: 'pt' | 'en';
  createdAt: string;
}

export interface ProfileUpdateData {
  name: string;
  displayName?: string;
  phone: string;
  birthDate: string;
  city: string;
  state: string;
  gender?: 'feminino' | 'masculino' | 'nao-binario' | 'prefere-nao-dizer';
  documentId: string;
  avatarUrl?: string;
}

export interface PreferencesUpdateData {
  allowMarketing: boolean;
  preferredContact: string[];
  preferredLanguage: 'pt' | 'en';
}

export interface PasswordUpdateData {
  newPassword: string;
  confirmPassword: string;
}
