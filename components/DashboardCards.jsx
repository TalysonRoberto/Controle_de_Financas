//=============================================
// Esse arquivo é responsável por renderizar os cards de resumo no dashboard. Ele exibe informações como o total de investimentos, dividendos e gastos, utilizando ícones e estilos para destacar cada categoria. O componente recebe os valores como props e os formata para exibição, proporcionando uma visão rápida e clara do desempenho financeiro do usuário.
//============================================

import { TrendingUp, Wallet, CreditCard, ArrowLeftRight } from 'lucide-react';

export default function DashboardCards({
  totalInvestimentos,
  totalDividendos,
  totalPagamentos,
}) {
  // Função auxiliar para formatar os valores com segurança
  const formatValue = (value) => {
    if (value === '00,00' || !value) return 'R$ 00,00';

    // Converte para número caso venha como string numérica da API
    const parsedNumber = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(parsedNumber)) return 'R$ 00,00';

    return parsedNumber.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const cards = [
    {
      title: 'Investimentos',
      value: totalInvestimentos,
      icon: TrendingUp,
      color: 'text-emerald-500',
      borderColor: 'border-emerald-500',
    },
    {
      title: 'Dividendos',
      value: totalDividendos,
      icon: Wallet,
      color: 'text-cyan-500',
      borderColor: 'border-cyan-500',
    },
    {
      title: 'Gastos',
      value: totalPagamentos,
      icon: CreditCard,
      color: 'text-red-500',
      borderColor: 'border-red-500',
    },
    {
      title: 'Resgatado',
      value: '00,00',
      icon: ArrowLeftRight,
      color: 'text-white',
      borderColor: 'border-zinc-800',
    },
  ];

  return (
    /* Melhoria Mobile: Ajustado o grid para alternar de 1 para 2 colunas em telas menores e 4 em desktop */
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-2">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`
              bg-zinc-900
              border
              ${card.borderColor}
              rounded-xl
              p-4
              flex
              items-center
              justify-between
              shadow-lg
            `}
          >
            <div className="flex-1 min-w-0 pr-2">
              <p className="text-zinc-400 text-xs sm:text-sm uppercase tracking-wider font-medium">
                {card.title}
              </p>

              {/* Melhoria Mobile: Responsividade no tamanho da fonte (text-2xl no celular, text-3xl/4xl em telas maiores) */}
              <h2 className="text-2xl xs:text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-2 truncate">
                {formatValue(card.value)}
              </h2>
            </div>

            {/* Melhoria Mobile: Ícone diminui ligeiramente no celular para não esmagar o texto */}
            <Icon
              className={`${card.color} w-8 h-8 md:w-10 md:h-10 flex-shrink-0`}
            />
          </div>
        );
      })}
    </div>
  );
}
