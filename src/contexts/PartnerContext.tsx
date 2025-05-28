
import React, { createContext, useContext, ReactNode } from 'react';
import { usePartnerPermissions } from '@/hooks/usePartnerPermissions';

interface PartnerContextType {
  permissions: any[];
  loading: boolean;
  error: string | null;
  hasPermission: (functionType: string) => boolean;
  getEnabledFunctions: () => string[];
  refetch: () => void;
}

const PartnerContext = createContext<PartnerContextType | undefined>(undefined);

export const PartnerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const partnerData = usePartnerPermissions();

  return (
    <PartnerContext.Provider value={partnerData}>
      {children}
    </PartnerContext.Provider>
  );
};

export const usePartner = () => {
  const context = useContext(PartnerContext);
  if (context === undefined) {
    throw new Error('usePartner must be used within a PartnerProvider');
  }
  return context;
};
