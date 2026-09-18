'use client';

import { formatBRL } from '@/lib/format';
import { getProprietarioCor } from '@/lib/constants';
import { Badge } from '@/components/ui/Badge';
import type { Pagamento } from '@/types/finance';

interface PaymentRowProps {
  item: Pagamento;
  onClick: () => void;
}

export default function PaymentRow({ item, onClick }: PaymentRowProps) {
  const isPago = item.status?.toLowerCase() === 'pago';

  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${item.servico} — ${formatBRL(item.valor)} — ${item.status}`}
      className={`cursor-pointer transition-colors duration-200
        flex items-center gap-2 px-2.5 py-2 rounded-md
        md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:py-1.5 md:px-3 md:items-center md:gap-0 md:rounded-none
        focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:ring-inset
        ${isPago ? 'bg-emerald-500/5 text-emerald-400 hover:bg-emerald-500/10' : 'bg-amber-500/5 text-amber-400 hover:bg-amber-500/10'}
        `}
    >
      {/* Serviço */}
      <span className="text-xs text-foreground truncate flex-1 min-w-0">
        {item.servico}
      </span>

      {/* Dono */}
      <span
        className={`rounded px-1 py-0.5 text-[9px] shrink-0 ${getProprietarioCor(item.proprietario)}`}
      >
        {item.proprietario}
      </span>

      {/* Valor */}
      <span className="text-xs text-foreground tabular-nums shrink-0 text-right w-16 md:w-auto md:text-left">
        {formatBRL(item.valor)}
      </span>

      {/* Status */}
      <div className="shrink-0 hidden md:block text-right">
        <Badge variant={isPago ? 'success' : 'warning'} size="sm">
          {item.status}
        </Badge>
      </div>
    </div>
  );
}
