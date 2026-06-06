'use client';

import { useMemo } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const MESES_MAP = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

export default function GraficoEvolucao({ data }: { data: any[] }) {
  const chartData = useMemo(() => {
    let acumulado = 0;

    // Inicializa a linha do tempo do ano base mapeado por ordem cronológica correta
    const linhaDoTempo = MESES_MAP.map((nomeMes) => ({
      mes: nomeMes,
      acumulado: 0
    }));

    data.forEach((item) => {
      const stringMes = item.mes?.substring(0, 3).toUpperCase();
      const indexMes = MESES_MAP.findIndex((m) => m === stringMes || item.mes?.toLowerCase().includes(m.toLowerCase()));
      
      if (indexMes !== -1) {
        const investimentosDoMes = (item.investimentos || []).reduce(
          (acc: number, inv: any) => acc + (inv.valor || 0), 
          0
        );
        acumulado += investimentosDoMes;
        linhaDoTempo[indexMes].acumulado = acumulado;
      }
    });

    // Ajusta os meses seguintes se houver lacunas sem lançamentos para manter a linha contínua do patrimônio acumulado
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
    <div className="bg-zinc-900 border border-zinc-800/80 rounded-2xl p-6 shadow-xl flex flex-col justify-between min-h-[460px]">
      <h2 className="text-lg font-bold text-white tracking-tight mb-4">Evolução Patrimonial</h2>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid stroke="#27272a" strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="mes" stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} dy={10} />
            <YAxis 
              stroke="#71717a" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(value) => `R$ ${value >= 1000 ? (value / 1000) + 'k' : value}`}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px' }}
              itemStyle={{ color: '#e4e4e7', fontSize: '13px' }}
              formatter={(value) => [Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), 'Patrimônio']}
            />
            <Line
              type="monotone"
              dataKey="acumulado"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ r: 4, stroke: '#10b981', strokeWidth: 1, fill: '#09090b' }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}