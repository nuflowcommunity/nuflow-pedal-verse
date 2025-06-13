
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useParceiroData } from '@/hooks/useParceiroData';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import MeusEventosCard from '@/components/parceiro/MeusEventosCard';
import VendasCard from '@/components/parceiro/VendasCard';
import ResumoCard from '@/components/parceiro/ResumoCard';

const Parceiro = () => {
  const { user, userRole, isLoading: authLoading } = useAuth();
  const { events, sales, stats, isLoading: dataLoading, error } = useParceiroData();
  const navigate = useNavigate();

  // Check if user is a partner
  if (authLoading) {
    return (
      <div className="min-h-screen bg-trailflow-medium flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-trailflow-green mx-auto"></div>
          <p className="text-trailflow-lighter">Verificando acesso...</p>
        </div>
      </div>
    );
  }

  if (!user || userRole !== 'partner') {
    return <Navigate to="/unauthorized" replace />;
  }

  // Show welcome toast on first visit
  useEffect(() => {
    const hasShownWelcome = localStorage.getItem('partner-welcome-shown');
    if (!hasShownWelcome && user) {
      toast({
        title: "Bem-vindo à Área do Parceiro!",
        description: "Gerencie seus eventos e acompanhe suas vendas.",
      });
      localStorage.setItem('partner-welcome-shown', 'true');
    }
  }, [user]);

  const getUserDisplayName = () => {
    if (user?.user_metadata?.display_name) return user.user_metadata.display_name;
    if (user?.user_metadata?.full_name) return user.user_metadata.full_name;
    if (user?.email) return user.email.split('@')[0];
    return 'Parceiro';
  };

  const handleCreateEvent = () => {
    navigate('/criar-evento');
  };

  if (error) {
    return (
      <div className="min-h-screen bg-trailflow-medium flex items-center justify-center">
        <Card className="w-full max-w-md bg-trailflow-white border-trailflow-lighter/20">
          <CardContent className="p-6 text-center space-y-4">
            <div className="text-red-500 text-4xl">⚠️</div>
            <p className="text-trailflow-dark">{error}</p>
            <Button 
              onClick={() => window.location.reload()}
              className="bg-trailflow-green hover:bg-trailflow-green-dark text-white"
            >
              Tentar novamente
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-trailflow-medium">
      {/* Header */}
      <div className="bg-trailflow-white border-b border-trailflow-lighter/20 shadow-sm">
        <div className="container-modern py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-trailflow-dark">Área do Parceiro</h1>
              <p className="text-trailflow-medium">
                Olá, <span className="font-medium text-trailflow-dark">{getUserDisplayName()}</span>
              </p>
            </div>
            <Button 
              onClick={handleCreateEvent}
              className="bg-trailflow-green hover:bg-trailflow-green-dark text-white hover:shadow-lg transition-all duration-200"
            >
              Criar novo evento
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-modern py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Resumo Card - Sidebar */}
          <div className="lg:col-span-1 order-1 lg:order-3">
            <ResumoCard 
              stats={stats} 
              isLoading={dataLoading} 
            />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 order-2 lg:order-1 space-y-6">
            {/* Meus Eventos Card */}
            <MeusEventosCard 
              events={events} 
              isLoading={dataLoading} 
            />

            {/* Vendas Card */}
            <VendasCard 
              sales={sales} 
              isLoading={dataLoading} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parceiro;
