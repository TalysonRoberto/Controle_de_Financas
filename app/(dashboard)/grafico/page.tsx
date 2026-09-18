'use client';

import { useEffect, useState, useMemo } from 'react';
import DashboardCards from '@/components/DashboardCards';
import YearSelect from '../home/components/YearSelect';
import GraficoEvolucao from './components/GraficoEvolucao';
import GraficoDistribuicao from './components/GraficoDistribuicao';
import GraficoComparativoMensal from './components/GraficoComparativoMensal';
import GraficoInvestimentosServico from './components/GraficoInvestimentosServico';
import { getFinanceiroMensal } from '@/services/financeService';
import { RefreshCcw, ChevronDown, Loader2 } from 'lucide-react';
import { isPago } from '@/lib/format';
import type { FinanceiroMes } from '@/types/finance';

export default function GraficoPage() {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [data, setData] = useState<FinanceiroMes[]>([]);
  const [isOpencard, setIsOpencard] = useState(false);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    try {
      setLoading(true);
      const result = await getFinanceiroMensal();
      setData(result || []);
    } catch (error) {
      console.error('Erro ao buscar dados financeiros anuais:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((item) => item.ano === selectedYear);
  }, [data, selectedYear]);

  const { totalPagamentos, totalInvestimentos, totalDividendos } = useMemo(() => {
    let pagamentosSum = 0;
    let investimentosSum = 0;
    let dividendosSum = 0;

    filteredData.forEach((item) => {
      (item.pagamentos || []).forEach((p) => {
        if (isPago(p.status)) pagamentosSum += p.valor || 0;
      });
      (item.investimentos || []).forEach((i) => {
        investimentosSum += i.valor || 0;
      });
      (item.dividendos || []).forEach((d) => {
        dividendosSum += d.valor || 0;
      });
    });

    return {
      totalPagamentos: pagamentosSum,
      totalInvestimentos: investimentosSum,
      totalDividendos: dividendosSum,
    };
  }, [filteredData]);

  const { investimentosChartData, investimentosPorServico } = useMemo(() => {
    const tiposMap: Record<string, number> = {};
    const servicosMap: Record<string, number> = {};

    filteredData.forEach((mes) => {
      (mes.investimentos || []).forEach((inv) => {
        const tipo = inv.tipo || 'Sem Categoria';
        const servico = inv.servico || 'Desconhecido';

        tiposMap[tipo] = (tiposMap[tipo] || 0) + (inv.valor || 0);
        servicosMap[servico] = (servicosMap[servico] || 0) + (inv.valor || 0);
      });
    });

    return {
      investimentosChartData: Object.entries(tiposMap).map(([name, value]) => ({ name, value })),
      investimentosPorServico: Object.entries(servicosMap).map(([name, value]) => ({ name, value })),
    };
  }, [filteredData]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3 text-muted-foreground">
        <Loader2 className="animate-spin text-emerald-500" size={32} />
        <span className="text-sm font-medium">Carregando gráficos...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 relative min-h-screen pb-12">
      
      {/* Botão de Atualizar dados */}
      <button
        onClick={loadData}
        aria-label="Atualizar dados"
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

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Análise Geral</h1>
          <p className="text-xs text-muted-foreground">Acompanhamento e evolução do seu ecossistema financeiro.</p>
        </div>
        <YearSelect selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
      </div>

      {/* Cards Mobile/Desktop */}
      <div className="bg-card/30 border border-border/50 rounded-lg md:border-none md:bg-transparent md:p-0">
        <button
          onClick={() => setIsOpencard(!isOpencard)}
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

      {/* Gráfico Principal */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        <GraficoComparativoMensal data={filteredData} />
        <GraficoDistribuicao title="Distribuição por Ativo" data={investimentosChartData} />
      </div>

      {/* Sub-gráficos */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        <GraficoInvestimentosServico data={investimentosPorServico} />
        <GraficoEvolucao data={filteredData} />
      </div>
    </div>
  );
}
