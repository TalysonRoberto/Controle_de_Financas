'use client';

import { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

import { createPagamento } from '@/services/paymentService';
import { createInvestimento } from '@/services/investimentoService';
import { createDividendo } from '@/services/dividendoService';
import { getFinanceiroByAno } from '@/services/financeService';

import { MESES_ABREV, TIPOS_INVESTIMENTO, PROPRIETARIOS_PADRAO, getTagColor } from '@/lib/constants';
import type { FinanceiroMes, ModalTipo } from '@/types/finance';

interface FinanceiroItem {
  id: string | number;
  ano: number;
  numero_mes?: number;
}

interface FinanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  tipo: ModalTipo;
  financeiro?: FinanceiroItem | null;
  onSaved?: () => Promise<void> | void;
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
  const [saving, setSaving] = useState(false);
  const [erroGeral, setErroGeral] = useState<string | null>(null);

  const [mesesSelecionados, setMesesSelecionados] = useState<string[]>([]);

  const anoAtual = new Date().getFullYear();
  const [anoSelecionado, setAnoSelecionado] = useState(financeiro?.ano || anoAtual);

  useEffect(() => {
    if (financeiro?.ano) {
      setAnoSelecionado(financeiro.ano);
    }
  }, [financeiro]);

  useEffect(() => {
    if (!isOpen) {
      setServico('');
      setValor('');
      setTipoInvestimento('crypto');
      setProprietario('Talyson');
      setMesesSelecionados([]);
      setErroServico(false);
      setErroGeral(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  async function handleSave() {
    try {
      setErroGeral(null);

      if (!servico.trim()) {
        setErroServico(true);
        setErroGeral('Informe o nome do serviço.');
        return;
      }
      setErroServico(false);

      if (tipo === 'pagamentos' && mesesSelecionados.length === 0) {
        setErroGeral('Selecione pelo menos 1 mês para a recorrência.');
        return;
      }

      setSaving(true);

      const registros: Array<{
        financeiro_id: string | number;
        servico: string;
        valor: number;
        status: string;
        proprietario?: string;
        tipo?: string;
      }> = [];

      if (tipo === 'pagamentos') {
        const mesesFinanceiro: FinanceiroItem[] = await getFinanceiroByAno(anoSelecionado);

        mesesSelecionados.forEach((mesSigla) => {
          const indiceMes = MESES_ABREV.indexOf(mesSigla as typeof MESES_ABREV[number]) + 1;
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

      if (tipo === 'investimentos' || tipo === 'dividendos') {
        if (!financeiro?.id) {
          setErroGeral('ID financeiro não mapeado para este mês.');
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

      onClose();
      if (onSaved) {
        await onSaved();
      }
    } catch (error) {
      console.error(error);
      setErroGeral('Erro ao salvar registro. Tente novamente.');
    } finally {
      setSaving(false);
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
    if (mesesSelecionados.length === MESES_ABREV.length) {
      setMesesSelecionados([]);
    } else {
      setMesesSelecionados([...MESES_ABREV]);
    }
  };

  const todosMarcados = mesesSelecionados.length === MESES_ABREV.length;

  const tituloModal = tipo === 'pagamentos'
    ? 'Novo Pagamento'
    : tipo === 'investimentos'
      ? 'Novo Investimento'
      : 'Novo Dividendo';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={tituloModal}>
      <div className="flex flex-col gap-3 sm:gap-4">
        
        {erroGeral && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 p-2 rounded-lg text-xs font-medium animate-fadeIn">
            <span>{erroGeral}</span>
          </div>
        )}

        {/* LINHA 1: SERVIÇO E PROPRIETÁRIO */}
        <div className={`grid grid-cols-1 ${tipo === 'pagamentos' ? 'sm:grid-cols-2' : 'grid-cols-1'} gap-3 sm:gap-4`}>
          <Input
            label={tipo === 'pagamentos' ? 'Serviço' : tipo === 'investimentos' ? 'Investimento' : 'Dividendo'}
            value={servico}
            onChange={(e) => setServico(e.target.value)}
            placeholder={
              tipo === 'pagamentos'
                ? 'Netflix, Internet...'
                : tipo === 'investimentos'
                  ? 'MXRF11, Bitcoin, IVVB11...'
                  : 'Dividendos recebidos'
            }
            error={erroServico}
          />

          {tipo === 'pagamentos' && (
            <div className="flex flex-col gap-2">
              <label className="text-xs sm:text-sm font-semibold text-muted-foreground">Proprietário</label>
              <div className="flex bg-muted/50 border border-border p-0.5 rounded-lg sm:rounded-xl h-10 sm:h-11 items-center gap-0.5">
                {PROPRIETARIOS_PADRAO.map((nome) => {
                  const isSelected = proprietario === nome;
                  return (
                    <button
                      key={nome}
                      type="button"
                      onClick={() => setProprietario(nome)}
                      aria-pressed={isSelected}
                      className={`flex-1 h-9 sm:h-11 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all ${
                        isSelected
                          ? 'bg-emerald-500 text-white shadow-md'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
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
        <Input
          label="Valor"
          type="number"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          placeholder="R$ 0,00"
        />

        {/* RECORRÊNCIA (APENAS PAGAMENTOS) */}
        {tipo === 'pagamentos' && (
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <label className="text-xs sm:text-sm font-semibold text-muted-foreground">Recorrência</label>
              <div className="flex items-center gap-2.5">
                <span className="text-[11px] text-muted-foreground font-medium select-none">Marcar Todos</span>
                <button
                  type="button"
                  onClick={toggleTodos}
                  aria-pressed={todosMarcados}
                  aria-label={todosMarcados ? 'Desmarcar todos os meses' : 'Marcar todos os meses'}
                  className={`relative w-10 h-5.5 rounded-full transition-all duration-300 focus:outline-none p-0.5 ${
                    todosMarcados ? 'bg-emerald-500' : 'bg-muted border border-border'
                  }`}
                >
                  <div
                    className={`w-4.5 h-4.5 rounded-full bg-background shadow-md transition-all duration-300 transform ${
                      todosMarcados ? 'translate-x-4.5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-12 gap-1.5 bg-muted/30 p-2 rounded-lg sm:rounded-xl border border-border/50">
              {MESES_ABREV.map((mes) => {
                const isSelected = mesesSelecionados.includes(mes);
                return (
                  <button
                    key={mes}
                    type="button"
                    onClick={() => toggleMes(mes)}
                    aria-pressed={isSelected}
                    className="flex flex-col items-center gap-1 group focus:outline-none py-1 rounded-lg hover:bg-accent/30 sm:hover:bg-transparent"
                  >
                    <div
                      className={`w-6 h-6 rounded transition-all duration-200 flex items-center justify-center ${
                        isSelected
                          ? 'bg-emerald-500 scale-100 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                          : 'bg-muted border border-border hover:border-muted-foreground/50 scale-95'
                      }`}
                    />
                    <span className={`text-[9px] font-bold transition-colors select-none ${
                      isSelected ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
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
            <label className="text-xs sm:text-sm font-semibold text-muted-foreground">Tipo</label>
            <div className="flex flex-wrap gap-1 sm:gap-1.5 bg-muted/30 p-2 sm:p-3 rounded-lg sm:rounded-xl border border-border/50">
              {TIPOS_INVESTIMENTO.map((tag) => {
                const isSelected = tipoInvestimento.toLowerCase() === tag.toLowerCase();
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setTipoInvestimento(tag)}
                    aria-pressed={isSelected}
                    className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition-all border ${
                      isSelected
                        ? `${getTagColor(tag, 'modal')} border-white/10 scale-105 shadow-md`
                        : 'bg-card border-border text-muted-foreground hover:text-foreground'
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
        <Button
          onClick={handleSave}
          loading={saving}
          size="lg"
          className="w-full mt-2 sm:mt-4"
        >
          Salvar Registro
        </Button>
      </div>
    </Modal>
  );
}
