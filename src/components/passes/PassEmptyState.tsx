
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PassEmptyStateProps {
  searchQuery?: string;
}

export const PassEmptyState: React.FC<PassEmptyStateProps> = ({ searchQuery }) => {
  return (
    <div className="text-center py-16">
      <div className="text-6xl mb-6">🎫</div>
      
      {searchQuery ? (
        <>
          <h3 className="text-xl font-semibold text-trailflow-dark mb-2">
            Nenhum passe encontrado
          </h3>
          <p className="text-gray-600 mb-6">
            Não encontramos passes que correspondam à sua busca por "{searchQuery}".
          </p>
        </>
      ) : (
        <>
          <h3 className="text-xl font-semibold text-trailflow-dark mb-2">
            Você ainda não comprou nenhum passe
          </h3>
          <p className="text-gray-600 mb-6">
            Explore nossos eventos e adquira seus primeiros passes para aventuras incríveis!
          </p>
        </>
      )}
      
      <Link to="/eventos">
        <Button className="bg-trailflow-green hover:bg-trailflow-green-dark">
          <Calendar size={18} className="mr-2" />
          Explorar Eventos
          <ArrowRight size={18} className="ml-2" />
        </Button>
      </Link>
    </div>
  );
};
