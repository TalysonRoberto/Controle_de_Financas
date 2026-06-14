'use client';

import { useEffect, useState } from 'react';
import DashboardCards from '@/components/DashboardCards';
import FinanceiroTable from './components/FinanceiroTable';
import { inicializarAno } from '@/services/financeService';
import YearSelect from './components/YearSelect';
import { getFinanceiroMensal } from '@/services/financeService';
import { RefreshCcw, ChevronDown } from 'lucide-react';

interface Pagamento {
  valor: number;
  status?: string;
}

interface Investimento {
  valor: number;
}

interface Dividendo {
  valor: number;
}

interface Financeiro {
  id: number;
  mes: string;
  ano: number;
  numero_mes: number;

  pagamentos?: Pagamento[];
  investimentos?: Investimento[];
  dividendos?: Dividendo[];
}

export default function HomePage() {
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear()
  );

  const [isOpen, setIsOpen] = useState(false);

  const [data, setData] = useState<Financeiro[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const result = await getFinanceiroMensal();

      //console.log(result);

      setData((result || []) as Financeiro[]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleInicializarAno() {
    try {
      await inicializarAno(selectedYear);

      await loadData();
    } catch (error) {
      console.log('ERRO:', error);
    }
  }

  const filteredData = data.filter(
    (item) => item.ano === selectedYear
  );

  const totalPagamentos = filteredData.reduce(
    (acc, item) =>
      acc +
      (item.pagamentos || []).reduce(
        (soma, pagamento) =>
          pagamento.status?.toLowerCase() === 'pago'
            ? soma + pagamento.valor
            : soma,
        0
      ),
    0
  );

  const totalInvestimentos = filteredData.reduce(
    (acc, item) =>
      acc +
      (item.investimentos || []).reduce(
        (soma, investimento) =>
          soma + investimento.valor,
        0
      ),
    0
  );

  const totalDividendos = filteredData.reduce(
    (acc, item) =>
      acc +
      (item.dividendos || []).reduce(
        (soma, dividendo) =>
          soma + dividendo.valor,
        0
      ),
    0
  );

  return (
    <div className="flex flex-col gap-4 mt-[-20px]">
      <button
        onClick={loadData}
        className="
          hidden
          md:flex
          fixed
          bottom-4
          right-8
          z-50
          items-center
          gap-2
          px-5
          py-3
          rounded-2xl
          bg-emerald-600
          hover:bg-emerald-500
          text-white
          font-semibold
          transition-all
          duration-200
          hover:scale-105
          active:scale-95
        "
      >
        <RefreshCcw size={18} />
        Atualizar Dados
      </button>

      <YearSelect
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />

      <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl md:border-none md:bg-transparent md:p-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="
            w-full
            flex
            items-center
            justify-between
            px-4
            py-3
            text-zinc-400
            hover:text-white
            font-medium
            text-sm
            transition-colors
            md:hidden
          "
        >
          <span>
            {isOpen
              ? 'Ocultar Resumo Financeiro'
              : 'Ver Resumo Financeiro'}
          </span>

          <ChevronDown
            size={18}
            className={`transform transition-transform duration-300 ${
              isOpen
                ? 'rotate-180 text-emerald-500'
                : 'rotate-0'
            }`}
          />
        </button>

        <div
          className={`
            overflow-hidden
            transition-all
            duration-300
            ease-in-out
            md:max-h-none
            md:opacity-100
            md:mt-0
            ${
              isOpen
                ? 'max-h-[1000px] opacity-100 px-4 pb-4 mt-1'
                : 'max-h-0 opacity-0 md:opacity-100'
            }
          `}
        >
          <DashboardCards
            totalInvestimentos={totalInvestimentos}
            totalDividendos={totalDividendos}
            totalPagamentos={totalPagamentos}
          />
        </div>
      </div>

      <FinanceiroTable
        data={filteredData}
        inicializarAno={handleInicializarAno}
      />
    </div>
  );
}