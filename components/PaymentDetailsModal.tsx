'use client';

import { useState, useEffect } from 'react';
import { X, Trash2, CheckCircle, Save, Pencil } from 'lucide-react';

interface Payment {
  id: number | string;
  servico: string;
  valor: number;
  proprietario: string;
  status: string;
  created_at: string;
}

interface PaymentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  pagamento: Payment | null;
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

 useEffect(() => {
  if (pagamento) {
    setValor(String(pagamento.valor));
    setProprietario(pagamento.proprietario);
    setEditando(false);
  }
}, [pagamento]);
  if (!isOpen || !pagamento) return null;

async function handleSalvar() {
  if (!pagamento) return;

  const confirmar = window.confirm(
    'Deseja realmente salvar as alterações?'
  );

  if (!confirmar) return;

  await onUpdate(pagamento.id, {
    valor: Number(valor),
    proprietario,
  });

  onClose();
  setEditando(false);
}

async function handleMarcarPago() {
  if (!pagamento) return;

  const confirmar = window.confirm(
    'Confirmar pagamento deste serviço?'
  );

  if (!confirmar) return;

  await onUpdate(pagamento.id, {
    status: 'pago',
  });

  onClose();
}

async function handleExcluir() {
  if (!pagamento) return;

  const confirmar = window.confirm(
    `Excluir "${pagamento.servico}" permanentemente?`
  );

  if (!confirmar) return;

  await onDelete(pagamento.id);
}

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="
          w-full
          max-w-[900px]
          bg-zinc-900
          border border-zinc-800
          rounded-[32px]
          p-10
          shadow-2xl
        "
      >
        {/* HEADER */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <h2 className="text-5xl font-light text-white">
              {pagamento.servico}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="
              w-12 h-12
              rounded-2xl
              bg-zinc-800
              hover:bg-zinc-700
              flex items-center justify-center
              transition-all
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 gap-8">
          {/* SERVIÇO */}
          <div>
            <label className="text-zinc-500 text-sm">Serviço</label>

            <input
              value={pagamento.servico}
              disabled
              className="
                mt-2
                w-full
                h-14
                rounded-2xl
                bg-zinc-950
                border border-zinc-800
                px-4
                text-zinc-400
              "
            />
          </div>

          {/* PROPRIETÁRIO */}
          <div>
            <label className="text-zinc-500 text-sm">Proprietário</label>

            <div
              className="
                mt-2
                flex
                bg-zinc-950
                border border-zinc-800
                rounded-2xl
                p-1
              "
            >
              {['Talyson', 'Mikaelly'].map((nome) => (
                <button
                  key={nome}
                  disabled={!editando}
                  onClick={() => setProprietario(nome)}
                  className={`
                    flex-1
                    h-12
                    rounded-xl
                    font-semibold
                    transition-all
                    ${
                      proprietario === nome
                        ? 'bg-emerald-500 text-white'
                        : 'text-zinc-400'
                    }
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
            <label className="text-zinc-500 text-sm">Valor</label>

            <input
              type="number"
              disabled={!editando}
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              className="
                mt-2
                w-full
                h-14
                rounded-2xl
                bg-zinc-950
                border border-zinc-800
                px-4
                text-white
                disabled:text-zinc-400
                disabled:cursor-not-allowed
              "
            />
          </div>

          {/* EDITAR */}
          <div>
            <label className="text-zinc-500 text-sm">Edição</label>

            <button
              onClick={() => setEditando(!editando)}
              className={`
                mt-2
                w-full
                h-14
                rounded-2xl
                border
                flex
                items-center
                justify-center
                gap-2
                font-semibold
                transition-all
                ${
                  editando
                    ? 'bg-sky-600 border-sky-500 text-white'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                }
              `}
            >
              <Pencil size={18} />

              {editando ? 'Editando...' : 'Editar'}
            </button>
          </div>

          {/* DATA */}
          <div>
            <label className="text-zinc-500 text-sm">Criado em</label>

            <div
              className="
                mt-2
                h-14
                rounded-2xl
                bg-zinc-950
                border border-zinc-800
                px-4
                flex items-center
                text-zinc-300
              "
            >
              {new Date(pagamento.created_at).toLocaleDateString('pt-BR')}
            </div>
          </div>

          {/* STATUS */}
          <div>
            <label className="text-zinc-500 text-sm">Status Atual</label>

            <div className="mt-4">
              <span
                className={`
                  px-4 py-2
                  rounded-full
                  text-sm
                  font-bold
                  border
                  ${
                    pagamento.status === 'pago'
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                  }
                `}
              >
                {pagamento.status}
              </span>
            </div>
          </div>
        </div>

        {/* BOTÕES */}
        <div className="mt-10 pt-8 border-t border-zinc-800">
          <div className="grid grid-cols-2 gap-4">
            <button
              disabled={!editando}
              onClick={handleSalvar}
              className="
                h-14
                rounded-2xl
                bg-sky-600
                hover:bg-sky-500
                disabled:bg-zinc-800
                disabled:text-zinc-500
                disabled:cursor-not-allowed
                text-white
                font-semibold
                flex items-center justify-center gap-2
                transition-all
              "
            >
              <Save size={18} />
              Salvar Alterações
            </button>

            <button
              onClick={handleExcluir}
              className="
                h-14
                rounded-2xl
                bg-rose-600
                hover:bg-rose-500
                text-white
                font-semibold
                flex items-center justify-center gap-2
                transition-all
              "
            >
              <Trash2 size={18} />
              Excluir Pagamento
            </button>
          </div>

          {pagamento.status !== 'pago' && (
            <button
              onClick={handleMarcarPago}
              className="
                w-full
                h-14
                mt-4
                rounded-2xl
                bg-emerald-600
                hover:bg-emerald-500
                text-white
                font-semibold
                flex items-center justify-center gap-2
                transition-all
              "
            >
              <CheckCircle size={18} />
              Marcar como Pago
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
