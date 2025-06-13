
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTopButton from '@/components/BackToTopButton';
import { PersonalInfoCard } from '@/components/profile/PersonalInfoCard';
import { PreferencesCard } from '@/components/profile/PreferencesCard';
import { SecurityCard } from '@/components/profile/SecurityCard';
import { Button } from '@/components/ui/button';
import { LogOut, Calendar } from 'lucide-react';

const Perfil = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { profile, isLoading, isUpdating, updateProfile, updatePreferences, updatePassword } = useProfile();

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/perfil' } } });
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-trailflow-green mx-auto mb-4"></div>
            <p>Verificando autenticação...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isLoading || !profile) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-trailflow-green mx-auto mb-4"></div>
            <p>Carregando perfil...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatCreatedDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch {
      return 'Data não disponível';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-trailflow-accent/10 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-trailflow-dark mb-2">
              Meu Perfil
            </h1>
            <p className="text-trailflow-dark/70">
              Gerencie suas informações pessoais, preferências e configurações de segurança
            </p>
          </div>

          {/* Cards Grid */}
          <div className="space-y-8">
            {/* Card 1: Informações Pessoais */}
            <PersonalInfoCard
              profile={profile}
              isUpdating={isUpdating}
              onUpdate={updateProfile}
            />

            {/* Card 2: Preferências e Marketing */}
            <PreferencesCard
              profile={profile}
              isUpdating={isUpdating}
              onUpdate={updatePreferences}
            />

            {/* Card 3: Segurança */}
            <SecurityCard
              isUpdating={isUpdating}
              onUpdatePassword={updatePassword}
            />
          </div>

          {/* Footer Info */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              {/* Account creation date */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar size={16} />
                <span>Conta criada em: {formatCreatedDate(profile.createdAt)}</span>
              </div>

              {/* Logout button */}
              <Button
                onClick={handleLogout}
                variant="outline"
                className="flex items-center gap-2"
              >
                <LogOut size={16} />
                Sair da conta
              </Button>
            </div>
          </div>
        </div>
      </main>

      <BackToTopButton />
      <Footer />
    </div>
  );
};

export default Perfil;
