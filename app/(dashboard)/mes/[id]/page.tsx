import MonthPageClient from './MonthPageClient';

export function generateStaticParams() {
  // Gera páginas estáticas para os IDs 1 a 100
  // cobre os meses atuais e futuros; o conteúdo é carregado no cliente
  return Array.from({ length: 100 }, (_, i) => ({
    id: String(i + 1),
  }));
}

export default function FinanceiroMesPage() {
  return <MonthPageClient />;
}
