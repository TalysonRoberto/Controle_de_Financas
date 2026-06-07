import { supabase } from '@/lib/supabase';

export interface Pagamento {
  financeiro_id: string | number;
  servico: string;
  valor: number;
  status: string;
  proprietario?: string;
}

export async function createPagamento(
  payload: Pagamento[]
) {
  const { data, error } = await supabase
    .from('pagamentos')
    .insert(payload)
    .select();

  if (error) {
    throw error;
  }

  return data;
}

export async function updatePagamento(
  id: number | string,
  dados: Partial<Pagamento>
) {
  const { data, error } = await supabase
    .from('pagamentos')
    .update(dados)
    .eq('id', id)
    .select();

  if (error) {
    throw error;
  }

  return data;
}

export async function deletePagamento(
  id: number | string
) {
  const { error } = await supabase
    .from('pagamentos')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
}