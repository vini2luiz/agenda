import { Request, Response } from 'express';
import { ContatoRepository } from '../repositories/ContatoRepository';
import { ContatoCreate, ContatoUpdate } from '../models/Contato';

const contatoRepository = new ContatoRepository();

export class ContatoController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const contatos = await contatoRepository.findAll();
      res.json(contatos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar contatos' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const contato = await contatoRepository.findById(id);
      
      if (!contato) {
        res.status(404).json({ error: 'Contato não encontrado' });
        return;
      }
      
      res.json(contato);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar contato' });
    }
  }

  async search(req: Request, res: Response): Promise<void> {
    try {
      const { term } = req.query;
      
      if (!term || typeof term !== 'string') {
        res.status(400).json({ error: 'Termo de busca é obrigatório' });
        return;
      }
      
      const contatos = await contatoRepository.search(term);
      res.json(contatos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar contatos' });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { nome, email, telefone } = req.body;
      
      if (!nome || !email || !telefone) {
        res.status(400).json({ error: 'Nome, email e telefone são obrigatórios' });
        return;
      }
      
      const contatoData: ContatoCreate = { nome, email, telefone };
      const contato = await contatoRepository.create(contatoData);
      
      res.status(201).json(contato);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar contato' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const { nome, email, telefone } = req.body;
      
      const contatoData: ContatoUpdate = {};
      if (nome !== undefined) contatoData.nome = nome;
      if (email !== undefined) contatoData.email = email;
      if (telefone !== undefined) contatoData.telefone = telefone;
      
      const contato = await contatoRepository.update(id, contatoData);
      
      if (!contato) {
        res.status(404).json({ error: 'Contato não encontrado' });
        return;
      }
      
      res.json(contato);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar contato' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const deleted = await contatoRepository.delete(id);
      
      if (!deleted) {
        res.status(404).json({ error: 'Contato não encontrado' });
        return;
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar contato' });
    }
  }
}

