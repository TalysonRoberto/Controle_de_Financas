export default function MonthHeader({ mes }: { mes: string }) {
  return (
    <div className="flex items-center gap-2">
      <h1 className="text-lg font-semibold text-foreground capitalize tracking-tight">
        {mes}
      </h1>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}
