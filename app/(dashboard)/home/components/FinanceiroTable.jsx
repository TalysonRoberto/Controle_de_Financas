import FinanceiroRow from './FinanceiroRow';

export default function FinanceiroTable({ data = [] }) {
  return (
    <div
      className="
        mt-5
        bg-zinc-900
        border
        border-zinc-800
        rounded-xl
        overflow-hidden
      "
    >
      {/* Header */}
      <div
        className="
          grid
          grid-cols-6
          bg-zinc-800/60
          backdrop-blur
          p-4
          text-zinc-300
          font-semibold
        "
      >
        <span>Mês</span>
        <span>Pagamentos</span>
        <span>Investido</span>
        <span>Dividendos</span>
        <span>Status</span>
        <span>Ações</span>
      </div>

      {/* Rows */}
      <div
        className="
          max-h-[52vh]
          overflow-y-auto

          [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:bg-zinc-900
          [&::-webkit-scrollbar-thumb]:bg-zinc-700
          [&::-webkit-scrollbar-thumb]:rounded-full
        "
      >
        {data.map((item) => (
          <FinanceiroRow key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
