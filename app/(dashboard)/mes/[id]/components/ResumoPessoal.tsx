'use client';

import { useState, useEffect, useCallback } from 'react';
import { User, Wallet, TrendingUp, ArrowDownCircle, Loader2, Check, Save } from 'lucide-react';
import { formatBRL } from '@/lib/format';
import { getProprietarioCor, PROPRIETARIOS_PADRAO } from '@/lib/constants';
import { updateSalarios } from '@/services/financeService';
import type { Pagamento } from '@/types/finance';

interface ResumoPessoalProps {
  pagamentos?: Pagamento[];
  salario_talyson?: number;
  salario_mikaelly?: number;
  financeiroId: string | number;
  onSaved?: () => void;
}

const SALARIO_KEYS: Record<string, 'salario_talyson' | 'salario_mikaelly'> = {
  Talyson: 'salario_talyson',
  Mikaelly: 'salario_mikaelly',
};

export default function ResumoPessoal({
  pagamentos = [],
  salario_talyson = 0,
  salario_mikaelly = 0,
  financeiroId,
  onSaved,
}: ResumoPessoalProps) {
  const salariosIniciais: Record<string, number> = {
    Talyson: salario_talyson || 0,
    Mikaelly: salario_mikaelly || 0,
  };

  const [salarios, setSalarios] = useState<Record<string, number>>(salariosIniciais);
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [erros, setErros] = useState<Record<string, string | null>>({});

  useEffect(() => {
    setSalarios({
      Talyson: salario_talyson || 0,
      Mikaelly: salario_mikaelly || 0,
    });
  }, [salario_talyson, salario_mikaelly]);

  useEffect(() => {
    const inputs: Record<string, string> = {};
    PROPRIETARIOS_PADRAO.forEach((nome) => {
      inputs[nome] = formatarInput(salarios[nome] || 0);
    });
    setInputValues(inputs);
  }, [salarios]);

  function formatarInput(value: number): string {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  function parseInput(value: string): number {
    const clean = value.replace(/\./g, '').replace(',', '.');
    const num = parseFloat(clean);
    return isNaN(num) ? 0 : num;
  }

  const salvarSalario = useCallback(async (nome: string, valor: number) => {
    if (!financeiroId) return;

    setSaving((prev) => ({ ...prev, [nome]: true }));
    setSaved((prev) => ({ ...prev, [nome]: false }));
    setErros((prev) => ({ ...prev, [nome]: null }));
    try {
      await updateSalarios(financeiroId, {
        [SALARIO_KEYS[nome]]: valor,
      });
      onSaved?.();
      setSaved((prev) => ({ ...prev, [nome]: true }));
      setTimeout(() => {
        setSaved((prev) => ({ ...prev, [nome]: false }));
      }, 2000);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao salvar';
      setErros((prev) => ({ ...prev, [nome]: message }));
    } finally {
      setSaving((prev) => ({ ...prev, [nome]: false }));
    }
  }, [financeiroId, onSaved]);

  function handleInputChange(nome: string, value: string) {
    const filtered = value.replace(/[^\d,]/g, '');
    setInputValues((prev) => ({ ...prev, [nome]: filtered }));
  }

  function handleBlur(nome: string) {
    const num = parseInput(inputValues[nome] || '0');
    setSalarios((prev) => ({ ...prev, [nome]: num }));
    salvarSalario(nome, num);
  }

  function handleKeyDown(nome: string, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const num = parseInput(inputValues[nome] || '0');
      setSalarios((prev) => ({ ...prev, [nome]: num }));
      salvarSalario(nome, num);
    }
  }

  function handleFocus(nome: string) {
    const value = inputValues[nome] || '0,00';
    if (value === '0,00') {
      setInputValues((prev) => ({ ...prev, [nome]: '' }));
    }
  }

  const totaisPorProprietario = PROPRIETARIOS_PADRAO.map((nome) => {
    const total = pagamentos
      .filter(
        (p) =>
          p.proprietario?.toLowerCase() === nome.toLowerCase() &&
          p.status?.toLowerCase() === 'pago'
      )
      .reduce((acc, p) => acc + (p.valor || 0), 0);
    return { nome, total };
  });

  const totalGeralPago = pagamentos
    .filter((p) => p.status?.toLowerCase() === 'pago')
    .reduce((acc, p) => acc + (p.valor || 0), 0);

  return (
    <div className="bg-card rounded-lg border border-border shadow-md overflow-hidden">
      <div className="p-3 md:p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-md bg-emerald-500/10">
            <Wallet className="w-4 h-4 text-emerald-500" />
          </div>
          <h2 className="text-foreground font-bold text-sm tracking-tight">Resumo por Pessoa</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {totaisPorProprietario.map(({ nome, total }) => {
            const salario = salarios[nome] || 0;
            const sobra = salario - total;
            const percentualGasto = salario > 0 ? (total / salario) * 100 : 0;
            const isSaving = saving[nome];

            return (
              <div
                key={nome}
                className="bg-muted/30 border border-border rounded-lg p-3 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-muted-foreground" />
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded ${getProprietarioCor(
                        nome
                      )}`}
                    >
                      {nome}
                    </span>
                  </div>
                  {isSaving ? (
                    <Loader2 size={14} className="animate-spin text-emerald-500" />
                  ) : saved[nome] ? (
                    <div className="flex items-center gap-1 text-emerald-500">
                      <Check size={14} />
                      <span className="text-[9px] font-bold">Salvo</span>
                    </div>
                  ) : (
                    <TrendingUp
                      size={14}
                      className={sobra >= 0 ? 'text-emerald-500' : 'text-red-400'}
                    />
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                    <span>Total pago em contas</span>
                    <span className="text-foreground font-semibold">{formatBRL(total)}</span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                    <span>Quanto recebeu</span>
                    <div className="flex flex-col items-end gap-0.5">
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-muted-foreground">R$</span>
                        <input
                          type="text"
                          inputMode="decimal"
                          value={inputValues[nome] ?? formatarInput(salario)}
                          onChange={(e) => handleInputChange(nome, e.target.value)}
                          onBlur={() => handleBlur(nome)}
                          onFocus={() => handleFocus(nome)}
                          disabled={isSaving}
                          className={`w-20 bg-background border rounded px-1.5 py-0.5 text-[11px] text-foreground text-right focus:outline-none focus:ring-1 disabled:opacity-60 transition-colors ${
                            erros[nome]
                              ? 'border-red-400 focus:ring-red-400/50'
                              : saved[nome]
                                ? 'border-emerald-500 focus:ring-emerald-500/50'
                                : 'border-border focus:ring-emerald-500/50'
                          }`}
                          aria-label={`Salário de ${nome}`}
                          onKeyDown={(e) => handleKeyDown(nome, e)}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const num = parseInput(inputValues[nome] || '0');
                            setSalarios((prev) => ({ ...prev, [nome]: num }));
                            salvarSalario(nome, num);
                          }}
                          disabled={isSaving}
                          className="p-1 rounded bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 disabled:opacity-50 transition-colors"
                          aria-label={`Salvar salário de ${nome}`}
                          title="Salvar"
                        >
                          {isSaving ? (
                            <Loader2 size={12} className="animate-spin" />
                          ) : saved[nome] ? (
                            <Check size={12} />
                          ) : (
                            <Save size={12} />
                          )}
                        </button>
                      </div>
                      {erros[nome] && (
                        <span className="text-[9px] text-red-400 text-right leading-tight max-w-[140px]">
                          {erros[nome]}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-border/50 mt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground font-medium">Sobra</span>
                    <span
                      className={`text-sm font-extrabold tracking-tight ${
                        sobra >= 0 ? 'text-emerald-500' : 'text-red-400'
                      }`}
                    >
                      {formatBRL(sobra)}
                    </span>
                  </div>
                  {salario > 0 && (
                    <div className="text-[9px] text-muted-foreground text-right mt-0.5">
                      {percentualGasto.toFixed(1)}% usado
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3 flex flex-col justify-between">
            <div className="flex items-center gap-2">
              <ArrowDownCircle size={14} className="text-emerald-500" />
              <span className="text-xs font-bold text-emerald-500">Total do Mês</span>
            </div>
            <div className="mt-2">
              <div className="text-[10px] text-muted-foreground">Total pago em contas</div>
              <div className="text-lg font-extrabold text-foreground">{formatBRL(totalGeralPago)}</div>
            </div>
            <div className="mt-2 pt-2 border-t border-emerald-500/20">
              <div className="text-[10px] text-muted-foreground">Sobra total</div>
              <div className="text-sm font-extrabold text-emerald-500">
                {formatBRL(
                  PROPRIETARIOS_PADRAO.reduce((acc, nome) => acc + (salarios[nome] || 0), 0) -
                    totalGeralPago
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
