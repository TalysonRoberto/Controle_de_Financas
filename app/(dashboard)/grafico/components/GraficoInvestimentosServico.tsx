'use client';

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#a855f7', '#ef4444', '#06b6d4', '#84cc16'];

export default function GraficoInvestimentosServico({ data }: { data: any[] }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800/80 rounded-2xl p-6 shadow-xl flex flex-col justify-between min-h-[460px]">
      <div>
        <h2 className="text-lg font-bold text-white tracking-tight">Investimentos por Ativo</h2>
        <p className="text-zinc-500 text-xs mt-0.5">Distribuição individual por ativo alocado</p>
      </div>
      
      <div className="h-[300px] w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
           <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={95}
            innerRadius={65}
            paddingAngle={3}
            stroke="#18181b"
            strokeWidth={3}
            label={({ percent }) =>
              `${(percent * 100).toFixed(0)}%`
            }
            labelLine={false}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px' }}
              itemStyle={{ color: '#e4e4e7', fontSize: '13px' }}
              formatter={(value) => Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            />
            <Legend iconType="circle" iconSize={6} wrapperStyle={{ fontSize: '11px' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}