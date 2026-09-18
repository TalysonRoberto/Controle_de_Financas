'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getFinanceiroById } from '@/services/financeService';
import { updatePagamento, deletePagamento } from '@/services/paymentService';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';

import FinanceModal from '@/components/FinanceModal';
import PaymentDetailsModal from '@/components/PaymentDetailsModal';

import FinanceCard from './components/FinanceCard';
import MonthHeader from './components/MonthHeader';
import ClientSummary from './components/ClientSummary';
import ResumoPessoal from './components/ResumoPessoal';
import PaymentRow from './components/PaymentRow';
import InvestmentRow from './components/InvestmentRow';
import DividendRow from './components/DividendRow';

import { totalPago, totalGeral } from '@/lib/format';
import type { FinanceiroMes, Pagamento, Investimento, Dividendo, ModalTipo } from '@/types/finance';

export default function MonthPageClient() {
  const params = useParams();
  const id = params?.id as string;

  const [financeiro, setFinanceiro] = useState<FinanceiroMes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalType, setModalType] = useState<ModalTipo>('pagamentos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPagamento, setSelectedPagamento] = useState<Pagamento | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  async function loadData() {
    if (!id) return;
    try {
      setLoading(true);
      setError(null);
      const data = await getFinanceiroById(Number(id));
      setFinanceiro(data);
    } catch (err) {
      console.error('Erro ao buscar dados mensais:', err);
      setError('Não foi possível carregar os dados deste mês.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3 text-muted-foreground">
        <Loader2 className="animate-spin text-emerald-500" size={32} />
        <span className="text-sm font-medium">Carregando detalhamento mensal...</span>
      </div>
    );
  }

  if (error || !financeiro) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-muted-foreground">
        <AlertCircle className="text-red-400" size={32} />
        <span className="text-sm font-medium">{error || 'Mês não encontrado.'}</span>
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} />
          Voltar
        </button>
      </div>
    );
  }

  const totalPagamentos = totalPago(financeiro.pagamentos);
  const totalInvestimentos = totalGeral(financeiro.investimentos || []);
  const totalDividendos = totalGeral(financeiro.dividendos || []);

  return (
    <div className="flex flex-col gap-3 h-full">

      <FinanceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tipo={modalType}
        financeiro={financeiro}
        onSaved={loadData}
      />

      <PaymentDetailsModal
        isOpen={isDetailsOpen}
        pagamento={selectedPagamento}
        onClose={() => setIsDetailsOpen(false)}
        onUpdate={async (
          pagamentoId: number | string,
          dados: Record<string, unknown>
        ) => {
          await updatePagamento(pagamentoId, dados);
          await loadData();

          const mesAtualizado = await getFinanceiroById(Number(financeiro.id));
          const pagamentoAtualizado = mesAtualizado.pagamentos.find(
            (p: Pagamento) => p.id === pagamentoId
          );

          if (pagamentoAtualizado) {
            setSelectedPagamento(pagamentoAtualizado);
          }
        }}
        onDelete={async (pagamentoId: number | string) => {
          await deletePagamento(pagamentoId);
          setIsDetailsOpen(false);
          await loadData();
        }}
      />

      <MonthHeader mes={financeiro.mes} />

      <ClientSummary
        totalInvestimentos={totalInvestimentos}
        totalDividendos={totalDividendos}
        totalPagamentos={totalPagamentos}
      />

      <ResumoPessoal
        pagamentos={financeiro.pagamentos}
        salario_talyson={financeiro.salario_talyson}
        salario_mikaelly={financeiro.salario_mikaelly}
        financeiroId={financeiro.id}
        onSaved={loadData}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:h-full">

        <FinanceCard
          className="h-full"
          titulo="Pagamentos"
          colunas={['Serviço', 'Dono', 'Valor', 'Status']}
          dados={financeiro.pagamentos || []}
          total={totalPagamentos}
          totalColor="text-red-400"
          onAdd={() => { setModalType('pagamentos'); setIsModalOpen(true); }}
          renderRow={(item) => (
            <PaymentRow
              key={item.id}
              item={item}
              onClick={() => { setSelectedPagamento(item); setIsDetailsOpen(true); }}
            />
          )}
        />

        <FinanceCard
          className="h-full"
          titulo="Investimentos"
          colunas={['Serviço', 'Ativo', 'Valor']}
          dados={financeiro.investimentos || []}
          total={totalInvestimentos}
          totalColor="text-yellow-500"
          onAdd={() => { setModalType('investimentos'); setIsModalOpen(true); }}
          renderRow={(item) => (
            <InvestmentRow key={item.id} item={item} />
          )}
        />

        <FinanceCard
          className="h-full"
          titulo="Dividendos"
          colunas={['Serviço', 'Origem', 'Valor']}
          dados={financeiro.dividendos || []}
          total={totalDividendos}
          totalColor="text-cyan-400"
          onAdd={() => { setModalType('dividendos'); setIsModalOpen(true); }}
          renderRow={(item) => (
            <DividendRow key={item.id} item={item} />
          )}
        />

      </div>
    </div>
  );
}
