'use client';

import { TrendingUp, Wallet, CreditCard, LucideIcon } from 'lucide-react';
import { formatBRL } from '@/lib/format';

interface CardData {
  title: string;
  value: number;
  icon: LucideIcon;
  iconColor: string;
}

interface DashboardCardsProps {
  totalInvestimentos: number;
  totalDividendos: number;
  totalPagamentos: number;
}

export default function DashboardCards({
  totalInvestimentos,
  totalDividendos,
  totalPagamentos,
}: DashboardCardsProps) {
  const cards: CardData[] = [
    {
      title: 'Investimentos',
      value: totalInvestimentos,
      icon: TrendingUp,
      iconColor: 'text-emerald-400',
    },
    {
      title: 'Dividendos',
      value: totalDividendos,
      icon: Wallet,
      iconColor: 'text-cyan-400',
    },
    {
      title: 'Gastos',
      value: totalPagamentos,
      icon: CreditCard,
      iconColor: 'text-red-400',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 md:gap-3 mt-1">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-card border border-border rounded-lg p-2 md:p-3 flex flex-col gap-1"
          >
            <div className="flex items-center gap-1">
              <Icon className={`${card.iconColor} w-3 h-3`} />
              <span className="text-muted-foreground text-[9px] uppercase tracking-wider truncate">
                {card.title}
              </span>
            </div>
            <span className="text-sm font-semibold text-foreground truncate tabular-nums">
              {formatBRL(card.value)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
