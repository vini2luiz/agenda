export interface Contato {
  id?: number;
  nome: string;
  email: string;
  telefone: string;
  created_at?: string;
  updated_at?: string;
}

export interface ContatoCreate {
  nome: string;
  email: string;
  telefone: string;
}

