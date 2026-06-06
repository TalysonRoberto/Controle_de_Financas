import { supabase } from '@/lib/supabase';

// =======================
// CRIAR USUÁRIO
// =======================
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

// =======================
// ATUALIZAR USUÁRIO
// =======================
export async function updateUser({ id, username, password, image }) {
  let imageUrl = null;

  const updateData = {};

  if (image instanceof File) {
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

  if (username?.trim()) {
    updateData.username = username;
  }

  if (password?.trim()) {
    updateData.password = password;
  }

  if (imageUrl) {
    updateData.avatars = imageUrl;
  }

  console.log('ID:', id);
  console.log('UPDATE DATA:', updateData);

  const { data, error } = await supabase
    .from('usuarios')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  console.log('RESULT:', data);
  console.log('ERROR:', error);

  if (error) {
    throw error;
  }

  return data;
}
