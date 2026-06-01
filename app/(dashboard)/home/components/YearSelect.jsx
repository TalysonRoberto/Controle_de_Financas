//=============================================
// Esse arquio é responsável por renderizar o componente de seleção de ano no dashboard. Ele exibe uma lista de anos (do ano atual até dois anos atrás) e permite que o usuário selecione um ano específico para visualizar os dados correspondentes. O componente utiliza estilos para destacar o ano selecionado e melhorar a experiência do usuário.
//=============================================

export default function YearSelect({ selectedYear, setSelectedYear }) {
  const currentYear = new Date().getFullYear();

  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  return (
    <div className="flex items-center justify-between gap-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-bold text-white capitalize tracking-tight">
          Ano: {selectedYear}
        </h1>
        <p className="text-zinc-400 text-sm">
          Detalhamento financeiro do ano selecionado.
        </p>
      </div>

      <div className="flex items-end gap-3">
        <div
          className="
          flex
          gap-2
          bg-zinc-900
          p-1
          rounded-xl
          border
          border-zinc-800
        "
        >
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`
              px-4
              h-10
              rounded-xl
              text-sm
              transition-all

              ${
                selectedYear === year
                  ? 'bg-green-500 text-white'
                  : 'text-zinc-400 hover:bg-zinc-800'
              }
            `}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
