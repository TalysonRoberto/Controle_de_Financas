'use client';

import { formatBRL } from '@/lib/format';
import { getTagColor } from '@/lib/constants';
import type { Investimento } from '@/types/finance';

interface InvestmentRowProps {
  item: Investimento;
}

export default function InvestmentRow({ item }: InvestmentRowProps) {
  return (
    <div
      className="
        flex items-center gap-2
        px-2.5 py-2 rounded-md
        transition-colors duration-200
        hover:bg-accent/30
        md:grid md:grid-cols-[2fr_1fr_1fr] md:items-center md:gap-0 md:px-3 md:py-1.5 md:rounded-none
      "
    >
      {/* Serviço */}
      <span className="text-xs text-foreground truncate flex-1 min-w-0">
        {item.servico}
      </span>

      {/* Tipo */}
      <span
        className={`px-1 py-0.5 rounded text-[9px] uppercase tracking-wider shrink-0 ${getTagColor(item.tipo || '')}`}
      >
        {item.tipo}
      </span>

      {/* Valor */}
      <span className="text-xs text-emerald-400 tabular-nums shrink-0 text-right w-16 md:w-auto md:text-left">
        {formatBRL(item.valor)}
      </span>
    </div>
  );
}
