'use client';

import React from 'react';
import { Plus, Wallet } from 'lucide-react';

interface FinanceCardProps<T> {
  titulo: string;
  colunas: string[];
  dados: T[];
  total: number;
  totalColor?: string;
  renderRow: (item: T, index: number) => React.ReactNode;
  onAdd: () => void;
}

export default function FinanceCard<T extends { id: string | number }>({
  titulo,
  colunas,
  dados = [],
  total,
  totalColor = 'text-green-400',
  renderRow,
  onAdd,
}: FinanceCardProps<T>) {
  // Define dinamicamente o grid com base na quantidade de colunas (3 ou 4)
  const gridColsClass = colunas.length === 4 
    ? 'md:grid-cols-[2fr_1fr_1fr_1fr]' // Pagamentos
    : 'md:grid-cols-[2fr_1fr_1fr]';    // Investimentos e Dividendos

  return (
    <div className="bg-zinc-900 rounded-2xl border border-zinc-800/80 flex flex-col justify-between min-h-[580px] shadow-2xl overflow-hidden">
      <div className="p-4 flex-1 flex flex-col min-w-0">
        
        {/* CABEÇALHO */}
        <div className="flex items-center justify-between mb-4 gap-2">
          <h2 className="text-white font-bold text-lg tracking-tight truncate">{titulo}</h2>
          <button
            onClick={onAdd}
            className="flex items-center gap-1.5 bg-zinc-800/60 border border-zinc-700/60 text-zinc-200 text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-zinc-700 hover:text-white transition-all active:scale-95 shrink-0"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Adicionar</span>
          </button>
        </div>

        {/* LISTA E PLANILHA */}
        <div className="flex-1 overflow-y-auto max-h-[440px] pr-1 custom-scrollbar">
          {dados.length > 0 ? (
            <div className="flex flex-col gap-1 md:gap-0 divide-y divide-zinc-800/30">
              
              {/* CABEÇALHO DA PLANILHA (Apenas Desktop) */}
              <div className={`hidden md:grid ${gridColsClass} pb-2.5 px-4 text-zinc-500 font-bold text-[11px] uppercase tracking-wider border-b border-zinc-800/80`}>
                {colunas.map((coluna, index) => (
                  <div 
                    key={coluna} 
                    className={index === colunas.length - 1 ? 'text-right' : ''}
                  >
                    {coluna}
                  </div>
                ))}
              </div>

              {/* LINHAS (Renderiza o Row modificado que agora usa divs com grid) */}
              {dados.map((item, index) => renderRow(item, index))}
            </div>
          ) : (
            /* EMPTY STATE */
            <div className="flex flex-col items-center justify-center py-24 gap-2 text-zinc-600">
              <Wallet size={32} className="stroke-[1.5] text-zinc-700" />
              <p className="text-xs font-medium">Nenhum registro lançado.</p>
            </div>
          )}
        </div>
      </div>

      {/* RODAPÉ */}
      <div className="p-5 pt-0">
        <div className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-800/80 flex justify-between items-center backdrop-blur-sm">
          <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Total Geral</span>
          <span className={`text-xl font-extrabold tracking-tight ${totalColor}`}>
            {Number(total || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
        </div>
      </div>
    </div>
  );
}