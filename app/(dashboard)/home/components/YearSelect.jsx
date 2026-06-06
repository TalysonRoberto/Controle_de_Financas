//=============================================
// Esse arquio é responsável por renderizar o componente de seleção de ano no dashboard. Ele exibe uma lista de anos (do ano atual até dois anos atrás) e permite que o usuário selecione um ano específico para visualizar os dados correspondentes. O componente utiliza estilos para destacar o ano selecionado e melhorar a experiência do usuário.
//=============================================

export default function YearSelect({ selectedYear, setSelectedYear }) {
  const currentYear = new Date().getFullYear();

  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  return (
    <div
      className="
        flex
        lg:flex-row
        lg:items-center
        lg:justify-between
        gap-5
      "
    >
      {/* TÍTULO */}
      <div className="flex flex-col gap-1 ">
        <h1
          className="
            text-2xl
            sm:text-3xl
            lg:text-4xl
            font-bold
            text-white
            tracking-tight
            pt-4
            md:pt-0
          "
        >
          {selectedYear}
        </h1>

        <p className="text-zinc-400 text-xs sm:text-sm hidden md:flex">
          Detalhamento financeiro do ano selecionado.
        </p>
      </div>

      {/* ANOS */}
      <div
        className="
          flex
          flex-wrap
          gap-2
          bg-zinc-900
          p-2
          rounded-2xl
          border
          border-zinc-800
          w-full
          lg:w-auto
        "
      >
        {years.map((year) => (
          <button
            key={year}
            type="button"
            onClick={() => setSelectedYear(year)}
            className={`
              flex-1
              md:min-w-[80px]
              min-w-[30px]
              h-11
              rounded-xl
              text-sm
              font-medium
              transition-all
              ${
                selectedYear === year
                  ? 'bg-emerald-500 text-white'
                  : 'text-zinc-400 hover:bg-zinc-800'
              }
            `}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
}
