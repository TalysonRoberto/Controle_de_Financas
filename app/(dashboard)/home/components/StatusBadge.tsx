'use client';

import { Badge } from '@/components/ui/Badge';
import type { Pagamento } from '@/types/finance';

interface StatusBadgeProps {
  pagamentos?: Pagamento[];
  numeroMes: number;
}

export default function StatusBadge({
  pagamentos = [],
  numeroMes,
}: StatusBadgeProps) {
  const currentMonth = new Date().getMonth() + 1;

  const semPagamentos = pagamentos.length === 0;
  const allPaid =
    pagamentos.length > 0 &&
    pagamentos.every(
      (p) => p.status?.toLowerCase() === 'pago'
    );

  if (numeroMes > currentMonth) {
    return <Badge variant="future" size="sm">Indisponível</Badge>;
  }

  if (semPagamentos) {
    return <Badge variant="info" size="sm">Sem registros</Badge>;
  }

  if (allPaid) {
    return <Badge variant="success" size="sm">Pago</Badge>;
  }

  if (numeroMes < currentMonth) {
    return <Badge variant="danger" size="sm">Pendente</Badge>;
  }

  return <Badge variant="warning" size="sm">Em andamento</Badge>;
}
