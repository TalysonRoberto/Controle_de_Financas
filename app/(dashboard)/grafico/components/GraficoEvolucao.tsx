'use client';

import { useMemo } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { MESES_ABREV } from '@/lib/constants';
import { formatBRL } from '@/lib/format';
import type { FinanceiroMes } from '@/types/finance';

export default function GraficoEvolucao({ data }: { data: FinanceiroMes[] }) {
  const chartData = useMemo(() => {
    let acumulado = 0;

    const linhaDoTempo = MESES_ABREV.map((nomeMes) => ({
      mes: nomeMes,
      acumulado: 0,
    }));

    data.forEach((item) => {
      const indexMes = (item.numero_mes || 0) - 1;
      if (indexMes < 0 || indexMes > 11) return;

      const investimentosDoMes = (item.investimentos || []).reduce(
        (acc, inv) => acc + (inv.valor || 0),
        0
      );
      acumulado += investimentosDoMes;
      linhaDoTempo[indexMes].acumulado = acumulado;
    });

    let ultimoPatrimonioValido = 0;
    return linhaDoTempo.map((p) => {
      if (p.acumulado === 0) {
        p.acumulado = ultimoPatrimonioValido;
      } else {
        ultimoPatrimonioValido = p.acumulado;
      }
      return p;
    });
  }, [data]);

  return (
    <div className="bg-card border border-border rounded-xl p-3 md:p-4 shadow-lg flex flex-col justify-between min-h-[350px] hover-lift">
      <h2 className="text-sm font-bold text-foreground tracking-tight mb-3">Evolução Patrimonial</h2>
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="mes" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} dy={10} />
            <YAxis
              stroke="var(--muted-foreground)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `R$ ${value >= 1000 ? (value / 1000) + 'k' : value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
                borderRadius: '12px',
                color: 'var(--foreground)',
              }}
              itemStyle={{ color: 'var(--foreground)', fontSize: '13px' }}
              formatter={(value) => [formatBRL(Number(value)), 'Patrimônio']}
            />
            <Line
              type="monotone"
              dataKey="acumulado"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ r: 4, stroke: '#10b981', strokeWidth: 1, fill: 'var(--card)' }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
