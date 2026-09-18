export type StatusPagamento = 'pendente' | 'pago';
export type StatusInvestimento = 'investido';
export type StatusDividendo = 'recebido';

export interface Pagamento {
  id: string | number;
  servico: string;
  valor: number;
  proprietario: string;
  status: StatusPagamento;
  created_at?: string;
}

export interface Investimento {
  id: string | number;
  servico: string;
  valor: number;
  tipo?: string;
  status?: StatusInvestimento;
}

export interface Dividendo {
  id: string | number;
  servico: string;
  valor: number;
  tipo?: string;
  status?: StatusDividendo;
}

export interface FinanceiroMes {
  id: string | number;
  mes: string;
  ano: number;
  numero_mes: number;
  salario_talyson?: number;
  salario_mikaelly?: number;
  pagamentos?: Pagamento[];
  investimentos?: Investimento[];
  dividendos?: Dividendo[];
}

export type TipoInvestimento =
  | 'crypto'
  | 'FIIs'
  | 'CDB'
  | 'Tesouro Direto'
  | 'Ações'
  | 'LCI e LCA'
  | 'ETFs';

export type ModalTipo = 'pagamentos' | 'investimentos' | 'dividendos';

export interface Usuario {
  id: number;
  username: string;
  avatars?: string;
}
