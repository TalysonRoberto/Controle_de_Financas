import { supabase } from '@/lib/supabase';

export async function createUser({ username, password, image }) {
  let imageUrl = '';

  // upload imagem
  if (image) {
    const cleanName = image.name
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9.-]/g, '');

    const fileName = `${Date.now()}-${cleanName}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, image);

    if (uploadError) {
      throw uploadError;
    }

    const { data: publicData } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);

    imageUrl = publicData.publicUrl;
  }

  // insert banco
  const { data, error } = await supabase
    .from('usuarios')
    .insert([
      {
        username,
        password,
        avatars: imageUrl,
      },
    ])
    .select();

  if (error) {
    throw error;
  }

  return data;
}
