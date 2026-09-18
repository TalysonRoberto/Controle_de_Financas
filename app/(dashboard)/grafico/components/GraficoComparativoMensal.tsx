'use client';

import { useMemo, useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { MESES_ABREV } from '@/lib/constants';
import { formatBRL, isPago } from '@/lib/format';
import type { FinanceiroMes } from '@/types/finance';

interface ChartData {
  mes: string;
  Pagamentos: number;
  Investimentos: number;
  Dividendos: number;
}

interface TooltipPayload {
  color: string;
  name: string;
  value: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-card border border-border p-3 rounded-xl shadow-2xl backdrop-blur-md">
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
        {label}
      </p>
      <div className="flex flex-col gap-1">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between gap-4 text-xs">
            <span className="flex items-center gap-1.5" style={{ color: entry.color }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              {entry.name}
            </span>
            <span className="font-bold text-foreground">
              {formatBRL(entry.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GraficoComparativoMensal({ data }: { data: FinanceiroMes[] }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const chartData = useMemo<ChartData[]>(() => {
    const estruturaAno: ChartData[] = MESES_ABREV.map((mes) => ({
      mes,
      Pagamentos: 0,
      Investimentos: 0,
      Dividendos: 0,
    }));

    data.forEach((item) => {
      const indexMes = (item.numero_mes || 0) - 1;
      if (indexMes < 0 || indexMes > 11) return;

      estruturaAno[indexMes].Pagamentos = (item.pagamentos || [])
        .filter((p) => isPago(p.status))
        .reduce((acc, p) => acc + (p.valor || 0), 0);

      estruturaAno[indexMes].Investimentos = (item.investimentos || [])
        .reduce((acc, i) => acc + (i.valor || 0), 0);

      estruturaAno[indexMes].Dividendos = (item.dividendos || [])
        .reduce((acc, d) => acc + (d.valor || 0), 0);
    });

    return estruturaAno;
  }, [data]);

  return (
    <div className="bg-card border border-border rounded-xl p-3 md:p-4 shadow-lg hover-lift">
      <h2 className="text-sm font-bold text-foreground tracking-tight mb-3">
        Fluxo Mensal Comparativo
      </h2>

      {/* Legenda Mobile */}
      <div className="md:hidden flex justify-center gap-3 mb-3 text-[10px]">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <span className="text-muted-foreground">Pagamentos</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <span className="text-muted-foreground">Invest.</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-cyan-400" />
          <span className="text-muted-foreground">Dividend.</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className={`${isMobile ? 'min-w-[900px]' : 'w-full'} h-[300px] md:h-[250px]`}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
              <CartesianGrid stroke="#27272a" strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="mes" stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#71717a"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value: number) =>
                  value >= 1000 ? `R$ ${(value / 1000).toFixed(0)}k` : `R$ ${value}`
                }
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#27272a', opacity: 0.2 }} />
              {!isMobile && (
                <Legend
                  verticalAlign="top"
                  height={36}
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
              )}
              <Bar dataKey="Pagamentos" fill="#f87171" radius={[4, 4, 0, 0]} maxBarSize={isMobile ? 14 : 28} />
              <Bar dataKey="Investimentos" fill="#eab308" radius={[4, 4, 0, 0]} maxBarSize={isMobile ? 14 : 28} />
              <Bar dataKey="Dividendos" fill="#22d3ee" radius={[4, 4, 0, 0]} maxBarSize={isMobile ? 14 : 28} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
