const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Erro: NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY são obrigatórios');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function keepAlive() {
  try {
    const { data: financeiro, error: financeiroError } = await supabase
      .from('financeiro_mensal')
      .select('id')
      .order('id', { ascending: true })
      .limit(1)
      .single();

    if (financeiroError || !financeiro) {
      console.error('Erro ao buscar financeiro:', financeiroError);
      process.exit(1);
    }

    const { data: pagamento, error: insertError } = await supabase
      .from('pagamentos')
      .insert([
        {
          financeiro_id: financeiro.id,
          servico: 'keep-alive-test',
          valor: 0.01,
          status: 'pago',
          proprietario: 'Talyson',
        },
      ])
      .select()
      .single();

    if (insertError) {
      console.error('Erro ao criar pagamento:', insertError);
      process.exit(1);
    }

    const { error: deleteError } = await supabase
      .from('pagamentos')
      .delete()
      .eq('id', pagamento.id);

    if (deleteError) {
      console.error('Erro ao deletar pagamento:', deleteError);
      process.exit(1);
    }

    console.log('Keep-alive executado com sucesso:', new Date().toISOString());
  } catch (err) {
    console.error('Erro inesperado:', err);
    process.exit(1);
  }
}

keepAlive();
