
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
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

  // Check if user is a partner
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-trailflow-green mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando acesso...</p>
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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Tentar novamente
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-trailflow-dark">Área do Parceiro</h1>
              <p className="text-gray-600 mt-1">
                Olá, <span className="font-medium">{getUserDisplayName()}</span>
              </p>
            </div>
            <Button 
              onClick={() => window.location.href = '/criar-evento'}
              className="bg-trailflow-green hover:bg-trailflow-green/90"
            >
              Criar novo evento
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Resumo Card - Top on mobile, right on desktop */}
          <div className="lg:order-3">
            <ResumoCard 
              stats={stats} 
              isLoading={dataLoading} 
            />
          </div>

          {/* Meus Eventos Card */}
          <div className="lg:col-span-2 lg:order-1">
            <MeusEventosCard 
              events={events} 
              isLoading={dataLoading} 
            />
          </div>

          {/* Vendas Card */}
          <div className="lg:col-span-3 lg:order-2">
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
