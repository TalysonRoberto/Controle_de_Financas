//=============================================
// Esse arquivo é responsável por renderizar os cards de resumo no dashboard. Ele exibe informações como o total de investimentos, dividendos e gastos, utilizando ícones e estilos para destacar cada categoria. O componente recebe os valores como props e os formata para exibição, proporcionando uma visão rápida e clara do desempenho financeiro do usuário.
//============================================

import { TrendingUp, Wallet, CreditCard, ArrowLeftRight } from 'lucide-react';

export default function DashboardCards({
  totalInvestimentos,
  totalDividendos,
  totalPagamentos,
}) {
  const cards = [
    {
      // Investimentos
      title: 'Investimentos',
      value: totalInvestimentos,
      icon: TrendingUp,
      color: 'text-green-500',
    },
    {
      // Dividendos
      title: 'Dividendos',
      value: totalDividendos,
      icon: Wallet,
      color: 'text-cyan-500',
    },
    {
      // Gastos
      title: 'Gastos',
      value: totalPagamentos,
      icon: CreditCard,
      color: 'text-red-500',
    },
    {
      // Gastos
      title: 'Resgatado',
      value: '00,00',
      icon: ArrowLeftRight,
      color: 'text-white',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-2">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
              bg-zinc-900
              border
              border-zinc-800
              rounded-xl
              p-4
              flex
              items-center
              justify-between
            "
          >
            <div>
              <p className="text-zinc-400 text-sm">{card.title}</p>

              <h2 className="text-4xl font-bold text-white mt-2">
                R$ {card.value}
              </h2>
            </div>

            <Icon size={42} className={card.color} />
          </div>
        );
      })}
    </div>
  );
}
