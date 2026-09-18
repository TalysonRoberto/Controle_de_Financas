import FinanceiroRow from './FinanceiroRow';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { Wallet } from 'lucide-react';
import type { FinanceiroMes } from '@/types/finance';

interface FinanceiroTableProps {
  data: FinanceiroMes[];
  inicializarAno: () => void;
}

export default function FinanceiroTable({ data = [], inicializarAno }: FinanceiroTableProps) {
  return (
    <div className="mt-2 bg-card border border-border rounded-lg overflow-hidden shadow-md">
      {/* Header desktop */}
      <div className="
        hidden md:grid md:grid-cols-5
        bg-muted/50 backdrop-blur
        px-3 py-2 text-muted-foreground
        text-[10px] uppercase tracking-wider
      ">
        <span>Mês</span>
        <span>Pagamentos</span>
        <span>Investido</span>
        <span>Dividendos</span>
        <span className="text-right">Status</span>
      </div>

      {/* Rows Container */}
      <div className="
        md:max-h-[55vh]
        overflow-y-auto
        divide-y divide-border/30
        custom-scrollbar
      ">
        {data.map((item) => (
          <FinanceiroRow key={item.id} item={item} />
        ))}

        {data.length === 0 && (
          <EmptyState
            icon={Wallet}
            message="Nenhum registro financeiro encontrado para este ano."
          />
        )}

        {data.length > 0 && data.length < 12 && (
          <div className="flex justify-center py-4 px-3">
            <Button
              onClick={inicializarAno}
              variant="primary"
              className="w-full sm:w-auto"
            >
              Inicializar meses do ano
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
