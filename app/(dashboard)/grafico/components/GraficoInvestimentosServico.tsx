'use client';

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { formatBRL } from '@/lib/format';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#a855f7', '#ef4444', '#06b6d4', '#84cc16'];

interface ChartItem {
  name: string;
  value: number;
}

export default function GraficoInvestimentosServico({ data }: { data: ChartItem[] }) {
  return (
    <div className="bg-card border border-border rounded-xl p-3 md:p-4 shadow-lg flex flex-col justify-between min-h-[350px] hover-lift">
      <div>
        <h2 className="text-sm font-bold text-foreground tracking-tight">Investimentos por Ativo</h2>
        <p className="text-muted-foreground text-[10px] mt-0.5">Distribuição individual por ativo alocado</p>
      </div>
      
      <div className="h-[250px] w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={95}
              innerRadius={65}
              paddingAngle={3}
              stroke="var(--card)"
              strokeWidth={3}
              label={({ percent }) => `${((percent ?? 0) * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
                borderRadius: '12px',
                color: 'var(--foreground)',
              }}
              itemStyle={{ color: 'var(--foreground)', fontSize: '13px' }}
              formatter={(value) => formatBRL(Number(value))}
            />
            <Legend
              iconType="circle"
              iconSize={6}
              wrapperStyle={{ fontSize: '11px', color: 'var(--muted-foreground)' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
