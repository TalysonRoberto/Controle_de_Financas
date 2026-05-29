import { supabase } from '@/lib/supabase';

export async function loginUser({ username, password }) {
  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('username', username)
    .eq('password', password)
    .single();

  if (error) {
    throw error;
  }

  return data;
}
