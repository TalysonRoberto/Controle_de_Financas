"use client";

import { useState } from "react";
import { User, Lock, ImagePlus, Loader2, Eye, EyeOff} from "lucide-react";

import { createUser } from "@/services/userService";

export default function AddUser() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleAddUser() {

    if (!username || !password) {
      alert("Preencha os campos");
      return;
    }

    try {

      setLoading(true);

      await createUser({
        username,
        password,
        image
      });

      alert("Usuário cadastrado!");

      setUsername("");
      setPassword("");
      setImage(null);
      setPreview("");

    } catch (err) {

      console.log(err);

      alert("Erro ao cadastrar");

    } finally {

      setLoading(false);
    }
  }

  function handleImage(e) {

    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);
  }

  return (
    <div className="w-full max-w-[500px]">

      {/* HEADER */}
      <div className="mb-4">

        <h1 className="text-white text-3xl font-bold">
          Add User
        </h1>

        <p className="text-zinc-400 mt-2">
          Cadastre um novo usuário no sistema.
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
              hover:border-green-500
              transition-all
              flex items-center justify-center
            "
          >

            {preview ? (

              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-cover"
              />

            ) : (

              <div className="flex flex-col items-center text-zinc-400">

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

          <label className="text-zinc-300 text-sm mb-2 block">
            Username
          </label>

          <div
            className="
              flex items-center gap-3
              bg-zinc-900
              border border-zinc-800
              focus-within:border-green-500
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
              placeholder="Digite o username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="
                w-full
                h-14
                border-none
                outline-none
                focus:outline-none
                text-white
                placeholder:text-zinc-500
                inputbgtransparente
              "
            />

          </div>

        </div>

        {/* PASSWORD */}
        <div>

          <label className="text-zinc-300 text-sm mb-2 block">
            Password
          </label>

          <div
            className="
              flex items-center gap-3
              h-14
              bg-zinc-900
              border border-zinc-800
              focus-within:border-green-500
              rounded-2xl
              px-4
            "
          >

            <Lock
              size={20}
              className="text-zinc-500"
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Digite a senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full
                inputbgtransparente
                outline-none
                text-white
                placeholder:text-zinc-500
              "
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
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

        {/* BUTTON */}
        <button
          onClick={handleAddUser}
          disabled={loading}
          className="
            h-14
            mt-2
            rounded-2xl
            bg-green-500
            hover:bg-green-600
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
              Cadastrando...
            </>
          ) : (
            "Cadastrar Usuário"
          )}

        </button>

      </div>

    </div>
  );
}