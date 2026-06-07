import { supabase } from '@/lib/supabase';

export async function getFinanceiroMensal() {
  const { data, error } = await supabase.from('financeiro_mensal').select(`
      *,
      pagamentos(*),
      investimentos(*),
      dividendos(*)
    `);

  if (error) {
    throw error;
  }

  return data;
}

export async function getFinanceiroById(
  id: number
) {
  const { data, error } = await supabase
    .from('financeiro_mensal')
    .select(
      `
      *,
      pagamentos(*),
      investimentos(*),
      dividendos(*)
    `,
    )
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getFinanceiroByAno(ano: number) {
  const { data, error } = await supabase
    .from('financeiro_mensal')
    .select('*')
    .eq('ano', ano);

  if (error) {
    throw error;
  }

  return data;
}

//=== Função para criar um novo registro financeiro mensal ===
const meses = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

export async function inicializarAno(ano: number) {
  const { data: existentes, error } = await supabase
    .from('financeiro_mensal')
    .select('numero_mes')
    .eq('ano', ano);

  if (error) throw error;

const mesesExistentes = existentes.map(
  (item: { numero_mes: number }) => item.numero_mes
);

  const mesesParaCriar = meses
    .map((mes, index) => ({
      ano,
      mes,
      numero_mes: index + 1,
      status: 'ativo', // ou o valor padrão que você usa
    }))
    .filter((item) => !mesesExistentes.includes(item.numero_mes));

  if (mesesParaCriar.length === 0) {
    return;
  }

  const { error: insertError } = await supabase
    .from('financeiro_mensal')
    .insert(mesesParaCriar);

  if (insertError) throw insertError;
}
//=======================================================
