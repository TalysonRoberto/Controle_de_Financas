'use client';

import { useEffect, useState, useMemo } from 'react';
import DashboardCards from '@/components/DashboardCards';
import YearSelect from '../home/components/YearSelect';
import GraficoEvolucao from './components/GraficoEvolucao';
import GraficoDistribuicao from './components/GraficoDistribuicao';
import GraficoComparativoMensal from './components/GraficoComparativoMensal';
import GraficoInvestimentosServico from './components/GraficoInvestimentosServico';
import { getFinanceiroMensal } from '@/services/financeService';
import { RefreshCcw, ChevronDown } from 'lucide-react';

interface FinanceItem {
  valor: number;
  tipo?: string;
  servico?: string;
  status?: string;
}

interface MonthlyData {
  id: string | number;
  mes: string;
  ano: number;
  pagamentos?: FinanceItem[];
  investimentos?: FinanceItem[];
  dividendos?: FinanceItem[];
}

export default function GraficoPage() {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [data, setData] = useState<MonthlyData[]>([]);
  const [isOpencard, setIsOpencard] = useState(false);
  const [loading, setLoading] = useState(false);

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

  // 1. Filtra os dados pelo ano selecionado de forma otimizada
  const filteredData = useMemo(() => {
    return data.filter((item) => item.ano === selectedYear);
  }, [data, selectedYear]);

  // 2. Memoização dos Totais Gerais exibidos nos Cards
  const { totalPagamentos, totalInvestimentos, totalDividendos } = useMemo(() => {
    let pagamentosSum = 0;
    let investimentosSum = 0;
    let dividendosSum = 0;

    filteredData.forEach((item) => {
      (item.pagamentos || []).forEach((p) => {
        if (p.status?.toLowerCase() === 'pago') pagamentosSum += p.valor || 0;
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

  // 3. Agrupamento dos Gráficos de Pizza (Distribuição por Tipo e Ativo)
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

  return (
    <div className="flex flex-col gap-6 relative min-h-screen pb-16">
      
      {/* Botão de Atualizar dados Suspenso Flutuante */}
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
        bg-green-600
        hover:bg-green-500
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
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Análise Geral</h1>
          <p className="text-sm text-zinc-400">Acompanhamento e evolução do seu ecossistema financeiro.</p>
        </div>
        <YearSelect selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
      </div>

      {/* Container de Controle dos Cards Mobile/Desktop */}
      <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl md:border-none md:bg-transparent md:p-0">
        <button
          onClick={() => setIsOpencard(!isOpencard)}
          className="w-full flex items-center justify-between px-4 py-3 text-zinc-400 hover:text-white font-semibold text-sm transition-colors md:hidden"
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

      {/* Gráfico Principal */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
      <GraficoComparativoMensal data={filteredData} />
      <GraficoDistribuicao title="Distribuição por Ativo" data={investimentosChartData} />
      </div>

      {/* Grid de Sub-gráficos */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        <GraficoInvestimentosServico data={investimentosPorServico} />
        <GraficoEvolucao data={filteredData} />
      </div>

    </div>
  );
}