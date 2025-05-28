
import { supabase } from '@/integrations/supabase/client';

// Buscar transações financeiras
export const fetchFinancialTransactions = async () => {
  try {
    const { data, error } = await supabase
      .from('financial_transactions')
      .select(`
        *,
        entities(name, type),
        partners(name)
      `)
      .order('date', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Error fetching financial transactions:', error);
      return [];
    }

    return data?.map((transaction: any) => ({
      id: transaction.id,
      type: transaction.type,
      category: transaction.category || 'Geral',
      description: transaction.description,
      amount: Number(transaction.amount),
      date: transaction.date,
      entityName: transaction.entities?.name || 'N/A',
      partnerName: transaction.partners?.name || 'N/A',
      createdAt: transaction.created_at,
    })) || [];
  } catch (error) {
    console.error('Unexpected error fetching financial transactions:', error);
    return [];
  }
};

// Buscar resumo financeiro
export const fetchFinancialSummary = async () => {
  try {
    const { data: transactions, error } = await supabase
      .from('financial_transactions')
      .select('type, amount, date');

    if (error) {
      console.error('Error fetching financial summary:', error);
      return {
        totalIncome: 0,
        totalExpenses: 0,
        netProfit: 0,
        monthlyIncome: 0,
        monthlyExpenses: 0,
        monthlyProfit: 0,
      };
    }

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    let totalIncome = 0;
    let totalExpenses = 0;
    let monthlyIncome = 0;
    let monthlyExpenses = 0;

    transactions?.forEach((transaction: any) => {
      const amount = Number(transaction.amount);
      const transactionDate = new Date(transaction.date);
      const isCurrentMonth = transactionDate.getMonth() === currentMonth && 
                            transactionDate.getFullYear() === currentYear;

      if (transaction.type === 'receita') {
        totalIncome += amount;
        if (isCurrentMonth) monthlyIncome += amount;
      } else if (transaction.type === 'despesa') {
        totalExpenses += amount;
        if (isCurrentMonth) monthlyExpenses += amount;
      }
    });

    return {
      totalIncome,
      totalExpenses,
      netProfit: totalIncome - totalExpenses,
      monthlyIncome,
      monthlyExpenses,
      monthlyProfit: monthlyIncome - monthlyExpenses,
    };
  } catch (error) {
    console.error('Unexpected error fetching financial summary:', error);
    return {
      totalIncome: 0,
      totalExpenses: 0,
      netProfit: 0,
      monthlyIncome: 0,
      monthlyExpenses: 0,
      monthlyProfit: 0,
    };
  }
};

// Buscar contas financeiras
export const fetchFinancialAccounts = async () => {
  try {
    const { data, error } = await supabase
      .from('financial_accounts')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) {
      console.error('Error fetching financial accounts:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching financial accounts:', error);
    return [];
  }
};

// Buscar vendas
export const fetchSales = async () => {
  try {
    const { data, error } = await supabase
      .from('sales')
      .select(`
        *,
        entities(name, type, partners(name))
      `)
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Error fetching sales:', error);
      return [];
    }

    return data?.map((sale: any) => ({
      id: sale.id,
      entityName: sale.entities?.name || 'N/A',
      entityType: sale.entities?.type || 'N/A',
      partnerName: sale.entities?.partners?.name || 'N/A',
      amount: Number(sale.amount),
      paymentMethod: sale.payment_method || 'N/A',
      status: sale.status,
      createdAt: new Date(sale.created_at).toLocaleDateString('pt-BR'),
    })) || [];
  } catch (error) {
    console.error('Unexpected error fetching sales:', error);
    return [];
  }
};
