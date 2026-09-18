"use client";

import { useState } from "react";
import { User, Lock, ImagePlus, Loader2, Eye, EyeOff} from "lucide-react";

import { createUser } from "@/services/userService";

export default function AddUser() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [preview, setPreview] = useState<string>("");

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

function handleImage(
  e: React.ChangeEvent<HTMLInputElement>
) {
  const file = e.target.files?.[0];

  if (!file) return;

  setImage(file);
  setPreview(URL.createObjectURL(file));
}

  return (
    <div className="w-full max-w-[500px]">

      {/* HEADER */}
      <div className="mb-4">

        <p className="text-muted-foreground mt-2">
          Cadastre um novo usuário no sistema.
        </p>

      </div>

      {/* CARD */}
      <div
        className="
          bg-card
          border border-border
          rounded-2xl
          px-6
          py-4
          flex flex-col gap-4
        "
      >

        {/* AVATAR */}
        <div className="flex justify-center">

          <label
            htmlFor="add-avatar"
            className="
              relative
              w-30 h-30
              rounded-full
              bg-muted
              border-2 border-border
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
                alt="Pré-visualização do avatar"
                className="w-full h-full object-cover"
              />

            ) : (

              <div className="flex flex-col items-center text-muted-foreground">

                <ImagePlus size={32} />

                <span className="text-sm mt-2">
                  Upload
                </span>

              </div>

            )}

            <input
              id="add-avatar"
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />

          </label>

        </div>

        {/* USERNAME */}
        <div>

          <label htmlFor="add-username" className="text-foreground text-sm mb-2 block">
            Username
          </label>

          <div
            className="
              flex items-center gap-3
              bg-muted/50
              border border-border
              focus-within:border-emerald-500/50
              rounded-xl
              px-4
              transition-all duration-200
            "
          >

            <User
              size={20}
              className="text-muted-foreground"
            />

            <input
              id="add-username"
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
                text-foreground
                placeholder:text-muted-foreground
                inputbgtransparente
              "
            />

          </div>

        </div>

        {/* PASSWORD */}
        <div>

          <label htmlFor="add-password" className="text-foreground text-sm mb-2 block">
            Password
          </label>

          <div
            className="
              flex items-center gap-3
              h-14
              bg-muted/50
              border border-border
              focus-within:border-emerald-500/50
              rounded-xl
              px-4
              transition-all duration-200
            "
          >

            <Lock
              size={20}
              className="text-muted-foreground"
            />

            <input
              id="add-password"
              type={showPassword ? "text" : "password"}
              placeholder="Digite a senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full
                inputbgtransparente
                outline-none
                text-foreground
                placeholder:text-muted-foreground
              "
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
              className="
                text-muted-foreground
                hover:text-foreground
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