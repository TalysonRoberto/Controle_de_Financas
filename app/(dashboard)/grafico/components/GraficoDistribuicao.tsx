'use client';

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#22d3ee', '#eab308', '#a855f7', '#f87171', '#3b82f6', '#10b981', '#f97316'];

export default function GraficoDistribuicao({ title, data }: { title: string; data: any[] }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800/80 rounded-2xl p-6 shadow-xl flex flex-col justify-between min-h-[300px]">
      <h2 className="text-lg font-bold text-white tracking-tight mb-2">{title}</h2>
      <div className="h-[320px] w-full flex items-center justify-center">
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
                `${((percent ?? 0) * 100).toFixed(0)}%`
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
            <Legend iconType="circle" iconSize={6} wrapperStyle={{ fontSize: '11px', color: '#a1a1aa' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}