import { supabase } from '@/lib/supabase';

export async function createInvestimento(dados) {
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

export async function updateInvestimento(id, values) {
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

export async function deleteInvestimento(id) {
  const { error } = await supabase.from('investimentos').delete().eq('id', id);

  if (error) {
    throw error;
  }
}
