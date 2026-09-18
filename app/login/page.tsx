"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/authService";
import { Eye, EyeOff, Loader2, AlertCircle, Landmark, TrendingUp, Wallet, BarChart3, Shield, Smartphone } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      const user = await loginUser({ username, password });
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/home");
    } catch (err) {
      console.error(err);
      setError("Usuário ou senha inválidos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  const features = [
    { icon: TrendingUp, title: "Investimentos", desc: "Acompanhe seus investimentos em tempo real" },
    { icon: Wallet, title: "Dividendos", desc: "Controle seus dividendos recebidos" },
    { icon: BarChart3, title: "Gráficos", desc: "Análises visuais do seu patrimônio" },
    { icon: Shield, title: "Segurança", desc: "Seus dados protegidos e criptografados" },
    { icon: Smartphone, title: "Responsivo", desc: "Acesse de qualquer dispositivo" },
  ];

  return (
    <div className="w-full min-h-screen flex bg-background">
      {/* LADO ESQUERDO — Branding (desktop) */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden bg-gradient-to-br from-emerald-600 to-cyan-700">
        {/* Decorative shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16 w-full">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Landmark className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Controle de Finanças
              </h1>
              <p className="text-emerald-100 text-sm">
                Gestão financeira inteligente
              </p>
            </div>
          </div>

          {/* Headline */}
          <h2 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight mb-4">
            Tome o controle das suas{" "}
            <span className="text-emerald-200">finanças</span>
          </h2>
          <p className="text-emerald-100 text-base mb-10 max-w-md">
            Gerencie pagamentos, investimentos e dividendos em um só lugar. 
            Visualize sua evolução com gráficos detalhados.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex items-start gap-3 p-3 rounded-xl bg-white/10 backdrop-blur-sm"
              >
                <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{title}</p>
                  <p className="text-emerald-100 text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <p className="text-emerald-200/60 text-xs mt-10">
            @{new Date().getFullYear()} Controle de Finanças. Todos os direitos reservados.
          </p>
        </div>
      </div>

      {/* LADO DIREITO — Formulário */}
      <div className="flex-1 flex items-center justify-center px-6 py-10 bg-background relative">
        {/* Mesh gradient */}
        <div className="absolute inset-0 bg-gradient-mesh pointer-events-none" />

        <div className="relative z-10 w-full max-w-[400px] animate-fadeInUp">
          {/* Logo mobile */}
          <div className="flex flex-col items-center mb-6 lg:hidden">
            <div className="w-14 h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-3">
              <Landmark className="text-emerald-400" size={28} />
            </div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              Controle de Finanças
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Gestão financeira inteligente
            </p>
          </div>

          {/* Header desktop */}
          <div className="hidden lg:block mb-8">
            <h2 className="text-2xl font-bold text-foreground tracking-tight">
              Bem-vindo de volta
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Insira suas credenciais para acessar sua conta
            </p>
          </div>

          {/* Header mobile */}
          <div className="lg:hidden text-center mb-6">
            <h2 className="text-xl font-bold text-foreground">
              Bem-vindo de volta
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Insira suas credenciais para acessar
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 p-2.5 rounded-lg text-xs font-medium animate-fadeIn mb-4">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="login-username"
                className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider"
              >
                Usuário
              </label>
              <div className={`relative rounded-lg border transition-all duration-200 ${
                focused === 'username'
                  ? 'border-emerald-500/50 shadow-[0_0_0_3px_rgba(16,185,129,0.1)]'
                  : 'border-border hover:border-muted-foreground/30'
              }`}>
                <input
                  id="login-username"
                  type="text"
                  placeholder="Digite seu username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setFocused('username')}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-transparent px-3 py-2.5 text-foreground placeholder-muted-foreground text-sm font-medium outline-none rounded-lg"
                  required
                  disabled={loading}
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="login-password"
                className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider"
              >
                Senha
              </label>
              <div className={`relative rounded-lg border transition-all duration-200 ${
                focused === 'password'
                  ? 'border-emerald-500/50 shadow-[0_0_0_3px_rgba(16,185,129,0.1)]'
                  : 'border-border hover:border-muted-foreground/30'
              }`}>
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-transparent px-3 py-2.5 pr-10 text-foreground placeholder-muted-foreground text-sm font-medium outline-none rounded-lg"
                  required
                  disabled={loading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
                  aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="
                relative w-full py-2.5 rounded-lg font-bold text-sm text-primary-foreground
                bg-emerald-600 hover:bg-emerald-500
                shadow-lg shadow-emerald-950/20
                transition-all duration-200 active:scale-[0.98]
                disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100
                overflow-hidden mt-2
              "
            >
              <span className={`flex items-center justify-center gap-2 transition-all ${loading ? 'opacity-0' : 'opacity-100'}`}>
                Entrar
              </span>
              {loading && (
                <span className="absolute inset-0 flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin stroke-[2.5]" />
                  Autenticando...
                </span>
              )}
            </button>
          </form>

          {/* Features mobile */}
          <div className="lg:hidden mt-8 grid grid-cols-3 gap-3 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            {[
              { icon: TrendingUp, label: 'Investimentos' },
              { icon: Wallet, label: 'Dividendos' },
              { icon: BarChart3, label: 'Gráficos' },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1.5 py-2.5 px-2 rounded-lg glass"
              >
                <Icon size={16} className="text-emerald-400" />
                <span className="text-[10px] font-medium text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <p className="text-center text-[10px] text-muted-foreground mt-6">
            Controle de Finanças @{new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}
