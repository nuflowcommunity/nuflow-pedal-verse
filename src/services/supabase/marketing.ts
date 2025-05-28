
import { supabase } from '@/integrations/supabase/client';

// Buscar estatísticas de marketing
export const fetchMarketingStats = async () => {
  try {
    const { data, error } = await supabase.rpc('get_marketing_stats');

    if (error) {
      console.error('Error fetching marketing stats:', error);
      return {
        totalCampaigns: 0,
        activeCampaigns: 0,
        totalBudget: 0,
        totalSpent: 0,
        totalImpressions: 0,
        totalClicks: 0,
        totalConversions: 0,
        averageCpc: 0,
        conversionRate: 0,
      };
    }

    const stats = data?.[0] || {
      total_campaigns: 0,
      active_campaigns: 0,
      total_budget: 0,
      total_spent: 0,
      total_impressions: 0,
      total_clicks: 0,
      total_conversions: 0,
    };

    const totalClicks = Number(stats.total_clicks || 0);
    const totalConversions = Number(stats.total_conversions || 0);
    const totalSpent = Number(stats.total_spent || 0);

    return {
      totalCampaigns: Number(stats.total_campaigns || 0),
      activeCampaigns: Number(stats.active_campaigns || 0),
      totalBudget: Number(stats.total_budget || 0),
      totalSpent: totalSpent,
      totalImpressions: Number(stats.total_impressions || 0),
      totalClicks: totalClicks,
      totalConversions: totalConversions,
      averageCpc: totalClicks > 0 ? totalSpent / totalClicks : 0,
      conversionRate: totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0,
    };
  } catch (error) {
    console.error('Unexpected error fetching marketing stats:', error);
    return {
      totalCampaigns: 0,
      activeCampaigns: 0,
      totalBudget: 0,
      totalSpent: 0,
      totalImpressions: 0,
      totalClicks: 0,
      totalConversions: 0,
      averageCpc: 0,
      conversionRate: 0,
    };
  }
};

// Buscar campanhas de marketing
export const fetchMarketingCampaigns = async () => {
  try {
    const { data, error } = await supabase
      .from('marketing_campaigns')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching marketing campaigns:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching marketing campaigns:', error);
    return [];
  }
};

// Buscar métricas de marketing por período
export const fetchMarketingMetrics = async (days = 30) => {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data, error } = await supabase
      .from('marketing_metrics')
      .select('*')
      .gte('date', startDate.toISOString().split('T')[0])
      .order('date', { ascending: true });

    if (error) {
      console.error('Error fetching marketing metrics:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching marketing metrics:', error);
    return [];
  }
};
