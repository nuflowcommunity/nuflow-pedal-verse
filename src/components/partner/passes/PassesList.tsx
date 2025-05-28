
import React from 'react';
import { Pass } from '@/types/passes';
import { PassCard } from './PassCard';

interface PassesListProps {
  passes: Pass[];
  title: string;
  emptyMessage: string;
}

export const PassesList: React.FC<PassesListProps> = ({ passes, title, emptyMessage }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {title} ({passes.length})
        </h3>
      </div>
      
      {passes.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-4">📝</div>
          <p className="text-lg">{emptyMessage}</p>
          <p className="text-sm mt-2">Os passes aparecerão aqui conforme forem vendidos</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {passes.map((pass) => (
            <PassCard key={pass.id} pass={pass} />
          ))}
        </div>
      )}
    </div>
  );
};
