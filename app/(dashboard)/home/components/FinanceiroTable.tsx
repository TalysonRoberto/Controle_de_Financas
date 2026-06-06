import FinanceiroRow from './FinanceiroRow';

// Definição dos tipos aceitos pela tabela
interface ItemFinanceiro {
  id: string | number;
  mes: string;
  numero_mes: number;
  pagamentos?: Array<{ valor: number; status?: string }>;
  investimentos?: Array<{ valor: number }>;
  dividendos?: Array<{ valor: number }>;
}

interface FinanceiroTableProps {
  data: ItemFinanceiro[];
  inicializarAno: () => void;
}

export default function FinanceiroTable({ data = [], inicializarAno }: FinanceiroTableProps) {
  return (
    <div
      className="
        mt-5
        bg-zinc-900
        border
        border-zinc-800
        rounded-xl
        overflow-hidden
        shadow-xl
      "
    >
      {/* Header — Corrigido de grid-cols-6 para grid-cols-5 e escondido no mobile */}
      <div
        className="
          hidden
          md:grid
          grid-cols-5
          bg-zinc-800/40
          backdrop-blur
          p-4
          text-zinc-400
          text-xs
          font-bold
          uppercase
          tracking-wider
        "
      >
        <span>Mês</span>
        <span>Pagamentos</span>
        <span>Investido</span>
        <span>Dividendos</span>
        <span>Status</span>
      </div>

      {/* Rows Container */}
      <div
        className="
          md:max-h-[55vh]
          max-h-[65dvh]
          overflow-y-auto
          divide-y
          divide-zinc-800/30

          [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar-track]:bg-zinc-900
          [&::-webkit-scrollbar-thumb]:bg-zinc-800
          [&::-webkit-scrollbar-thumb]:rounded-full
        "
      >
        {data.map((item) => (
          <FinanceiroRow key={item.id} item={item} />
        ))}

        {/* Estado vazio tratado de forma elegante */}
        {data.length === 0 && (
          <div className="p-12 text-center text-zinc-500 font-medium text-sm">
            Nenhum registro financeiro encontrado para este ano.
          </div>
        )}

        {/* Botão de inicialização de ano */}
        {data.length < 12 && (
          <div className="flex justify-center py-8 px-4">
            <button
              onClick={inicializarAno}
              className="
                w-full
                sm:w-auto
                bg-green-600
                hover:bg-green-500
                active:scale-95
                text-white
                px-6
                py-3
                rounded-xl
                font-semibold
                text-sm
                shadow-lg
                shadow-green-900/20
                transition-all
                duration-200
              "
            >
              Inicializar meses do ano
            </button>
          </div>
        )}
      </div>
    </div>
  );
}