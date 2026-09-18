'use client';

import { useRouter } from 'next/navigation';
import StatusBadge from './StatusBadge';
import { formatBRL } from '@/lib/format';
import type { FinanceiroMes } from '@/types/finance';

interface FinanceiroRowProps {
  item: FinanceiroMes;
}

export default function FinanceiroRow({ item }: FinanceiroRowProps) {
  const router = useRouter();

  const totalPagamentos = (item.pagamentos || []).reduce((acc, p) => acc + (p?.valor || 0), 0);
  const totalInvestimentos = (item.investimentos || []).reduce((acc, i) => acc + (i?.valor || 0), 0);
  const totalDividendos = (item.dividendos || []).reduce((acc, d) => acc + (d?.valor || 0), 0);

  return (
    <div
      onClick={() => router.push(`/mes/${item.id}`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          router.push(`/mes/${item.id}`);
        }
      }}
      role="link"
      tabIndex={0}
      aria-label={`${item.mes} — Gastos: ${formatBRL(totalPagamentos)}, Investido: ${formatBRL(totalInvestimentos)}, Dividendos: ${formatBRL(totalDividendos)}`}
      className="
        flex items-center gap-3 px-3 py-2.5 border-t border-border/50 text-foreground
        hover:bg-accent/50 cursor-pointer transition-colors duration-200
        md:grid md:grid-cols-5 md:py-2 md:gap-0
        focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:ring-inset
      "
    >
      {/* Mês */}
      <span className="font-medium text-sm text-foreground truncate w-20 md:w-auto shrink-0">
        {item.mes}
      </span>

      {/* Valores */}
      <span className="text-xs text-red-400 tabular-nums w-20 md:w-auto shrink-0 text-right md:text-left">
        {formatBRL(totalPagamentos)}
      </span>
      <span className="text-xs text-emerald-400 tabular-nums w-20 md:w-auto shrink-0 text-right md:text-left hidden sm:block">
        {formatBRL(totalInvestimentos)}
      </span>
      <span className="text-xs text-cyan-400 tabular-nums w-20 md:w-auto shrink-0 text-right md:text-left hidden sm:block">
        {formatBRL(totalDividendos)}
      </span>

      {/* Status */}
      <div className="shrink-0 ml-auto md:ml-0">
        <StatusBadge pagamentos={item.pagamentos} numeroMes={item.numero_mes} />
      </div>
    </div>
  );
}
