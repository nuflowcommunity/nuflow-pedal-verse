
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface PartnerEvent {
  id: string;
  title: string;
  date: string;
  city: string;
  location: string;
  registrations_count: number;
  status: string;
}

interface PartnerSale {
  id: string;
  buyer_name: string;
  event_title: string;
  purchase_date: string;
  amount: number;
  status: string;
}

interface PartnerStats {
  total_events: number;
  total_sales: number;
  total_revenue: number;
  last_access: string;
}

export const useParceiroData = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<PartnerEvent[]>([]);
  const [sales, setSales] = useState<PartnerSale[]>([]);
  const [stats, setStats] = useState<PartnerStats>({
    total_events: 0,
    total_sales: 0,
    total_revenue: 0,
    last_access: new Date().toISOString()
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPartnerEvents = async () => {
    if (!user?.id) return;

    try {
      const { data, error } = await supabase
        .from('events')
        .select(`
          id,
          title,
          date,
          city,
          location,
          status,
          event_registrations(count)
        `)
        .eq('created_by', user.id)
        .order('date', { ascending: false });

      if (error) throw error;

      const formattedEvents = data?.map(event => ({
        id: event.id,
        title: event.title,
        date: event.date,
        city: event.city || '',
        location: event.location,
        registrations_count: event.event_registrations?.[0]?.count || 0,
        status: event.status
      })) || [];

      setEvents(formattedEvents);
    } catch (err: any) {
      console.error('Error fetching partner events:', err);
      setError('Erro ao carregar eventos');
    }
  };

  const fetchPartnerSales = async () => {
    if (!user?.id) return;

    try {
      // First get partner events
      const { data: partnerEvents, error: eventsError } = await supabase
        .from('events')
        .select('id')
        .eq('created_by', user.id);

      if (eventsError) throw eventsError;

      const eventIds = partnerEvents?.map(event => event.id) || [];

      if (eventIds.length === 0) {
        setSales([]);
        return;
      }

      // Then get registrations for those events
      const { data: registrations, error: salesError } = await supabase
        .from('event_registrations')
        .select(`
          id,
          created_at,
          payment_status,
          events(title, price),
          profiles(first_name, last_name)
        `)
        .in('event_id', eventIds)
        .order('created_at', { ascending: false });

      if (salesError) throw salesError;

      const formattedSales = registrations?.map(reg => ({
        id: reg.id,
        buyer_name: `${reg.profiles?.first_name || ''} ${reg.profiles?.last_name || ''}`.trim() || 'N/A',
        event_title: reg.events?.title || '',
        purchase_date: reg.created_at,
        amount: reg.events?.price || 0,
        status: reg.payment_status || 'pending'
      })) || [];

      setSales(formattedSales);
    } catch (err: any) {
      console.error('Error fetching partner sales:', err);
      setError('Erro ao carregar vendas');
    }
  };

  const calculateStats = () => {
    const activeEvents = events.filter(event => event.status === 'active').length;
    const totalSales = sales.length;
    const totalRevenue = sales
      .filter(sale => sale.status === 'paid')
      .reduce((sum, sale) => sum + sale.amount, 0);

    setStats({
      total_events: activeEvents,
      total_sales: totalSales,
      total_revenue: totalRevenue,
      last_access: new Date().toISOString()
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;

      setIsLoading(true);
      setError(null);

      try {
        await Promise.all([
          fetchPartnerEvents(),
          fetchPartnerSales()
        ]);
      } catch (err: any) {
        console.error('Error fetching partner data:', err);
        toast({
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar os dados do parceiro.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user?.id]);

  useEffect(() => {
    if (events.length > 0 || sales.length > 0) {
      calculateStats();
    }
  }, [events, sales]);

  return {
    events,
    sales,
    stats,
    isLoading,
    error,
    refetch: () => {
      fetchPartnerEvents();
      fetchPartnerSales();
    }
  };
};
