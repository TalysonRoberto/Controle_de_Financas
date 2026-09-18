'use client';

interface YearSelectProps {
  selectedYear: number;
  setSelectedYear: (year: number) => void;
}

export default function YearSelect({ selectedYear, setSelectedYear }: YearSelectProps) {
  const currentYear = new Date().getFullYear();

  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      {/* TÍTULO */}
      <div className="flex items-baseline gap-2">
        <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
          {selectedYear}
        </h1>
        <p className="text-muted-foreground text-[10px] hidden md:flex">
          Detalhamento financeiro
        </p>
      </div>

      {/* ANOS */}
      <div
        className="flex gap-1.5 bg-card p-1.5 rounded-lg border border-border"
        role="group"
        aria-label="Selecionar ano"
      >
        {years.map((year) => (
          <button
            key={year}
            type="button"
            onClick={() => setSelectedYear(year)}
            aria-pressed={selectedYear === year}
            className={`
              flex-1 md:min-w-[60px] h-8 rounded-md text-xs font-medium transition-all
              ${selectedYear === year
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
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
