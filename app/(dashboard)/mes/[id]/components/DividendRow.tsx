'use client';

interface DividendItem {
  id: string | number;
  servico: string;
  valor: number;
  tipo?: string;
}

interface DividendRowProps {
  item: DividendItem;
  getTagColor: (tag: string) => string;
}

export default function DividendRow({
  item,
  getTagColor,
}: DividendRowProps) {
  return (
    <div
      className="
        flex flex-col gap-2
        px-4 py-2
        rounded-xl
        transition-colors
        hover:bg-zinc-800/10

        md:grid
        md:grid-cols-[2fr_1fr_1fr]
        md:items-center
        md:gap-0
        md:px-4
        md:py-2
        md:rounded-none
      "
    >
      {/* SERVIÇO */}
      <div>
        <span className="text-base font-bold text-white tracking-tight md:text-sm md:font-medium truncate block">
          {item.servico}
        </span>
      </div>

      {/* MOBILE */}
      <div className="md:hidden flex items-center justify-between">
        <span
          className={`
            px-2
            py-0.5
            rounded-md
            text-[10px]
            font-bold
            uppercase
            tracking-wider
            ${getTagColor(item.tipo || '')}
          `}
        >
          {item.tipo}
        </span>

        <span className="font-bold text-cyan-400 text-[13px]">
          {item.valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </span>
      </div>

      {/* ORIGEM DESKTOP */}
      <div className="hidden md:block">
        <span
          className={`
            px-2
            py-0.5
            rounded-md
            text-[10px]
            font-bold
            uppercase
            tracking-wider
            w-fit
            block
            ${getTagColor(item.tipo || '')}
          `}
        >
          {item.tipo}
        </span>
      </div>

      {/* VALOR DESKTOP */}
      <div className="hidden md:block text-right">
        <span className="font-semibold text-cyan-400">
          {item.valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </span>
      </div>
    </div>
  );
}