export default function MonthHeader({ mes }: { mes: string }) {
  return (
    <div className="flex flex-col gap-1 px-2">
      <h1 className="text-4xl font-extrabold text-white capitalize tracking-tight">
        {mes}
      </h1>
    </div>
  );
}