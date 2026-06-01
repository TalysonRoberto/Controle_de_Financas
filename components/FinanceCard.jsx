'use client';

import { Plus } from 'lucide-react';

export default function FinanceCard({
  titulo,
  colunas,
  dados,
  total,
  totalColor = 'text-green-400',
  renderRow,
  onAdd,
}) {
  return (
    <div
      className="
        bg-zinc-900
        rounded-2xl
        border border-zinc-800
        flex flex-col
        justify-between
        min-h-[580px]
        shadow-xl
      "
    >
      <div className="p-5">
        <h2 className="text-white font-bold text-lg mb-2">{titulo}</h2>

        {/* 1. TABELA DE DADOS */}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-zinc-300 font-semibold border-b border-zinc-800 text-sm">
              {colunas.map((coluna) => (
                <th key={coluna} className="pb-2 justify-between">
                  {coluna}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-zinc-400 text-sm font-medium">
            {dados.map(renderRow)}
          </tbody>
        </table>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* BOTÃO DE ADICIONAR NOVO ITEM */}
        <button
          onClick={onAdd}
          className="
            self-end
            flex items-center gap-1
            bg-zinc-800
            border border-zinc-700
            text-zinc-200
            text-xs
            font-semibold
            px-3 py-1.5
            rounded-xl
            hover:bg-zinc-700
            transition-colors
          "
        >
          <Plus className="w-3.5 h-3.5" />
          Adicionar
        </button>

        {/* TOTAL GERAL DO CARD */}
        <div
          className="
            bg-zinc-950
            p-4
            rounded-xl
            border border-zinc-800
            flex justify-between items-center
          "
        >
          <span className="text-zinc-500 text-sm font-semibold">Total:</span>

          <span className={`text-lg font-bold ${totalColor}`}>R$ {total}</span>
        </div>
      </div>
    </div>
  );
}
