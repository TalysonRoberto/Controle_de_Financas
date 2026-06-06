'use client';

interface PaymentItem {
  id: string | number;
  servico: string;
  valor: number;
  proprietario?: string;
  status?: string;
}

interface PaymentRowProps {
  item: PaymentItem;
  onClick: () => void;
}

export default function PaymentRow({ item, onClick }: PaymentRowProps) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer transition-colors 
        flex flex-col gap-2 md:px-4 px-4 md:py-4 py-2 rounded-xl
        md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:py-2 md:px-4 md:items-center md:rounded-none md:gap-0
        ${item.status?.toLowerCase() === 'pago' ? 'bg-green-500/10 text-green-400 hover:bg-green-400/13' : 'bg-gray-400text-amber-400 hover:bg-zinc-800/20'}
        `}
    >
      {/* 1. Serviço */}
      <div className="flex items-center justify-between md:block min-w-0">
        <span className="text-base font-bold text-white tracking-tight md:text-sm md:font-medium truncate block">
          {item.servico}
        </span>
        <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider md:hidden ${
          item.status?.toLowerCase() === 'pago' ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'
        }`}>
          {item.status}
        </span>
      </div>

      {/* 2. Dono e valor*/}
      {/* MOBILE */}
      <div className="md:hidden flex items-center justify-between">
        
        <span
          className={`
            rounded-md
            px-2
            py-0.5
            text-[11px]
            font-bold
            ${
              item.proprietario === 'Talyson'
                ? 'bg-sky-400/10 text-sky-400'
                : 'bg-pink-400/10 text-pink-400'
            }
          `}
        >
          {item.proprietario}
        </span>

        <span className="font-bold text-zinc-200 text-[13px]">
          {item.valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </span>

      </div>

      {/* DONO DESKTOP */}
      <div className="hidden md:block">
        <span
          className={`
            rounded-md
            px-2
            py-0.5
            text-[11px]
            font-bold
            ${
              item.proprietario === 'Talyson'
                ? 'bg-sky-400/10 text-sky-400'
                : 'bg-pink-400/10 text-pink-400'
            }
          `}
        >
          {item.proprietario}
        </span>
      </div>

      {/* VALOR DESKTOP */}
      <div className="hidden md:block">
        <span className="font-semibold text-zinc-200">
          {item.valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </span>
      </div>

      {/* 4. Status (Desktop) */}
      <div className="hidden md:block text-right">
          <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border inline-block ${
            item.status?.toLowerCase() === 'pago'
              ? 'bg-green-500/10 text-green-400 border-green-500/20'
              : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
          }`}>
            {item.status}
          </span>
      </div>
     
    </div>
  );
}