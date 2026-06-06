'use client';

import { useState, startTransition } from 'react';
import { ChevronDown } from 'lucide-react';
import DashboardCards from '@/components/DashboardCards';

interface ClientSummaryProps {
  totalInvestimentos: number;
  totalDividendos: number;
  totalPagamentos: number;
}

export default function ClientSummary({ totalInvestimentos, totalDividendos, totalPagamentos }: ClientSummaryProps) {
  const [isOpencard, setIsOpencard] = useState(false);

  return (
    <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl md:border-none md:bg-transparent md:p-0">
      <button
        onClick={() => startTransition(() => setIsOpencard(!isOpencard))}
        className="w-full flex items-center justify-between px-4 py-3 text-zinc-400 hover:text-white font-medium text-sm transition-colors md:hidden"
      >
        <span>{isOpencard ? 'Ocultar Resumo Financeiro' : 'Ver Resumo Financeiro'}</span>
        <ChevronDown
          size={18}
          className={`transform transition-transform duration-300 ${isOpencard ? 'rotate-180 text-emerald-500' : 'rotate-0'}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:max-h-none md:opacity-100 md:mt-0 ${
          isOpencard ? 'max-h-[1000px] opacity-100 px-4 pb-4 mt-1' : 'max-h-0 opacity-0 md:opacity-100'
        }`}
      >
        <DashboardCards
          totalInvestimentos={totalInvestimentos}
          totalDividendos={totalDividendos}
          totalPagamentos={totalPagamentos}
        />
      </div>
    </div>
  );
}