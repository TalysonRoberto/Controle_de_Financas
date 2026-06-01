"use client";

import { useEffect, useState } from "react";
import DashboardCards from "@/components/DashboardCards";
import FinanceiroTable from "./components/FinanceiroTable";
import YearSelect from "./components/YearSelect";
import { getFinanceiroMensal } from "@/services/financeService";

export default function HomePage() {
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear()
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const result = await getFinanceiroMensal();

      console.log(result);

      setData(result || []);
    } catch (err) {
      console.log(err);
    }
  }

  // filtra somente o ano selecionado
  const filteredData = data.filter(
    (item) => item.ano === selectedYear
  );

  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  // gera os meses faltantes
  const dataCompleta = meses.map((mes, index) => {
    const existente = filteredData.find(
      (item) => item.mes === mes
    );

    if (existente) {
      return existente;
    }

    return {
      id: `fake-${selectedYear}-${index + 1}`,
      ano: selectedYear,
      mes,
      numero_mes: index + 1,
      pagamentos: [],
      investimentos: [],
      dividendos: [],
      fake: true,
    };
  });

  const totalPagamentos = filteredData.reduce(
    (acc, item) =>
      acc +
      (item.pagamentos || []).reduce(
        (soma, pagamento) => soma + pagamento.valor,
        0
      ),
    0
  );

  const totalInvestimentos = filteredData.reduce(
    (acc, item) =>
      acc +
      (item.investimentos || []).reduce(
        (soma, investimento) => soma + investimento.valor,
        0
      ),
    0
  );

  const totalDividendos = filteredData.reduce(
    (acc, item) =>
      acc +
      (item.dividendos || []).reduce(
        (soma, dividendo) => soma + dividendo.valor,
        0
      ),
    0
  );

  return (
    <div className="flex flex-col gap-4 mt-[-20px]">
      <YearSelect
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />

      <DashboardCards
        totalInvestimentos={totalInvestimentos}
        totalDividendos={totalDividendos}
        totalPagamentos={totalPagamentos}
      />

      <FinanceiroTable
        data={dataCompleta}
      />
    </div>
  );
}