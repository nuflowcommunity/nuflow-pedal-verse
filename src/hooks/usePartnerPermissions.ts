
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface PartnerPermission {
  id: string;
  partner_id: string;
  function_type: 'creditos' | 'day_use' | 'assinaturas' | 'eventos';
  is_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export const usePartnerPermissions = () => {
  const [permissions, setPermissions] = useState<PartnerPermission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchPermissions = async () => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // Primeiro, buscar o parceiro pelo email
      const { data: partnerData, error: partnerError } = await supabase
        .from('partners')
        .select('id')
        .eq('email', user.email)
        .single();

      if (partnerError) {
        console.error('Error fetching partner:', partnerError);
        setError('Parceiro não encontrado');
        return;
      }

      // Buscar as permissões do parceiro
      const { data, error } = await supabase
        .from('partner_permissions')
        .select('*')
        .eq('partner_id', partnerData.id)
        .eq('is_enabled', true);

      if (error) {
        console.error('Error fetching permissions:', error);
        setError('Erro ao carregar permissões');
        return;
      }

      setPermissions(data || []);
      setError(null);
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('Erro inesperado');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, [user?.email]);

  const hasPermission = (functionType: string) => {
    return permissions.some(p => p.function_type === functionType && p.is_enabled);
  };

  const getEnabledFunctions = () => {
    return permissions
      .filter(p => p.is_enabled)
      .map(p => p.function_type);
  };

  return {
    permissions,
    loading,
    error,
    hasPermission,
    getEnabledFunctions,
    refetch: fetchPermissions
  };
};
