import { db, dbAll, dbGet, dbRun } from '../config/database';
import { Contato, ContatoCreate, ContatoUpdate } from '../models/Contato';

export class ContatoRepository {
  async findAll(): Promise<Contato[]> {
    return (await dbAll('SELECT * FROM contatos ORDER BY nome ASC')) as Contato[];
  }

  async findById(id: number): Promise<Contato | null> {
    const result = await dbGet('SELECT * FROM contatos WHERE id = ?', [id]) as Contato | undefined;
    return result || null;
  }

  async search(term: string): Promise<Contato[]> {
    const searchTerm = `%${term}%`;
    return (await dbAll(`
      SELECT * FROM contatos 
      WHERE nome LIKE ? 
         OR email LIKE ? 
         OR telefone LIKE ? 
      ORDER BY nome ASC
    `, [searchTerm, searchTerm, searchTerm])) as Contato[];
  }

  async create(contato: ContatoCreate): Promise<Contato> {
    const result = await dbRun(
      'INSERT INTO contatos (nome, email, telefone) VALUES (?, ?, ?)',
      [contato.nome, contato.email, contato.telefone]
    ) as { lastID: number };
    
    const created = await this.findById(result.lastID);
    return created!;
  }

  async update(id: number, contato: ContatoUpdate): Promise<Contato | null> {
    const fields: string[] = [];
    const values: any[] = [];

    if (contato.nome !== undefined) {
      fields.push('nome = ?');
      values.push(contato.nome);
    }
    if (contato.email !== undefined) {
      fields.push('email = ?');
      values.push(contato.email);
    }
    if (contato.telefone !== undefined) {
      fields.push('telefone = ?');
      values.push(contato.telefone);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    fields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    await dbRun(`
      UPDATE contatos 
      SET ${fields.join(', ')} 
      WHERE id = ?
    `, values);

    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await dbRun('DELETE FROM contatos WHERE id = ?', [id]) as { changes: number };
    return result.changes > 0;
  }
}

