export interface Contato {
  id?: number;
  nome: string;
  email: string;
  telefone: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface ContatoCreate {
  nome: string;
  email: string;
  telefone: string;
}

export interface ContatoUpdate {
  nome?: string;
  email?: string;
  telefone?: string;
}

