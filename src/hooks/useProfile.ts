
import { useState, useEffect } from 'react';
import { UserProfile, ProfileUpdateData, PreferencesUpdateData, PasswordUpdateData } from '@/types/profile';
import { useFeedback } from '@/hooks/useFeedback';

export const useProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const { feedback } = useFeedback();

  // Mock data - in real app, this would come from Supabase
  const mockProfile: UserProfile = {
    id: '1',
    name: 'João Silva Santos',
    displayName: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 99999-9999',
    birthDate: '1990-05-15',
    city: 'São Paulo',
    state: 'SP',
    gender: 'masculino',
    documentId: '123.456.789-10',
    avatarUrl: '',
    allowMarketing: true,
    preferredContact: ['email', 'whatsapp'],
    preferredLanguage: 'pt',
    createdAt: '2023-01-15T10:30:00Z'
  };

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setProfile(mockProfile);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const updateProfile = async (data: ProfileUpdateData) => {
    setIsUpdating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setProfile(prev => prev ? { ...prev, ...data } : null);
      feedback.updateSuccess('Dados pessoais');
    } catch (error) {
      feedback.updateError('dados pessoais');
    } finally {
      setIsUpdating(false);
    }
  };

  const updatePreferences = async (data: PreferencesUpdateData) => {
    setIsUpdating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProfile(prev => prev ? { ...prev, ...data } : null);
      feedback.updateSuccess('Preferências');
    } catch (error) {
      feedback.updateError('preferências');
    } finally {
      setIsUpdating(false);
    }
  };

  const updatePassword = async (data: PasswordUpdateData) => {
    if (data.newPassword !== data.confirmPassword) {
      feedback.validationError('confirmação de senha');
      return;
    }

    if (data.newPassword.length < 6) {
      feedback.validationError('senha (mínimo 6 caracteres)');
      return;
    }

    setIsUpdating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      feedback.updateSuccess('Senha');
    } catch (error) {
      feedback.updateError('senha');
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    profile,
    isLoading,
    isUpdating,
    updateProfile,
    updatePreferences,
    updatePassword
  };
};
