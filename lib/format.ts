export function formatBRL(value: number | string): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return 'R$ 0,00';
  return num.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function formatBRLCompact(value: number): string {
  if (value >= 1_000_000) {
    return `R$ ${(value / 1_000_000).toFixed(1).replace('.', ',')}M`;
  }
  if (value >= 1_000) {
    return `R$ ${(value / 1_000).toFixed(1).replace('.', ',')}k`;
  }
  return formatBRL(value);
}

export function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('pt-BR');
  } catch {
    return '—';
  }
}

export function formatPercent(value: number, total: number): string {
  if (total === 0) return '0%';
  return `${((value / total) * 100).toFixed(1)}%`;
}

export function isPago(status?: string): boolean {
  return status?.toLowerCase() === 'pago';
}

export function totalPago(items?: Array<{ valor: number; status?: string }>): number {
  return (items || []).reduce(
    (acc, item) => (isPago(item.status) ? acc + (item.valor || 0) : acc),
    0
  );
}

export function totalGeral(items?: Array<{ valor: number }>): number {
  return (items || []).reduce((acc, item) => acc + (item.valor || 0), 0);
}
