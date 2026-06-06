'use client';

import { updateUser } from '@/services/userService';
import { useEffect, useState } from 'react';

import {
  User,
  Lock,
  ImagePlus,
  Loader2,
  Eye,
  EyeOff,
  Save,
} from 'lucide-react';

export default function ProfileSettings() {
  const [username, setUsername] = useState('Administrador');
  const [userId, setUserId] = useState<number | null>(null);  
  const [password, setPassword] = useState('');
  const [image, setImage] = useState<File | null>( null,);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] =useState(false);

  useEffect(() => {
    const userStorage = localStorage.getItem('user');

    if (!userStorage) return;

    const user = JSON.parse(userStorage);

    setUserId(user.id);
    setUsername(user.username);

    if (user.avatars) {
      setPreview(user.avatars);
    }
  }, []);


  async function handleSaveProfile() {
    try {
      setLoading(true);

      if (!userId) {
        throw new Error('Usuário não encontrado');
      }

      const updatedUser = await updateUser({
        id: userId,
        username,
        password,
        image,
      });

      localStorage.setItem(
        'user',
        JSON.stringify(updatedUser),
      );

      alert('Perfil atualizado com sucesso');
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar perfil');
    } finally {
      setLoading(false);
    }
  }

  function handleImage(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);

    const imageUrl =
      URL.createObjectURL(file);

    setPreview(imageUrl);
  }

  return (
    <div className="w-full max-w-[500px]">

      {/* HEADER */}
      <div className="mb-4">

        <p className="text-zinc-400 mt-2">
          Atualize seus dados pessoais.
        </p>

      </div>

      {/* CARD */}
      <div
        className="
          bg-zinc-950
          border border-zinc-800
          rounded-3xl
          px-6
          py-4
          flex flex-col gap-4
        "
      >

        {/* AVATAR */}
        <div className="flex justify-center">

          <label
            className="
              relative
              w-30 h-30
              rounded-full
              bg-zinc-800
              border-2 border-zinc-700
              overflow-hidden
              cursor-pointer
              hover:border-emerald-500
              transition-all
              flex items-center justify-center
            "
          >

            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="
                  w-full
                  h-full
                  object-cover
                "
              />
            ) : (
              <div
                className="
                  flex
                  flex-col
                  items-center
                  text-zinc-400
                "
              >
                <ImagePlus size={32} />

                <span className="text-sm mt-2">
                  Upload
                </span>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />

          </label>

        </div>

        {/* USERNAME */}
        <div>

          <label
            className="
              text-zinc-300
              text-sm
              mb-2
              block
            "
          >
            Username
          </label>

          <div
            className="
              flex items-center gap-3
              bg-zinc-900
              border border-zinc-800
              focus-within:border-emerald-500
              rounded-2xl
              px-4
            "
          >

            <User
              size={20}
              className="text-zinc-500"
            />

            <input
              type="text"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              className="
                w-full
                h-14
                border-none
                outline-none
                text-white
                placeholder:text-zinc-500
                inputbgtransparente
              "
            />

          </div>

        </div>

        {/* PASSWORD */}
        <div>

          <label
            className="
              text-zinc-300
              text-sm
              mb-2
              block
            "
          >
            Nova Senha
          </label>

          <div
            className="
              flex items-center gap-3
              h-14
              bg-zinc-900
              border border-zinc-800
              focus-within:border-emerald-500
              rounded-2xl
              px-4
            "
          >

            <Lock
              size={20}
              className="text-zinc-500"
            />

            <input
              type={
                showPassword
                  ? 'text'
                  : 'password'
              }
              placeholder="Digite uma nova senha"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="
                w-full
                outline-none
                text-white
                placeholder:text-zinc-500
                inputbgtransparente
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="
                text-zinc-500
                hover:text-white
                transition-all
              "
            >

              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}

            </button>

          </div>

        </div>

        {/* BOTÃO */}
        <button
          onClick={handleSaveProfile}
          disabled={loading}
          className="
            h-14
            mt-2
            rounded-2xl
            bg-emerald-500
            hover:bg-emerald-600
            disabled:opacity-50
            text-white
            font-semibold
            transition-all
            flex items-center justify-center gap-3
          "
        >

          {loading ? (
            <>
              <Loader2
                size={20}
                className="animate-spin"
              />

              Salvando...
            </>
          ) : (
            <>
              <Save size={18} />
              Salvar Alterações
            </>
          )}

        </button>

      </div>

    </div>
  );
}