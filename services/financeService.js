import { supabase } from '@/lib/supabase';

export async function getFinanceiroMensal() {
  const { data, error } = await supabase.from('financeiro_mensal').select(`
      *,
      pagamentos(*),
      investimentos(*),
      dividendos(*)
    `);

  if (error) {
    throw error;
  }

  return data;
}
