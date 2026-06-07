import { supabase } from '@/lib/supabase';

export interface Dividendo {
  financeiro_id: string | number;
  servico: string;
  valor: number;
  status: string;
  tipo?: string;
}

export async function createDividendo(
  registros: Dividendo[]
) {
  const { data, error } = await supabase
    .from('dividendos')
    .insert(registros)
    .select();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

export async function updateDividendo(
  id: number | string,
  values: Partial<Dividendo>
) {
  const { data, error } = await supabase
    .from('dividendos')
    .update(values)
    .eq('id', id)
    .select();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteDividendo(
  id: number | string
) {
  const { error } = await supabase
    .from('dividendos')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
}