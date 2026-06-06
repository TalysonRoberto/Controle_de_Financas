'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getFinanceiroById } from '@/services/financeService';
import { updatePagamento, deletePagamento } from '@/services/paymentService';
import { Loader2 } from 'lucide-react';

// Modais Globais
import FinanceModal from '@/components/FinanceModal';
import PaymentDetailsModal from '@/components/PaymentDetailsModal';

// Componentes Locais Isolados
import FinanceCard from './components/FinanceCard';
import MonthHeader from './components/MonthHeader';
import ClientSummary from './components/ClientSummary';
import PaymentRow from './components/PaymentRow';
import InvestmentRow from './components/InvestmentRow';
import DividendRow from './components/DividendRow';

interface FinanciamentoItem {
  id: string | number;
  servico: string;
  valor: number;
  proprietario?: string;
  status?: string;
  tipo?: string;
}

interface DetalheFinanceiro {
  id: string | number;
  mes: string;
  ano: number;
  pagamentos: FinanciamentoItem[];
  investimentos: FinanciamentoItem[];
  dividendos: FinanciamentoItem[];
}

export default function FinanceiroMesPage() {
  const params = useParams();
  const id = params?.id as string;

  const [financeiro, setFinanceiro] = useState<DetalheFinanceiro | null>(null);
  const [modalType, setModalType] = useState<'pagamentos' | 'investimentos' | 'dividendos'>('pagamentos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPagamento, setSelectedPagamento] = useState<FinanciamentoItem | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  async function loadData() {
    if (!id) return;
    try {
      const data = await getFinanceiroById(id);
      setFinanceiro(data);
    } catch (error) {
      console.error('Erro ao buscar dados mensais:', error);
    }
  }

  useEffect(() => {
    loadData();
  }, [id]);

  const getTagColor = (tag: string) => {
    switch (tag?.toLowerCase()) {
      case 'crypto': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      case 'fiis': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      case 'cdb': return 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20';
      case 'tesouro direto': return 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20';
      case 'ações': return 'bg-red-500/10 text-red-400 border border-red-500/20';
      case 'lci e lca': return 'bg-lime-500/10 text-lime-400 border border-lime-500/20';
      case 'etfs': return 'bg-purple-500/10 text-purple-400 border border-purple-500/20';
      default: return 'bg-zinc-800 text-zinc-400 border border-zinc-700';
    }
  };

  if (!financeiro) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3 text-zinc-500">
        <Loader2 className="animate-spin text-emerald-500" size={32} />
        <span className="text-sm font-medium">Carregando detalhamento mensal...</span>
      </div>
    );
  }

  const totalPagamentos = (financeiro.pagamentos || []).reduce((acc, item) => acc + (item?.valor || 0), 0);
  const totalInvestimentos = (financeiro.investimentos || []).reduce((acc, item) => acc + (item?.valor || 0), 0);
  const totalDividendos = (financeiro.dividendos || []).reduce((acc, item) => acc + (item?.valor || 0), 0);

  return (
    <div className="flex flex-col gap-6 mt-[-10px]">
      
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
        onUpdate={async (pagamentoId, dados) => {
          await updatePagamento(pagamentoId, dados);
          await loadData();
          const mesAtualizado = await getFinanceiroById(financeiro.id);
          const pagamentoAtualizado = mesAtualizado.pagamentos.find((p: FinanciamentoItem) => p.id === pagamentoId);
          if (pagamentoAtualizado) setSelectedPagamento(pagamentoAtualizado);
        }}
        onDelete={async (pagamentoId) => {
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

      {/* GRID TOTALMENTE LIMPO E SEPARADO */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start px-2">
        
        <FinanceCard
          titulo="Pagamentos"
          colunas={['Serviço', 'Dono', 'Valor', 'Status']} // Voltou aqui!
          dados={financeiro.pagamentos}
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
          titulo="Investimentos"
          colunas={['Serviço', 'Ativo', 'Valor']} // Voltou aqui!
          dados={financeiro.investimentos}
          total={totalInvestimentos}
          totalColor="text-yellow-500"
          onAdd={() => { setModalType('investimentos'); setIsModalOpen(true); }}
          renderRow={(item) => (
            <InvestmentRow key={item.id} item={item} getTagColor={getTagColor} />
          )}
        />

        <FinanceCard
          titulo="Dividendos"
          colunas={['Serviço', 'Origem', 'Valor']} // Voltou aqui!
          dados={financeiro.dividendos}
          total={totalDividendos}
          totalColor="text-cyan-400"
          onAdd={() => { setModalType('dividendos'); setIsModalOpen(true); }}
          renderRow={(item) => (
            <DividendRow key={item.id} item={item} getTagColor={getTagColor} />
          )}
        />

      </div>
    </div>
  );
}