"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/authService";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const user = await loginUser({
        username,
        password
      });

      console.log("USER:", user);

      // salva sessão fake
      localStorage.setItem("user", JSON.stringify(user));

      router.push("/home");
    } catch (err) {
      console.log(err);
      alert("Usuário ou senha inválidos");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-zinc-950 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-zinc-900 border border-zinc-800/50 p-8 rounded-2xl w-full max-w-[380px] flex flex-col gap-5 shadow-2xl"
      >
        <div className="flex flex-col gap-1 text-center mb-2">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Bem-vindo
          </h1>
          <p className="text-sm text-zinc-400">
            Insira suas credenciais para acessar
          </p>
        </div>

        {/* Input de Usuário */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider ml-1">
            Usuário
          </label>
          <input
            type="text"
            placeholder="Digite seu username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-3 rounded-xl bg-zinc-800 border border-zinc-700/30 text-white placeholder-zinc-500 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/30 transition-all w-full"
            required
          />
        </div>

        {/* Input de Senha com Olhinho */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider ml-1">
            Senha
          </label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 pr-11 rounded-xl bg-zinc-800 border border-zinc-700/30 text-white placeholder-zinc-500 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/30 transition-all w-full"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 transition-colors focus:outline-none"
              title={showPassword ? "Esconder senha" : "Mostrar senha"}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Botão Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 transition-all text-zinc-950 p-3.5 rounded-xl mt-2 shadow-lg shadow-green-500/10"
        >
          {loading ? "Autenticando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}