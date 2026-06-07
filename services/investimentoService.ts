import { supabase } from '@/lib/supabase';

export interface Investimento {
  financeiro_id: string | number;
  servico: string;
  valor: number;
  status: string;
  tipo?: string;
}

export async function createInvestimento(
  dados: Investimento[]
) {
  const { data, error } = await supabase
    .from('investimentos')
    .insert(dados)
    .select();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

export async function updateInvestimento(
  id: number | string,
  values: Partial<Investimento>
) {
  const { data, error } = await supabase
    .from('investimentos')
    .update(values)
    .eq('id', id)
    .select();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteInvestimento(
  id: number | string
) {
  const { error } = await supabase
    .from('investimentos')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
}