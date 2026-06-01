'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

import {createPagamento} from '@/services/paymentService';

import {getFinanceiroByAno} from '@/services/financeService';

export default function FinanceModal({ isOpen, onClose, tipo, financeiro = null, }) {
  const [proprietario, setProprietario] = useState('Talyson');
  const [tipoInvestimento, setTipoInvestimento] = useState('crypto');
  const proprietarios = ['Talyson', 'Mikaelly'];
  const mesesAno = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
  const [mesesSelecionados, setMesesSelecionados] = useState<string[]>(mesesAno);
  const [servico, setServico] = useState('');
  const [valor, setValor] = useState('');

  const anoAtual = new Date().getFullYear();

  const [anoSelecionado, setAnoSelecionado] = useState(
    financeiro?.ano || anoAtual
  );

  // Função para salvar o registro
  async function handleSave() {
    try {
      const mesesAno = [
        'JAN',
        'FEV',
        'MAR',
        'ABR',
        'MAI',
        'JUN',
        'JUL',
        'AGO',
        'SET',
        'OUT',
        'NOV',
        'DEZ',
      ];

      const mesesFinanceiro = await getFinanceiroByAno(
        anoSelecionado
      );

      let registros = [];

      // nenhum mês marcado
      if (mesesSelecionados.length === 0) {
        registros.push({
          financeiro_id: financeiro.id,
          servico,
          proprietario,
          valor: Number(valor),
          status: 'pendente',
        });
      }

      // recorrência
      else {
        mesesSelecionados.forEach((mesSigla) => {
          const indiceMes =
            mesesAno.indexOf(mesSigla) + 1;

          const financeiroMes = mesesFinanceiro.find(
            (item) => item.numero_mes === indiceMes
          );

          if (!financeiroMes) return;

          registros.push({
            financeiro_id: financeiroMes.id,
            servico,
            proprietario,
            valor: Number(valor),
            status: 'pendente',
          });
        });
      }

      await createPagamento(registros);

      onClose();
    } catch (error) {
      console.error(error);
    }
  }
  // Função para alternar a seleção de um mês específico
  const toggleMes = (mes: string) => {
    if (mesesSelecionados.includes(mes)) {
      setMesesSelecionados(mesesSelecionados.filter((m) => m !== mes));
    } else {
      setMesesSelecionados([...mesesSelecionados, mes]);
    }
  };
  // Função para alternar a seleção de todos os meses
  const toggleTodos = () => {
    if (mesesSelecionados.length === mesesAno.length) {
      setMesesSelecionados([]); // Desmarca tudo
    } else {
      setMesesSelecionados(mesesAno); // Marca tudo
    }
  };

  const todosMarcados = mesesSelecionados.length === mesesAno.length;

  if (!isOpen) return null;

  // Lista de tipos de investimentos/dividendos baseados nas imagens
  const tiposTags = ['crypto', 'FIIs', 'CDB', 'Tesouro Direto', 'Ações', 'LCI e LCA', 'ETFs'];

  // Cores dinâmicas para as Tags baseadas nos prints
  const getTagColor = (tag: string) => {
    switch (tag.toLowerCase()) {
      case 'crypto': return 'bg-emerald-500 text-white';
      case 'fiis': return 'bg-amber-700 text-white';
      case 'cdb': return 'bg-yellow-500 text-zinc-950';
      case 'tesouro direto': return 'bg-cyan-600 text-white';
      case 'ações': return 'bg-red-600 text-white';
      case 'lci e lca': return 'bg-lime-600 text-white';
      case 'etfs': return 'bg-purple-600 text-white';
      default: return 'bg-zinc-700 text-white';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      {/* CARD MODAL */}
      <div className="relative w-[650px] bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 rounded-[32px] p-8 shadow-[0_25px_80px_rgba(0,0,0,0.6)] text-white">
        
        {/* BOTÃO FECHAR */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-11 h-11 rounded-2xl bg-zinc-800 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 flex items-center justify-center transition-all"
        >
          <X size={18} />
        </button>

        {/* TÍTULO DINÂMICO */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight capitalize">
            {tipo === 'pagamentos' ? 'Pagamento' : tipo}
          </h2>
        </div>

        {/* FORMULÁRIO (APENAS VISUAL) */}
        <div className="flex flex-col gap-6">
          
          {/* LINHA 1: SERVIÇO E PROPRIETÁRIO/TIPO */}
          <div className={`grid ${tipo === 'pagamentos' ? 'grid-cols-2' : 'grid-cols-1'} gap-6`}>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-zinc-300">Serviço</label>
              <input
                type="text"
                value={servico}
                onChange={(e) => setServico(e.target.value)}
                placeholder="Nome do serviço"
                className="
                  w-full h-14 px-4 rounded-2xl
                  bg-zinc-950 border border-zinc-800
                  text-zinc-200 placeholder-zinc-600
                  focus:outline-none focus:border-zinc-700
                "
              />
            </div>

           {/* SE FOR PAGAMENTO, MOSTRA OS PROPRIETÁRIOS */}
            {tipo === 'pagamentos' && (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-zinc-300">Proprietário</label>
                
                <div className="flex bg-zinc-950 border border-zinc-800 p-1 rounded-2xl h-14 items-center gap-1">
                  {proprietarios.map((nome) => {
                    const isSelected = proprietario === nome;
                    
                    return (
                      <button
                        key={nome}
                        type="button"
                        onClick={() => setProprietario(nome)}
                        className={`
                          flex-1 h-11 rounded-xl text-sm font-bold transition-all
                          ${
                            isSelected 
                              ? 'bg-emerald-500 text-white shadow-md' 
                              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
                          }
                        `}
                      >
                        {nome}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* LINHA 2: VALOR E RECORRÊNCIA (SE FOR PAGAMENTO) */}
          <div className="grid gap-6 items-start">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-zinc-300">Valor</label>
              <input
                type="number"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                placeholder="Valor"
                className="
                  w-full h-14 px-4 rounded-2xl
                  bg-zinc-950 border border-zinc-800
                  text-zinc-200 placeholder-zinc-600
                  focus:outline-none focus:border-zinc-700
                "
              />
            </div>

            {tipo === 'pagamentos' && (
              <div className="flex flex-col gap-4">
                {/* LABEL E INTERRUPTOR DE MARCAR TODOS */}
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-zinc-300">Recorrência</label>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-zinc-400 font-medium select-none">Marcar Todos</span>
                    
                    {/* SWITCH CUSTOMIZADO (INTERRUPTOR) */}
                    <button
                      type="button"
                      onClick={toggleTodos}
                      className={`
                        relative w-12 h-6 rounded-full transition-all duration-300 focus:outline-none p-0.5
                        ${todosMarcados ? 'bg-emerald-500' : 'bg-zinc-800 border border-zinc-700'}
                      `}
                    >
                      <div
                        className={`
                          w-5 h-5 rounded-full bg-zinc-950 shadow-md transition-all duration-300 transform
                          ${todosMarcados ? 'translate-x-6' : 'translate-x-0'}
                        `}
                      />
                    </button>
                  </div>
                </div>

                {/* GRID DE MESES INTERATIVOS */}
                <div className="grid grid-cols-12 gap-1.5 bg-zinc-950/20 p-2 rounded-2xl border border-zinc-800/40">
                  {mesesAno.map((mes) => {
                    const isSelected = mesesSelecionados.includes(mes);
                    
                    return (
                      <button
                        key={mes}
                        type="button"
                        onClick={() => toggleMes(mes)}
                        className="flex flex-col items-center gap-1.5 group focus:outline-none"
                      >
                        {/* Quadrado Indicador */}
                        <div
                          className={`
                            w-8 h-8 rounded-md transition-all duration-200 cursor-pointer flex items-center justify-center
                            ${
                              isSelected
                                ? 'bg-emerald-500 scale-100 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                                : 'bg-zinc-800 border border-zinc-700/60 hover:border-zinc-500 scale-95'
                            }
                          `}
                        />
                        
                        {/* Label do Mês */}
                        <span
                          className={`
                            text-[10px] font-bold transition-colors select-none
                            ${isSelected ? 'text-zinc-400' : 'text-zinc-600 group-hover:text-zinc-400'}
                          `}
                        >
                          {mes}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* SE FOR INVESTIMENTOS OU DIVIDENDOS, EXIBE AS TAGS DE TIPOS ABAIXO */}
          {tipo !== 'pagamentos' && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-zinc-300">Tipo</label>
              <div className="flex flex-wrap gap-2 bg-zinc-950/40 p-4 rounded-2xl border border-zinc-800/60">
                {tiposTags.map((tag) => {
                  const isSelected = tipoInvestimento.toLowerCase() === tag.toLowerCase();
                  return (
                    <button
                      key={tag}
                      onClick={() => setTipoInvestimento(tag)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all border ${
                        isSelected 
                          ? `${getTagColor(tag)} border-white/20 scale-105 shadow-md` 
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* BOTÃO DE SALVAR PROVISÓRIO */}
          <button 
          onClick={handleSave}
          className="w-full h-14 mt-4 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-bold rounded-2xl transition-all">
            Salvar Registro
          </button>

        </div>
      </div>
    </div>
  );
}