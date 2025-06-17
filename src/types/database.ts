
// Tipos preparados para integração com Supabase
// Estas interfaces correspondem às tabelas que serão criadas no banco

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  userType: 'cliente' | 'freteiro';
  telefone?: string;
  whatsapp?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FreteiroProfile {
  id: string;
  userId: string;
  capacidadeMaxima: number;
  tipoVeiculo: string;
  areaAtuacao: string;
  precoKm: number;
  avaliacaoMedia: number;
  totalAvaliacoes: number;
  verificado: boolean;
  disponivel: boolean;
  documentos?: string[]; // URLs dos documentos
  createdAt: string;
  updatedAt: string;
}

export interface Frete {
  id: string;
  clienteId: string;
  freteiroId: string;
  origem: string;
  destino: string;
  data: string;
  horario: string;
  valor: number;
  peso?: number;
  descricao: string;
  status: 'agendado' | 'em_andamento' | 'concluido' | 'cancelado';
  observacoes?: string;
  avaliacaoCliente?: number;
  avaliacaoFreteiro?: number;
  comentarioCliente?: string;
  comentarioFreteiro?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Avaliacao {
  id: string;
  freteId: string;
  avaliadorId: string;
  avaliadoId: string;
  nota: number;
  comentario?: string;
  tipo: 'cliente_para_freteiro' | 'freteiro_para_cliente';
  createdAt: string;
}

// Tipos para formulários e requisições
export interface CadastroFreteiroData {
  name: string;
  email: string;
  password: string;
  telefone: string;
  whatsapp: string;
  capacidadeMaxima: number;
  tipoVeiculo: string;
  areaAtuacao: string;
  precoKm: number;
}

export interface ContratarFreteData {
  origem: string;
  destino: string;
  data: string;
  horario: string;
  peso?: number;
  descricao: string;
  observacoes?: string;
}

export interface BuscaFreteiroFilters {
  origem?: string;
  destino?: string;
  capacidadeMinima?: number;
  precoMaximo?: number;
  avaliacaoMinima?: number;
  verificado?: boolean;
  disponivel?: boolean;
}

// Tipos para responses da API
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
