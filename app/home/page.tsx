"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/Sidebar";
import ConfigPanel from "@/components/ConfigPanel";
import { getFinanceiroMensal } from "@/services/financeService";

export default function HomePage() {

  const router = useRouter();
  const [user, setUser] = useState(null);
  const [openConfig, setOpenConfig] = useState(false);
  const [financeiro, setFinanceiro] = useState([]);


  useEffect(() => {

    async function loadPage() {

      const localUser = localStorage.getItem("user");

      if (!localUser) {
        router.push("/login");
        return;
      }

      setUser(JSON.parse(localUser));

      // =========================
      // CARREGA FINANCEIRO
      // =========================

      try {

        const data = await getFinanceiroMensal();

        console.log("FINANCEIRO:", data);

        setFinanceiro(data);

      } catch (err) {

        console.log(err);
      }
    }

    loadPage();

  }, []);

  function handleLogout() {

    localStorage.removeItem("user");

    router.push("/login");
  }

  return (
    <div className="flex bg-zinc-950 min-h-screen">

      <Sidebar
        onConfig={() => setOpenConfig(true)}
        onLogout={handleLogout}
      />

      <div className="flex-1">

        {/* TOPO */}
        <header className="w-full h-[90px] border-b border-zinc-800 flex items-center justify-end px-10">

          {user && (
            <div className="flex items-center gap-4">

              <div className="text-right">
                <p className="text-white font-semibold">
                  {user.username}
                </p>

                <p className="text-zinc-400 text-sm">
                  Usuário ativo
                </p>
              </div>

              {user?.avatars ? (
                <img
                  src={user.avatars}
                  alt="avatar"
                  className="
                    w-14 h-14
                    rounded-full
                    object-cover
                    border-2 border-zinc-700
                  "
                />

              ) : (

                <div
                  className="
                    w-14 h-14
                    rounded-full
                    bg-zinc-700
                    flex items-center justify-center
                    text-white font-bold
                  "
                >
                  {user?.username?.charAt(0).toUpperCase()}
                </div>

              )}

            </div>
          )}

        </header>

        {/* CONTEÚDO */}
        <main className="p-10">

          {!openConfig ? (

            <div>

  <h1 className="text-white text-5xl font-bold">
    Dashboard
  </h1>

  <p className="text-zinc-400 mt-3 mb-10">
    Bem-vindo ao sistema financeiro.
  </p>

  <div className="grid gap-6">

    {financeiro.map((item) => (

      <div
        key={item.id}
        className="
          bg-zinc-900
          border border-zinc-800
          rounded-3xl
          p-6
        "
      >

        {/* HEADER */}
        <div className="mb-6">

          <h2 className="text-3xl font-bold text-white">
            {item.mes} {item.ano}
          </h2>

          <p className="text-zinc-400 mt-1">
            Status: {item.status}
          </p>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-3 gap-5">

          {/* PAGAMENTOS */}
          <div
            className="
              bg-zinc-800
              rounded-2xl
              p-5
            "
          >

            <h3 className="text-white text-xl font-semibold mb-4">
              Pagamentos
            </h3>

            <div className="flex flex-col gap-3">

              {item.pagamentos.map((pagamento) => (

                <div
                  key={pagamento.id}
                  className="flex justify-between text-zinc-300"
                >

                  <span>
                    {pagamento.servico}
                  </span>

                  <span>
                    R$ {pagamento.valor}
                  </span>

                </div>

              ))}

            </div>

          </div>

          {/* INVESTIMENTOS */}
          <div
            className="
              bg-zinc-800
              rounded-2xl
              p-5
            "
          >

            <h3 className="text-white text-xl font-semibold mb-4">
              Investimentos
            </h3>

            <div className="flex flex-col gap-3">

              {item.investimentos.map((investimento) => (

                <div
                  key={investimento.id}
                  className="flex justify-between text-zinc-300"
                >

                  <span>
                    {investimento.servico}
                  </span>

                  <span>
                    R$ {investimento.valor}
                  </span>

                </div>

              ))}

            </div>

          </div>

          {/* DIVIDENDOS */}
          <div
            className="
              bg-zinc-800
              rounded-2xl
              p-5
            "
          >

            <h3 className="text-white text-xl font-semibold mb-4">
              Dividendos
            </h3>

            <div className="flex flex-col gap-3">

              {item.dividendos.map((dividendo) => (

                <div
                  key={dividendo.id}
                  className="flex justify-between text-zinc-300"
                >

                  <span>
                    {dividendo.servico}
                  </span>

                  <span>
                    R$ {dividendo.valor}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    ))}

  </div>

</div>

          ) : (

            <ConfigPanel
              onClose={() => setOpenConfig(false)}
            />

          )}

        </main>

      </div>

    </div>
  );
}