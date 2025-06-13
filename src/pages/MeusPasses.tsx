
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { usePassesData } from '@/hooks/usePassesData';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PassCard } from '@/components/passes/PassCard';
import { PassDetailsModal } from '@/components/passes/PassDetailsModal';
import { PassSearch } from '@/components/passes/PassSearch';
import { PassEmptyState } from '@/components/passes/PassEmptyState';
import { Pass } from '@/types/passes';
import BackToTopButton from '@/components/BackToTopButton';

const MeusPasses = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { filteredPasses, searchQuery, setSearchQuery, stats } = usePassesData();
  
  const [selectedPass, setSelectedPass] = useState<Pass | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoadingPasses, setIsLoadingPasses] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/meus-passes' } } });
      return;
    }
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoadingPasses(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [user, navigate]);

  const openPassDetails = (pass: Pass) => {
    setSelectedPass(pass);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPass(null);
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-trailflow-accent/10 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-trailflow-dark mb-2">Meus Passes</h1>
            <p className="text-trailflow-dark/70">Visualize e gerencie todos os seus passes adquiridos</p>
          </div>

          {/* Search */}
          <div className="mb-6">
            <PassSearch 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              isLoading={isLoadingPasses}
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-trailflow-green">{stats.total}</div>
              <div className="text-sm text-gray-600">Total de Passes</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-blue-600">{stats.futuros}</div>
              <div className="text-sm text-gray-600">Passes Futuros</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-gray-600">{stats.usados}</div>
              <div className="text-sm text-gray-600">Passes Usados</div>
            </div>
          </div>

          {/* Loading State */}
          {isLoadingPasses ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-trailflow-green mx-auto mb-4"></div>
              <p>Carregando seus passes...</p>
            </div>
          ) : (
            <>
              {/* Error State */}
              {errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 text-red-600">
                    <span className="text-sm">{errorMessage}</span>
                  </div>
                </div>
              )}

              {/* Passes Grid */}
              {filteredPasses.length === 0 ? (
                <PassEmptyState searchQuery={searchQuery} />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPasses.map((pass) => (
                    <PassCard
                      key={pass.id}
                      pass={pass}
                      onViewDetails={openPassDetails}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Pass Details Modal */}
      {showModal && selectedPass && (
        <PassDetailsModal
          pass={selectedPass}
          isOpen={showModal}
          onClose={closeModal}
        />
      )}

      <BackToTopButton />
      <Footer />
    </div>
  );
};

export default MeusPasses;
