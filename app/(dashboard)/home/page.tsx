'use client';

import { useEffect, useState } from 'react';
import DashboardCards from '@/components/DashboardCards';
import FinanceiroTable from './components/FinanceiroTable';
import { inicializarAno } from '@/services/financeService';
import YearSelect from './components/YearSelect';
import { getFinanceiroMensal } from '@/services/financeService';
import { RefreshCcw, ChevronDown } from 'lucide-react';
import { totalPago, totalGeral } from '@/lib/format';
import type { FinanceiroMes } from '@/types/finance';

export default function HomePage() {
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear()
  );

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<FinanceiroMes[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      const result = await getFinanceiroMensal();
      setData((result || []) as FinanceiroMes[]);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleInicializarAno() {
    try {
      await inicializarAno(selectedYear);
      await loadData();
    } catch (error) {
      console.error('Erro ao inicializar ano:', error);
    }
  }

  const filteredData = data
    .filter((item) => item.ano === selectedYear)
    .sort((a, b) => (a.numero_mes || 0) - (b.numero_mes || 0));

  const totalPagamentos = filteredData.reduce(
    (acc, item) => acc + totalPago(item.pagamentos),
    0
  );

  const totalInvestimentos = filteredData.reduce(
    (acc, item) => acc + totalGeral(item.investimentos || []),
    0
  );

  const totalDividendos = filteredData.reduce(
    (acc, item) => acc + totalGeral(item.dividendos || []),
    0
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Botão de atualizar - desktop */}
      <button
        onClick={loadData}
        aria-label="Atualizar dados"
        className="
          hidden
          md:flex
          fixed
          bottom-4
          right-6
          z-50
          items-center
          gap-1.5
          px-4
          py-2
          rounded-xl
          bg-emerald-600
          hover:bg-emerald-500
          text-white
          text-xs
          font-semibold
          transition-all
          duration-200
          hover:scale-105
          active:scale-95
        "
      >
        <RefreshCcw size={14} />
        Atualizar Dados
      </button>

      <YearSelect
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />

      <div className="bg-card/30 border border-border/50 rounded-lg md:border-none md:bg-transparent md:p-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className="
            w-full
            flex
            items-center
            justify-between
            px-3
            py-2
            text-muted-foreground
            hover:text-foreground
            font-medium
            text-xs
            transition-colors
            md:hidden
          "
        >
          <span>
            {isOpen
              ? 'Ocultar Resumo'
              : 'Ver Resumo'}
          </span>

          <ChevronDown
            size={14}
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
                ? 'max-h-none opacity-100 px-2.5 pb-2.5 mt-1'
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
