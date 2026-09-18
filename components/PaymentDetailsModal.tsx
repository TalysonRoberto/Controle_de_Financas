'use client';

import { useState, useEffect } from 'react';
import { Trash2, CheckCircle, Save, Pencil } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatBRL, formatDate } from '@/lib/format';
import { PROPRIETARIOS_PADRAO } from '@/lib/constants';
import type { Pagamento } from '@/types/finance';

interface PaymentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  pagamento: Pagamento | null;
  onUpdate: (
    pagamentoId: number | string,
    dados: Record<string, unknown>
  ) => Promise<void>;
  onDelete: (
    pagamentoId: number | string
  ) => Promise<void>;
}

export default function PaymentDetailsModal({
  isOpen,
  onClose,
  pagamento,
  onUpdate,
  onDelete,
}: PaymentDetailsModalProps) {
  const [valor, setValor] = useState('');
  const [proprietario, setProprietario] = useState('Talyson');
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (pagamento) {
      setValor(String(pagamento.valor));
      setProprietario(pagamento.proprietario);
      setEditando(false);
    }
  }, [pagamento]);

  if (!isOpen || !pagamento) return null;

  const isPago = pagamento.status?.toLowerCase() === 'pago';

  async function handleSalvar() {
    if (!pagamento) return;
    try {
      setLoading(true);
      await onUpdate(pagamento.id, {
        valor: Number(valor),
        proprietario,
      });
      onClose();
      setEditando(false);
    } catch (err) {
      console.error('Erro ao salvar:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleMarcarPago() {
    if (!pagamento) return;
    try {
      setLoading(true);
      await onUpdate(pagamento.id, { status: 'pago' });
      onClose();
    } catch (err) {
      console.error('Erro ao marcar como pago:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleExcluir() {
    if (!pagamento) return;
    try {
      setLoading(true);
      await onDelete(pagamento.id);
    } catch (err) {
      console.error('Erro ao excluir:', err);
      setLoading(false);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={pagamento.servico}
      maxWidth="max-w-[900px]"
    >
      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {/* SERVIÇO */}
        <div>
          <label className="text-muted-foreground text-xs">Serviço</label>
          <input
            value={pagamento.servico}
            disabled
            className="mt-1.5 w-full h-10 rounded-lg bg-muted/50 border border-border px-3 text-muted-foreground text-sm"
          />
        </div>

        {/* PROPRIETÁRIO */}
        <div>
          <label className="text-muted-foreground text-xs">Proprietário</label>
          <div className="mt-1.5 flex bg-muted/50 border border-border rounded-lg p-0.5">
            {PROPRIETARIOS_PADRAO.map((nome) => (
              <button
                key={nome}
                disabled={!editando}
                onClick={() => setProprietario(nome)}
                aria-pressed={proprietario === nome}
                className={`
                  flex-1 h-10 rounded-md font-semibold text-xs transition-all
                  ${proprietario === nome ? 'bg-emerald-500 text-white' : 'text-muted-foreground'}
                  ${!editando ? 'cursor-not-allowed opacity-70' : ''}
                `}
              >
                {nome}
              </button>
            ))}
          </div>
        </div>

        {/* VALOR */}
        <div>
          <label className="text-muted-foreground text-xs">Valor</label>
          <input
            type="number"
            disabled={!editando}
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className="mt-1.5 w-full h-10 rounded-lg bg-muted/50 border border-border px-3 text-foreground text-sm disabled:text-muted-foreground disabled:cursor-not-allowed"
          />
        </div>

        {/* EDITAR */}
        <div>
          <label className="text-muted-foreground text-xs">Edição</label>
          <button
            onClick={() => setEditando(!editando)}
            className={`
              mt-1.5 w-full h-10 rounded-lg border flex items-center justify-center gap-1.5 font-semibold text-xs transition-all
              ${editando
                ? 'bg-sky-600 border-sky-500 text-white'
                : 'bg-muted/50 border-border text-foreground hover:bg-accent'}
            `}
          >
            <Pencil size={14} />
            {editando ? 'Editando...' : 'Editar'}
          </button>
        </div>

        {/* DATA */}
        <div>
          <label className="text-muted-foreground text-xs">Criado em</label>
          <div className="mt-1.5 h-10 rounded-lg bg-muted/50 border border-border px-3 flex items-center text-foreground text-sm">
            {pagamento.created_at ? formatDate(pagamento.created_at) : '—'}
          </div>
        </div>

        {/* STATUS */}
        <div>
          <label className="text-muted-foreground text-xs">Status Atual</label>
          <div className="mt-3">
            <Badge variant={isPago ? 'success' : 'warning'} size="sm">
              {pagamento.status}
            </Badge>
          </div>
        </div>
      </div>

      {/* BOTÕES */}
      <div className="mt-6 pt-5 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            disabled={!editando}
            onClick={handleSalvar}
            loading={loading}
            variant="primary"
            size="md"
          >
            <Save size={14} />
            Salvar Alterações
          </Button>

          <Button
            onClick={handleExcluir}
            loading={loading}
            variant="danger"
            size="md"
          >
            <Trash2 size={14} />
            Excluir Pagamento
          </Button>
        </div>

        {!isPago && (
          <Button
            onClick={handleMarcarPago}
            loading={loading}
            variant="primary"
            size="md"
            className="w-full mt-3"
          >
            <CheckCircle size={14} />
            Marcar como Pago
          </Button>
        )}
      </div>
    </Modal>
  );
}
