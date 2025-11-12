import axios from 'axios';
import { Contato, ContatoCreate } from '../types/Contato';

const api = axios.create({
  baseURL: '/api/contatos',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const contatoService = {
  getAll: async (): Promise<Contato[]> => {
    const response = await api.get<Contato[]>('/');
    return response.data;
  },

  getById: async (id: number): Promise<Contato> => {
    const response = await api.get<Contato>(`/${id}`);
    return response.data;
  },

  search: async (term: string): Promise<Contato[]> => {
    const response = await api.get<Contato[]>('/search', {
      params: { term },
    });
    return response.data;
  },

  create: async (contato: ContatoCreate): Promise<Contato> => {
    const response = await api.post<Contato>('/', contato);
    return response.data;
  },

  update: async (id: number, contato: Partial<ContatoCreate>): Promise<Contato> => {
    const response = await api.put<Contato>(`/${id}`, contato);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/${id}`);
  },
};

