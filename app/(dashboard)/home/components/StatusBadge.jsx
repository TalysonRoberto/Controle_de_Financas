export default function StatusBadge({
  pagamentos = [],
  numeroMes,
  fake = false,
}) {
  const currentMonth = new Date().getMonth() + 1;

  let status = '';
  let style = '';

  if (fake) {
    status = 'Indisponível';
    style = 'bg-zinc-700 text-zinc-300';
  } else {
    const semPagamentos = pagamentos.length === 0;

    const allPaid =
      pagamentos.length > 0 &&
      pagamentos.every(
        (pagamento) => pagamento.status?.toLowerCase() === 'pago',
      );

    if (numeroMes > currentMonth) {
      status = 'Indisponível';
      style = 'bg-zinc-700 text-zinc-300';
    }

    // mês existe mas não possui nenhum serviço cadastrado
    else if (semPagamentos) {
      status = 'Sem registros';
      style = 'bg-blue-500/20 text-blue-400';
    } else if (allPaid) {
      status = 'Pago';
      style = 'bg-green-500/20 text-green-400';
    } else if (numeroMes < currentMonth) {
      status = 'Pendente';
      style = 'bg-red-500/20 text-red-400';
    } else {
      status = 'Em andamento';
      style = 'bg-yellow-500/20 text-yellow-400';
    }
  }

  return (
    <span
      className={`
        px-4
        py-2
        rounded-full
        text-sm
        font-medium
        w-fit
        ${style}
      `}
    >
      {status}
    </span>
  );
}
