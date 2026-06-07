import { supabase } from '@/lib/supabase';

interface LoginData {
  username: string;
  password: string;
}

export async function loginUser({
  username,
  password,
}: LoginData) {
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