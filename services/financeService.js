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

export async function getFinanceiroById(id) {
  const { data, error } = await supabase
    .from('financeiro_mensal')
    .select(
      `
      *,
      pagamentos(*),
      investimentos(*),
      dividendos(*)
    `,
    )
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getFinanceiroByAno(ano) {
  const { data, error } = await supabase
    .from('financeiro_mensal')
    .select('*')
    .eq('ano', ano);

  if (error) {
    throw error;
  }

  return data;
}
