'use client';

import React from 'react';
import { Plus, Wallet } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { formatBRL } from '@/lib/format';

interface FinanceCardProps<T> {
  titulo: string;
  colunas: string[];
  dados: T[];
  total: number;
  totalColor?: string;
  renderRow: (item: T, index: number) => React.ReactNode;
  onAdd: () => void;
  className?: string;
}

export default function FinanceCard<T extends { id: string | number }>({
  titulo,
  colunas,
  dados = [],
  total,
  totalColor = 'text-emerald-400',
  renderRow,
  onAdd,
  className = '',
}: FinanceCardProps<T>) {
  const gridColsClass = colunas.length === 4 
    ? 'md:grid-cols-[2fr_1fr_1fr_1fr]'
    : 'md:grid-cols-[2fr_1fr_1fr]';

  return (
    <div className={`bg-card rounded-lg border border-border flex flex-col shadow-md overflow-hidden h-full ${className}`}>
      <div className="p-2.5 md:p-3 flex-1 flex flex-col min-w-0">

        {/* CABEÇALHO */}
        <div className="flex items-center justify-between mb-2 gap-2">
          <h2 className="text-foreground font-bold text-xs tracking-tight truncate">{titulo}</h2>
          <Button
            onClick={onAdd}
            variant="secondary"
            size="sm"
            className="shrink-0 h-6 px-1.5 text-[10px]"
          >
            <Plus className="w-3 h-3 stroke-[2.5]" />
            <span>Novo</span>
          </Button>
        </div>

        {/* LISTA */}
        <div className="flex-1 min-h-0 overflow-y-auto pr-1 custom-scrollbar">
          {dados.length > 0 ? (
            <div className="flex flex-col gap-0.5 md:gap-0 divide-y divide-border/50">
              
              {/* CABEÇALHO DA PLANILHA (Desktop) */}
              <div className={`hidden md:grid ${gridColsClass} pb-2 px-3 text-muted-foreground font-bold text-[10px] uppercase tracking-wider border-b border-border`}>
                {colunas.map((coluna, index) => (
                  <div 
                    key={coluna} 
                    className={index === colunas.length - 1 ? 'text-right' : ''}
                  >
                    {coluna}
                  </div>
                ))}
              </div>

              {/* LINHAS */}
              {dados.map((item, index) => renderRow(item, index))}
            </div>
          ) : (
            <EmptyState
              icon={Wallet}
              message="Nenhum registro lançado."
              className="py-8"
            />
          )}
        </div>
      </div>

      {/* RODAPÉ */}
      <div className="px-2.5 pb-2.5 md:px-3 md:pb-3 pt-0">
        <div className="bg-muted/50 px-2.5 py-2 rounded-md border border-border flex justify-between items-center">
          <span className="text-muted-foreground text-[9px] font-bold uppercase tracking-wider">Total</span>
          <span className={`text-sm font-extrabold tracking-tight ${totalColor}`}>
            {formatBRL(total)}
          </span>
        </div>
      </div>
    </div>
  );
}
