import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  if (secret !== process.env.KEEP_ALIVE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Busca o primeiro registro de financeiro_mensal para vincular o pagamento
    const { data: financeiro, error: financeiroError } = await supabase
      .from('financeiro_mensal')
      .select('id')
      .order('id', { ascending: true })
      .limit(1)
      .single();

    if (financeiroError || !financeiro) {
      return NextResponse.json(
        { error: 'Nenhum financeiro mensal encontrado', details: financeiroError },
        { status: 404 }
      );
    }

    // Cria um pagamento teste
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
      return NextResponse.json(
        { error: 'Erro ao criar pagamento teste', details: insertError },
        { status: 500 }
      );
    }

    // Deleta o pagamento teste imediatamente
    const { error: deleteError } = await supabase
      .from('pagamentos')
      .delete()
      .eq('id', pagamento.id);

    if (deleteError) {
      return NextResponse.json(
        { error: 'Erro ao remover pagamento teste', details: deleteError },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Keep-alive executado com sucesso',
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro desconhecido';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
