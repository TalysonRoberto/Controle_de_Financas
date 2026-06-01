'use client';

import { useRouter } from 'next/navigation';
import StatusBadge from './StatusBadge';

export default function FinanceiroRow({ item = {} }) {
  const router = useRouter();
  const existeMes = !String(item.id).startsWith('fake-');

  const totalPagamentos = (item.pagamentos || []).reduce(
    (acc, pagamento) => acc + pagamento.valor,
    0,
  );

  const totalInvestimentos = (item.investimentos || []).reduce(
    (acc, investimento) => acc + investimento.valor,
    0,
  );

  const totalDividendos = (item.dividendos || []).reduce(
    (acc, dividendo) => acc + dividendo.valor,
    0,
  );

  return (
    <div
      className="
        grid grid-cols-6
        items-center
        px-4
        py-2
        border-t border-zinc-800
        text-white
        overflow-hidden
      "
    >
      <span>{item.mes}</span>

      <span>R$ {totalPagamentos}</span>

      <span>R$ {totalInvestimentos}</span>

      <span>R$ {totalDividendos}</span>

      <StatusBadge
        pagamentos={item.pagamentos}
        numeroMes={item.numero_mes}
        fake={item.fake}
      />

      <button
        disabled={item.fake}
        onClick={() => router.push(`/mes/${item.id}`)}
        className={`
          px-6 py-2 rounded-xl transition-all w-20 text-sm font-medium
          ${
            item.fake
              ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }
        `}
      >
        Abrir
      </button>
    </div>
  );
}
