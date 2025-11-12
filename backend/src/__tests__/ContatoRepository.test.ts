import { ContatoRepository } from '../repositories/ContatoRepository';
import sqlite3 from 'sqlite3';
import { promisify } from 'util';

describe('ContatoRepository', () => {
  let repository: ContatoRepository;
  let testDb: sqlite3.Database;

  beforeAll((done) => {
    // Criar banco de dados em memória para testes
    testDb = new sqlite3.Database(':memory:');
    testDb.serialize(() => {
      testDb.run(`
        CREATE TABLE IF NOT EXISTS contatos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT NOT NULL,
          email TEXT NOT NULL,
          telefone TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, () => {
        // Substituir o db no módulo de configuração
        const dbModule = require('../config/database');
        dbModule.db = testDb;
        dbModule.dbRun = (sql: string, params: any[] = []): Promise<{ lastID: number; changes: number }> => {
          return new Promise((resolve, reject) => {
            testDb.run(sql, params, function(err) {
              if (err) reject(err);
              else resolve({ lastID: this.lastID, changes: this.changes });
            });
          });
        };
        dbModule.dbGet = (sql: string, params: any[] = []): Promise<any> => {
          return new Promise((resolve, reject) => {
            testDb.get(sql, params, (err, row) => {
              if (err) reject(err);
              else resolve(row);
            });
          });
        };
        dbModule.dbAll = (sql: string, params: any[] = []): Promise<any[]> => {
          return new Promise((resolve, reject) => {
            testDb.all(sql, params, (err, rows) => {
              if (err) reject(err);
              else resolve(rows);
            });
          });
        };
        
        repository = new ContatoRepository();
        done();
      });
    });
  });

  afterAll((done) => {
    testDb.close(done);
  });

  beforeEach((done) => {
    testDb.run('DELETE FROM contatos', done);
  });

  describe('create', () => {
    it('deve criar um novo contato', async () => {
      const contato = await repository.create({
        nome: 'João Silva',
        email: 'joao@example.com',
        telefone: '11999999999',
      });

      expect(contato).toHaveProperty('id');
      expect(contato.nome).toBe('João Silva');
      expect(contato.email).toBe('joao@example.com');
      expect(contato.telefone).toBe('11999999999');
    });
  });

  describe('findAll', () => {
    it('deve retornar todos os contatos', async () => {
      await repository.create({
        nome: 'João Silva',
        email: 'joao@example.com',
        telefone: '11999999999',
      });

      const contatos = await repository.findAll();
      expect(contatos.length).toBeGreaterThan(0);
    });
  });

  describe('search', () => {
    it('deve buscar contatos por nome', async () => {
      await repository.create({
        nome: 'João Silva',
        email: 'joao@example.com',
        telefone: '11999999999',
      });

      const contatos = await repository.search('João');
      expect(contatos.length).toBeGreaterThan(0);
      expect(contatos[0].nome).toContain('João');
    });

    it('deve buscar contatos por email', async () => {
      await repository.create({
        nome: 'João Silva',
        email: 'joao@example.com',
        telefone: '11999999999',
      });

      const contatos = await repository.search('joao@example.com');
      expect(contatos.length).toBeGreaterThan(0);
    });

    it('deve buscar contatos por telefone', async () => {
      await repository.create({
        nome: 'João Silva',
        email: 'joao@example.com',
        telefone: '11999999999',
      });

      const contatos = await repository.search('11999999999');
      expect(contatos.length).toBeGreaterThan(0);
    });
  });

  describe('update', () => {
    it('deve atualizar um contato', async () => {
      const contato = await repository.create({
        nome: 'João Silva',
        email: 'joao@example.com',
        telefone: '11999999999',
      });

      const updated = await repository.update(contato.id!, {
        nome: 'João Santos',
      });

      expect(updated?.nome).toBe('João Santos');
    });
  });

  describe('delete', () => {
    it('deve deletar um contato', async () => {
      const contato = await repository.create({
        nome: 'João Silva',
        email: 'joao@example.com',
        telefone: '11999999999',
      });

      const deleted = await repository.delete(contato.id!);
      expect(deleted).toBe(true);

      const found = await repository.findById(contato.id!);
      expect(found).toBeNull();
    });
  });
});

