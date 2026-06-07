'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

import { createPagamento } from '@/services/paymentService';
import { createInvestimento } from '@/services/investimentoService';
import { createDividendo } from '@/services/dividendoService';
import { getFinanceiroByAno } from '@/services/financeService';

// 1. Interfaces estritas para blindar o build do Vercel
interface FinanceiroItem {
  id: string | number;
  ano: number;
  numero_mes?: number;
}

interface FinanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  tipo: 'pagamentos' | 'investimentos' | 'dividendos';
  financeiro?: FinanceiroItem | null;
  onSaved?: () => Promise<void> | void;
}

interface RegistroBase {
  financeiro_id: string | number;
  servico: string;
  valor: number;
  status: string;
  proprietario?: string;
  tipo?: string;
}

export default function FinanceModal({
  isOpen,
  onClose,
  tipo,
  financeiro = null,
  onSaved,
}: FinanceModalProps) {
  const [proprietario, setProprietario] = useState('Talyson');
  const [tipoInvestimento, setTipoInvestimento] = useState('crypto');
  const [servico, setServico] = useState('');
  const [valor, setValor] = useState('');
  const [erroServico, setErroServico] = useState(false);

  const proprietarios = ['Talyson', 'Mikaelly'];
  const mesesAno = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
  const [mesesSelecionados, setMesesSelecionados] = useState<string[]>([]);

  const anoAtual = new Date().getFullYear();
  const [anoSelecionado, setAnoSelecionado] = useState(financeiro?.ano || anoAtual);

  // Sincroniza o ano selecionado caso o objeto financeiro mude
  useEffect(() => {
    if (financeiro?.ano) {
      setAnoSelecionado(financeiro.ano);
    }
  }, [financeiro]);

  if (!isOpen) return null;

  // Função para salvar o registro
  async function handleSave() {
    try {
      // 1. Validação do nome do serviço (já existente no seu código)
      if (!servico.trim()) {
        setErroServico(true);
        alert('Informe o nome.');
        return;
      }
      setErroServico(false);

      // 2. ADICIONE ESSA NOVA VALIDAÇÃO AQUI (Apenas para o tipo pagamentos)
      if (tipo === 'pagamentos' && mesesSelecionados.length === 0) {
        alert('Selecione pelo menos 1 mês para a recorrência.');
        return;
      }

      setErroServico(false);
      const registros: Array<{
        financeiro_id: string | number;
        servico: string;
        valor: number;
        status: string;
        proprietario?: string;
        tipo?: string;
      }> = [];

      // PAGAMENTOS
      if (tipo === 'pagamentos') {
        const mesesFinanceiro: FinanceiroItem[] = await getFinanceiroByAno(anoSelecionado);

        mesesSelecionados.forEach((mesSigla) => {
          const indiceMes = mesesAno.indexOf(mesSigla) + 1;
          const financeiroMes = mesesFinanceiro.find((item) => item.numero_mes === indiceMes);

          if (!financeiroMes) return;

          registros.push({
            financeiro_id: financeiroMes.id,
            servico,
            proprietario,
            valor: Number(valor || 0),
            status: 'pendente',
          });
        });

        if (registros.length > 0) {
          await createPagamento(registros);
        }
      }

      // INVESTIMENTOS & DIVIDENDOS (Exigem validação do objeto financeiro pai)
      if (tipo === 'investimentos' || tipo === 'dividendos') {
        if (!financeiro?.id) {
          alert('Erro: ID financeiro não mapeado para este mês.');
          return;
        }

        registros.push({
          financeiro_id: financeiro.id,
          servico,
          tipo: tipoInvestimento,
          valor: Number(valor || 0),
          status: tipo === 'investimentos' ? 'investido' : 'recebido',
        });

        if (tipo === 'investimentos') {
          await createInvestimento(registros);
        } else {
          await createDividendo(registros);
        }
      }

      // Limpa o formulário com segurança
      setServico('');
      setValor('');
      setTipoInvestimento('crypto');
      setProprietario('Talyson');

      onClose();
      if (onSaved) {
        await onSaved();
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar registro.');
    }
  }

  const toggleMes = (mes: string) => {
    if (mesesSelecionados.includes(mes)) {
      setMesesSelecionados(mesesSelecionados.filter((m) => m !== mes));
    } else {
      setMesesSelecionados([...mesesSelecionados, mes]);
    }
  };

  const toggleTodos = () => {
    if (mesesSelecionados.length === mesesAno.length) {
      setMesesSelecionados([]);
    } else {
      setMesesSelecionados(mesesAno);
    }
  };

  const todosMarcados = mesesSelecionados.length === mesesAno.length;
  const tiposTags = ['crypto', 'FIIs', 'CDB', 'Tesouro Direto', 'Ações', 'LCI e LCA', 'ETFs'];

  const getTagColor = (tag: string) => {
    switch (tag.toLowerCase()) {
      case 'crypto': return 'bg-emerald-600 text-white';
      case 'fiis': return 'bg-amber-700 text-white';
      case 'cdb': return 'bg-yellow-600 text-zinc-950';
      case 'tesouro direto': return 'bg-cyan-600 text-white';
      case 'ações': return 'bg-red-600 text-white';
      case 'lci e lca': return 'bg-lime-600 text-white';
      case 'etfs': return 'bg-purple-600 text-white';
      default: return 'bg-zinc-700 text-white';
    }
  };

  return (
    // Melhoria Mobile: px-4 adicionado para o modal respirar nas bordas em telas pequenas
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4 py-6 overflow-y-auto">
      
      {/* CARD MODAL RESPONSIVO */}
      <div className="relative w-full max-w-[650px] my-auto bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.6)] text-white max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-zinc-800 [&::-webkit-scrollbar-thumb]:rounded-full">
        
        {/* BOTÃO FECHAR COMPACTO */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-zinc-800 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 flex items-center justify-center transition-all z-10"
        >
          <X size={16} />
        </button>

        {/* TÍTULO */}
        <div className="mb-6 sm:mb-8 pr-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight capitalize">
            {tipo === 'pagamentos' ? 'Novo Pagamento' : `Novo ${tipo.slice(0, -1)}`}
          </h2>
        </div>

        {/* FORMULÁRIO */}
        <div className="flex flex-col gap-5 sm:gap-6">
          
          {/* LINHA 1: SERVIÇO E PROPRIETÁRIO */}
          <div className={`grid grid-cols-1 ${tipo === 'pagamentos' ? 'sm:grid-cols-2' : 'grid-cols-1'} gap-4 sm:gap-6`}>
            <div className="flex flex-col gap-2">
              <label className="text-xs sm:text-sm font-semibold text-zinc-300">
                {tipo === 'pagamentos' ? 'Serviço' : tipo === 'investimentos' ? 'Investimento' : 'Dividendo'}
              </label>
              <input
                type="text"
                value={servico}
                onChange={(e) => setServico(e.target.value)}
                placeholder={
                  tipo === 'pagamentos'
                    ? 'Netflix, Internet...'
                    : tipo === 'investimentos'
                      ? 'MXRF11, Bitcoin, IVVB11...'
                      : 'Dividendos recebidos'
                }
                className={`w-full h-12 sm:h-14 px-4 rounded-xl sm:rounded-2xl bg-zinc-950 text-zinc-200 border text-sm ${
                  erroServico ? 'border-red-500' : 'border-zinc-800'
                } focus:outline-none focus:border-zinc-700`}
              />
            </div>

            {tipo === 'pagamentos' && (
              <div className="flex flex-col gap-2">
                <label className="text-xs sm:text-sm font-semibold text-zinc-300">Proprietário</label>
                <div className="flex bg-zinc-950 border border-zinc-800 p-1 rounded-xl sm:rounded-2xl h-12 sm:h-14 items-center gap-1">
                  {proprietarios.map((nome) => {
                    const isSelected = proprietario === nome;
                    return (
                      <button
                        key={nome}
                        type="button"
                        onClick={() => setProprietario(nome)}
                        className={`flex-1 h-9 sm:h-11 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all ${
                          isSelected
                            ? 'bg-emerald-500 text-white shadow-md'
                            : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
                        }`}
                      >
                        {nome}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* LINHA 2: VALOR */}
          <div className="flex flex-col gap-2">
            <label className="text-xs sm:text-sm font-semibold text-zinc-300">Valor</label>
            <input
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="R$ 0,00"
              className="w-full h-12 sm:h-14 px-4 rounded-xl sm:rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-200 placeholder-zinc-600 text-sm focus:outline-none focus:border-zinc-700"
            />
          </div>

          {/* RECORRÊNCIA (APENAS PAGAMENTOS) */}
          {tipo === 'pagamentos' && (
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <label className="text-xs sm:text-sm font-semibold text-zinc-300">Recorrência</label>
                <div className="flex items-center gap-2.5">
                  <span className="text-[11px] text-zinc-400 font-medium select-none">Marcar Todos</span>
                  <button
                    type="button"
                    onClick={toggleTodos}
                    className={`relative w-10 h-5.5 rounded-full transition-all duration-300 focus:outline-none p-0.5 ${
                      todosMarcados ? 'bg-emerald-500' : 'bg-zinc-800 border border-zinc-700'
                    }`}
                  >
                    <div
                      className={`w-4.5 h-4.5 rounded-full bg-zinc-950 shadow-md transition-all duration-300 transform ${
                        todosMarcados ? 'translate-x-4.5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Melhoria Mobile: Mudado de grid-cols-12 fixo para grid-cols-4 no celular e grid-cols-12 no PC */}
              <div className="grid grid-cols-4 sm:grid-cols-12 gap-2 bg-zinc-950/20 p-2.5 rounded-xl sm:rounded-2xl border border-zinc-800/40">
                {mesesAno.map((mes) => {
                  const isSelected = mesesSelecionados.includes(mes);
                  return (
                    <button
                      key={mes}
                      type="button"
                      onClick={() => toggleMes(mes)}
                      className="flex flex-col items-center gap-1 group focus:outline-none py-1 rounded-lg hover:bg-zinc-800/20 sm:hover:bg-transparent"
                    >
                      <div
                        className={`w-7 h-7 rounded-md transition-all duration-200 flex items-center justify-center ${
                          isSelected
                            ? 'bg-emerald-500 scale-100 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                            : 'bg-zinc-800 border border-zinc-700/60 hover:border-zinc-500 scale-95'
                        }`}
                      />
                      <span className={`text-[9px] font-bold transition-colors select-none ${
                        isSelected ? 'text-zinc-300' : 'text-zinc-500 group-hover:text-zinc-400'
                      }`}>
                        {mes}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAGS (INVESTIMENTOS / DIVIDENDOS) */}
          {tipo !== 'pagamentos' && (
            <div className="flex flex-col gap-2">
              <label className="text-xs sm:text-sm font-semibold text-zinc-300">Tipo</label>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 bg-zinc-950/40 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-zinc-800/60">
                {tiposTags.map((tag) => {
                  const isSelected = tipoInvestimento.toLowerCase() === tag.toLowerCase();
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setTipoInvestimento(tag)}
                      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold uppercase transition-all border ${
                        isSelected
                          ? `${getTagColor(tag)} border-white/10 scale-105 shadow-md`
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

          {/* BOTÃO DE AÇÃO */}
          <button
            onClick={handleSave}
            className="w-full h-12 sm:h-14 mt-2 sm:mt-4 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-bold rounded-xl sm:rounded-2xl shadow-lg shadow-emerald-950/20 transition-all text-sm"
          >
            Salvar Registro
          </button>

        </div>
      </div>
    </div>
  );
}