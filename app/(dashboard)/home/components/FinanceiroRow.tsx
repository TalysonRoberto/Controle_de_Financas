'use client';

import { useRouter } from 'next/navigation';
import StatusBadge from './StatusBadge';

interface ItemFinanceiro {
  id: string | number;
  mes: string;
  numero_mes: number;
  pagamentos?: Array<{ valor: number; status?: string }>;
  investimentos?: Array<{ valor: number }>;
  dividendos?: Array<{ valor: number }>;
}

interface FinanceiroRowProps {
  item: ItemFinanceiro;
}

export default function FinanceiroRow({ item }: FinanceiroRowProps) {
  const router = useRouter();

  // Redutores seguros blindados contra arrays nulos ou indefinidos
  const totalPagamentos = (item.pagamentos || []).reduce((acc, p) => acc + (p?.valor || 0), 0);
  const totalInvestimentos = (item.investimentos || []).reduce((acc, i) => acc + (i?.valor || 0), 0);
  const totalDividendos = (item.dividendos || []).reduce((acc, d) => acc + (d?.valor || 0), 0);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <div
      onClick={() => router.push(`/mes/${item.id}`)}
      className="
        flex flex-col gap-2 p-4 border-t border-zinc-800 text-white hover:bg-zinc-800/40 cursor-pointer transition-colors
        md:grid md:grid-cols-5 md:items-center md:px-4 md:py-3.5
      "
    >
      {/* Nome do Mês + Badge de Status Compacto no Mobile */}
      <div className="flex items-center justify-between md:block">
        <span className="font-bold text-zinc-200 md:font-normal md:text-white">
          {item.mes}
        </span>
        <div className="md:hidden">
          <StatusBadge pagamentos={item.pagamentos} numeroMes={item.numero_mes} />
        </div>
      </div>

      {/* Grid de Valores Mobiles (Adicionado labels descritivos inline para celulares) */}
      <div className="grid grid-cols-3 gap-2 text-xs text-zinc-400 mt-1 md:contents md:text-sm md:text-white md:mt-0">
        <div className="flex flex-col md:block">
          <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold md:hidden">Gastos</span>
          <span className="text-sm font-medium md:font-normal text-red-400">
            {formatCurrency(totalPagamentos)}
          </span>
        </div>

        <div className="flex flex-col md:block">
          <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold md:hidden">Investido</span>
          <span className="text-sm font-medium md:font-normal text-green-400">
            {formatCurrency(totalInvestimentos)}
          </span>
        </div>

        <div className="flex flex-col md:block">
          <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold md:hidden">Dividendos</span>
          <span className="text-sm font-medium md:font-normal text-cyan-400 ">
            {formatCurrency(totalDividendos)}
          </span>
        </div>
      </div>

      {/* Status em coluna oculta no Mobile e visível na quinta coluna do Desktop */}
      <div className="hidden md:block">
        <StatusBadge pagamentos={item.pagamentos} numeroMes={item.numero_mes} />
      </div>
    </div>
  );
}