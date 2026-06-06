import { supabase } from '@/lib/supabase';

export async function createDividendo(registros) {
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

export async function updateDividendo(id, values) {
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

export async function deleteDividendo(id) {
  const { error } = await supabase.from('dividendos').delete().eq('id', id);

  if (error) {
    throw error;
  }
}
