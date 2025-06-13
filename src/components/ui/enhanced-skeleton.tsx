
import React from 'react';
import { Skeleton } from './skeleton';

export const EventCardSkeleton = () => {
  return (
    <div className="bg-white shadow-sm border border-gray-100 rounded-lg overflow-hidden">
      <Skeleton className="aspect-[4/3] w-full" />
      <div className="p-6 text-center space-y-3">
        <Skeleton className="h-4 w-3/4 mx-auto" />
        <Skeleton className="h-3 w-1/2 mx-auto" />
        <Skeleton className="h-3 w-2/3 mx-auto" />
        <Skeleton className="h-4 w-1/3 mx-auto" />
      </div>
    </div>
  );
};
