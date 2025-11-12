# Backend - Agenda de Contatos

Backend desenvolvido com TypeScript, Express e SQLite.

## Instalação

1. Instale as dependências:
```bash
npm install
```

2. O arquivo `.env` será criado automaticamente ou copie do `ENV_EXAMPLE.txt`:
```bash
# O banco de dados SQLite será criado automaticamente em ./data/agenda.db
```

3. Não é necessário configurar banco de dados - o SQLite é criado automaticamente!

## Execução

### Modo desenvolvimento:
```bash
npm run dev
```

### Modo produção:
```bash
npm run build
npm start
```

## Testes

```bash
npm test
```

## Endpoints

- `GET /api/contatos` - Lista todos os contatos
- `GET /api/contatos/search?term=termo` - Busca contatos por nome, email ou telefone
- `GET /api/contatos/:id` - Busca contato por ID
- `POST /api/contatos` - Cria um novo contato
- `PUT /api/contatos/:id` - Atualiza um contato
- `DELETE /api/contatos/:id` - Deleta um contato

