'use client';

// Declaração de tipos para evitar qualquer rejeição do compilador
interface PagamentoItem {
  id?: string | number;
  valor: number;
  status?: string;
}

interface StatusBadgeProps {
  pagamentos?: PagamentoItem[];
  numeroMes: number;
  fake?: boolean;
}

export default function StatusBadge({
  pagamentos = [],
  numeroMes,
  fake = false,
}: StatusBadgeProps) {
  const currentMonth = new Date().getMonth() + 1;

  let status = '';
  let style = '';

  if (fake) {
    status = 'Indisponível';
    style = 'bg-zinc-800 text-zinc-400 border border-zinc-700';
  } else {
    const semPagamentos = pagamentos.length === 0;

    const allPaid =
      pagamentos.length > 0 &&
      pagamentos.every(
        (pagamento) => pagamento.status?.toLowerCase() === 'pago'
      );

    if (numeroMes > currentMonth) {
      status = 'Indisponível';
      style = 'bg-zinc-800 text-zinc-500 border border-zinc-700/50';
    } else if (semPagamentos) {
      status = 'Sem registros';
      style = 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
    } else if (allPaid) {
      status = 'Pago';
      style = 'bg-green-500/10 text-green-400 border border-green-500/20';
    } else if (numeroMes < currentMonth) {
      status = 'Pendente';
      style = 'bg-red-500/10 text-red-400 border border-red-500/20';
    } else {
      status = 'Em andamento';
      style = 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20';
    }
  }

  return (
    <span
      className={`
        px-3
        py-1
        rounded-full
        text-xs
        font-semibold
        w-fit
        whitespace-nowrap
        text-center
        ${style}
      `}
    >
      {status}
    </span>
  );
}