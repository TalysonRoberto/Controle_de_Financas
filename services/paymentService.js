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
