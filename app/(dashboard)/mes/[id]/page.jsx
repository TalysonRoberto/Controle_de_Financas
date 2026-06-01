'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getFinanceiroById } from '@/services/financeService';
import DashboardCards from '@/components/DashboardCards';
import FinanceCard from '@/components/FinanceCard';
import FinanceModal from '@/components/FinanceModal';
import { Plus } from 'lucide-react';

export default function FinanceiroMesPage() {
  const { id } = useParams();
  const [financeiro, setFinanceiro] = useState(null);
  const [modalType, setModalType] = useState('pagamentos');
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpenAddModal(type) {
    setModalType(type);
    setIsModalOpen(true);
  }

  useEffect(() => {
    async function loadData() {
      const data = await getFinanceiroById(id);
      setFinanceiro(data);
    }

    if (id) {
      loadData();
    }
  }, [id]);

  if (!financeiro) {
    return <div className="p-10 text-zinc-500">Carregando detalhamento...</div>;
  }

  // Cálculos do mes
  const totalPagamentos = financeiro.pagamentos.reduce(
    (acc, item) => acc + item.valor,
    0,
  );
  const totalInvestimentos = financeiro.investimentos.reduce(
    (acc, item) => acc + item.valor,
    0,
  );
  const totalDividendos = financeiro.dividendos.reduce(
    (acc, item) => acc + item.valor,
    0,
  );

  return (
    <div className="flex flex-col gap-4 mt-[-20px]">
      {/* INJETANDO O COMPONENTE DO MODAL */}
      <FinanceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tipo={modalType}
        financeiro={financeiro}
      />

      {/* TÍTULO DO MÊS */}
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-bold text-white capitalize tracking-tight">
          {financeiro.mes}
        </h1>
        <p className="text-zinc-400 text-sm">
          Detalhamento financeiro do mês selecionado
        </p>
      </div>

      <DashboardCards
        totalInvestimentos={totalInvestimentos}
        totalDividendos={totalDividendos}
        totalPagamentos={totalPagamentos}
      />

      {/* GRID EM 3 COLUNAS LADO A LADO PARALELAS */}
      <div className="grid grid-cols-1 xl:grid-cols-10 gap-6 items-start">
        {/* 1. CARD JANEIRO (PAGAMENTOS) */}
        <div className="col-span-4">
          <FinanceCard
            titulo="Pagamentos"
            colunas={['Serviço', 'Proprietário', 'Valor', 'Status']}
            dados={financeiro.pagamentos}
            total={totalPagamentos}
            totalColor="text-green-400"
            onAdd={() => handleOpenAddModal('pagamentos')}
            renderRow={(item) => (
              <tr
                key={item.id}
                className="border-b border-zinc-800/50 hover:bg-zinc-800/20"
              >
                <td className="py-2 text-zinc-200">{item.servico}</td>

                <td>{item.proprietario}</td>

                <td className="text-center">R$ {item.valor}</td>

                <td className="text-right">
                  <span
                    className={`
                  text-white
                  text-[12px]
                  px-2.5 py-0.5
                  rounded-full
                  font-bold
                  ${
                    item.status?.toLowerCase() === 'pago'
                      ? 'bg-green-600'
                      : 'bg-amber-600'
                  }
                `}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            )}
          />
        </div>

        {/* 2. Valor do pagamento */}
        <div className="col-span-2"></div>

        {/* 3. CARD INVESTIMENTO */}
        <div className="col-span-2">
          <FinanceCard
            titulo="Investimentos"
            colunas={['Serviço', 'Tipo', 'Valor']}
            dados={financeiro.investimentos}
            total={totalInvestimentos}
            totalColor="text-yellow-500"
            onAdd={() => handleOpenAddModal('investimentos')}
            renderRow={(item) => (
              <tr
                key={item.id}
                className="
        border-b border-zinc-800/50
        hover:bg-zinc-800/20
      "
              >
                <td className="py-2 text-zinc-200">{item.servico}</td>

                <td>
                  <span
                    className={`
            text-white
            text-[12px]
            px-2 py-0.5
            rounded-md
            font-bold
            uppercase
            ${
              item.tipo?.toLowerCase() === 'ações'
                ? 'bg-cyan-600'
                : 'bg-amber-700'
            }
          `}
                  >
                    {item.tipo}
                  </span>
                </td>

                <td className="text-right">R$ {item.valor}</td>
              </tr>
            )}
          />
        </div>

        {/* 4. CARD RETORNO (DIVIDENDOS) */}
        <div className="col-span-2">
          <FinanceCard
            titulo="Dividendos"
            colunas={['Serviço', 'Tipo', 'Valor']}
            dados={financeiro.dividendos}
            total={totalDividendos}
            totalColor="text-cyan-400"
            onAdd={() => handleOpenAddModal('dividendos')}
            renderRow={(item) => (
              <tr
                key={item.id}
                className="
          border-b border-zinc-800/50
          hover:bg-zinc-800/20
        "
              >
                <td className="py-2 text-zinc-200">{item.servico}</td>

                <td>
                  <span
                    className={`
              text-white
              text-[12px]
              px-2 py-0.5
              rounded-md
              font-bold
              uppercase
              ${
                item.tipo?.toLowerCase() === 'ações'
                  ? 'bg-cyan-600'
                  : 'bg-amber-700'
              }
            `}
                  >
                    {item.tipo}
                  </span>
                </td>

                <td className="text-right">R$ {item.valor}</td>
              </tr>
            )}
          />
        </div>
      </div>
    </div>
  );
}
