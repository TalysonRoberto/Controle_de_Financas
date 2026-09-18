export const MESES_ABREV = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'] as const;

export const MESES_COMPLETO = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
] as const;

export const TIPOS_INVESTIMENTO = [
  'crypto', 'FIIs', 'CDB', 'Tesouro Direto', 'Ações', 'LCI e LCA', 'ETFs',
] as const;

export const PROPRIETARIOS_PADRAO = ['Talyson', 'Mikaelly'] as const;

export const TAG_COLORS: Record<string, string> = {
  crypto: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  fiis: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  cdb: 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20',
  'tesouro direto': 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
  'ações': 'bg-red-500/10 text-red-400 border border-red-500/20',
  'lci e lca': 'bg-lime-500/10 text-lime-400 border border-lime-500/20',
  etfs: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
};

export const TAG_COLORS_MODAL: Record<string, string> = {
  crypto: 'bg-emerald-600 text-white',
  fiis: 'bg-amber-700 text-white',
  cdb: 'bg-yellow-600 text-zinc-950',
  'tesouro direto': 'bg-cyan-600 text-white',
  'ações': 'bg-red-600 text-white',
  'lci e lca': 'bg-lime-600 text-white',
  etfs: 'bg-purple-600 text-white',
};

export const PROPRIETARIO_CORES: Record<string, string> = {
  Talyson: 'bg-sky-400/10 text-sky-400',
  Mikaelly: 'bg-pink-400/10 text-pink-400',
};

export function getTagColor(tag: string, variant: 'badge' | 'modal' = 'badge'): string {
  const map = variant === 'modal' ? TAG_COLORS_MODAL : TAG_COLORS;
  return map[tag.toLowerCase()] || 'bg-zinc-800 text-zinc-400 border border-zinc-700';
}

export function getProprietarioCor(nome: string): string {
  return PROPRIETARIO_CORES[nome] || 'bg-zinc-800 text-zinc-400';
}
