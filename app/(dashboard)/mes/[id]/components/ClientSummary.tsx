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
    <div className="bg-card/30 border border-border/50 rounded-lg md:border-none md:bg-transparent md:p-0">
      <button
        onClick={() => startTransition(() => setIsOpencard(!isOpencard))}
        aria-expanded={isOpencard}
        className="w-full flex items-center justify-between px-3 py-2 text-muted-foreground hover:text-foreground font-medium text-xs transition-colors md:hidden"
      >
        <span>{isOpencard ? 'Ocultar Resumo' : 'Ver Resumo'}</span>
        <ChevronDown
          size={14}
          className={`transform transition-transform duration-300 ${isOpencard ? 'rotate-180 text-emerald-500' : 'rotate-0'}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:max-h-none md:opacity-100 md:mt-0 ${
          isOpencard ? 'max-h-none opacity-100 px-2.5 pb-2.5 mt-1' : 'max-h-0 opacity-0 md:opacity-100'
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
