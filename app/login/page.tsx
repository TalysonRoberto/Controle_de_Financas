"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/authService";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null); // Limpa erros anteriores ao tentar submeter novamente

    try {
      setLoading(true);

      const user = await loginUser({
        username,
        password
      });

      console.log("USER:", user);

      // Salva sessão
      localStorage.setItem("user", JSON.stringify(user));

      router.push("/home");
    } catch (err) {
      console.error(err);
      setError("Usuário ou senha inválidos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-zinc-950 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-zinc-900 border border-zinc-800/80 p-8 rounded-2xl w-full max-w-[380px] flex flex-col gap-5 shadow-2xl backdrop-blur-sm"
      >
        {/* Cabeçalho do Card */}
        <div className="flex flex-col gap-1 text-center mb-2">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Bem-vindo
          </h1>
          <p className="text-sm text-zinc-400">
            Insira suas credenciais para acessar
          </p>
        </div>

        {/* Mensagem de Erro Inline (Substitui o alert nativo) */}
        {error && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-xs font-medium animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Input de Usuário */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider ml-1">
            Usuário
          </label>
          <input
            type="text"
            placeholder="Digite seu username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/30 text-white placeholder-zinc-500 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all w-full text-sm font-medium"
            required
            disabled={loading}
          />
        </div>

        {/* Input de Senha */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider ml-1">
            Senha
          </label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 pr-11 rounded-xl bg-zinc-800/50 border border-zinc-700/30 text-white placeholder-zinc-500 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all w-full text-sm font-medium"
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none"
              title={showPassword ? "Esconder senha" : "Mostrar senha"}
              disabled={loading}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Botão Submit */}
        <button
          type="submit"
          disabled={loading}
          className="
            bg-emerald-500 hover:bg-emerald-600 
            text-zinc-950 font-bold text-sm
            p-3.5 rounded-xl mt-2 
            shadow-lg shadow-emerald-500/5
            flex items-center justify-center gap-2
            transition-all active:scale-[0.98] 
            disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100
          "
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin stroke-[2.5]" />
              <span>Autenticando...</span>
            </>
          ) : (
            <span>Entrar</span>
          )}
        </button>
      </form>
    </div>
  );
}