import { supabase } from '@/lib/supabase';

export async function createPagamento(payload) {
  const { data, error } = await supabase
    .from('pagamentos')
    .insert(payload)
    .select();

  if (error) {
    throw error;
  }

  return data;
}

export async function updatePagamento(id, dados) {
  // console.log('UPDATE ENVIADO:', id, dados);

  const { data: antes } = await supabase
    .from('pagamentos')
    .select('*')
    .eq('id', id);

  // console.log('ANTES:', antes);

  const { data, error } = await supabase
    .from('pagamentos')
    .update(dados)
    .eq('id', id)
    .select();

  // console.log('DEPOIS:', data);
  // console.log('ERRO:', error);

  if (error) throw error;

  return data;
}

export async function deletePagamento(id) {
  const { error } = await supabase.from('pagamentos').delete().eq('id', id);

  if (error) throw error;
}
