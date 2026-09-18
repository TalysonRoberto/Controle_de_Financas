import { supabase } from '@/lib/supabase';

interface CreateUserProps {
  username: string;
  password: string;
  image: File | null;
}

interface UpdateUserProps {
  id: number | string;
  username?: string;
  password?: string;
  image?: File | null;
}

// =======================
// CRIAR USUÁRIO
// =======================
export async function createUser({
  username,
  password,
  image,
}: CreateUserProps) {
  let imageUrl = '';

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
export async function updateUser({
  id,
  username,
  password,
  image,
}: UpdateUserProps) {
  let imageUrl: string | null = null;

  const updateData: Record<string, unknown> = {};

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

  const { data, error } = await supabase
    .from('usuarios')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}