# 📇 Sistema de Agenda de Contatos

Sistema completo de gerenciamento de contatos com CRUD completo e funcionalidade de busca.

## 🚀 Tecnologias

### Frontend
- **React** 18.2.0
- **TypeScript** 5.3.3
- **Vite** 5.0.8
- **Axios** 1.6.2

### Backend
- **Node.js** com **TypeScript**
- **Express** 4.18.2
- **SQLite** (via sqlite3 5.1.6)
- **Jest** para testes

## 📁 Estrutura do Projeto

```
agenda/
├── frontend/          # Aplicação React
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── services/      # Serviços de API
│   │   ├── types/         # Tipos TypeScript
│   │   └── App.tsx        # Componente principal
│   ├── package.json
│   └── vite.config.ts
│
└── backend/           # API REST
    ├── src/
    │   ├── config/        # Configurações (DB)
    │   ├── controllers/   # Controladores
    │   ├── models/        # Modelos/Tipos
    │   ├── repositories/  # Repositórios (acesso a dados)
    │   ├── routes/        # Rotas da API
    │   └── server.ts      # Servidor Express
    ├── package.json
    └── tsconfig.json
```

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js (v18 ou superior)
- SQLite (incluído automaticamente via sqlite3)

### 1. Configurar o Backend

```bash
cd backend
npm install
```

O arquivo `.env` será criado automaticamente ou você pode copiar do `ENV_EXAMPLE.txt`. O banco de dados SQLite será criado automaticamente na primeira execução em `./data/agenda.db`.

### 2. Configurar o Frontend

```bash
cd frontend
npm install
```

## 🚀 Execução

### Backend (Terminal 1)
```bash
cd backend
npm run dev
```
O servidor estará rodando em `http://localhost:3003` (ou a porta configurada no `.env`)

### Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```
O aplicativo estará disponível em `http://localhost:3000` (ou na próxima porta disponível se 3000 estiver ocupada, ex: 3001, 3002)

## 📋 Funcionalidades

### ✅ CRUD Completo
- **Create**: Criar novos contatos
- **Read**: Listar todos os contatos
- **Update**: Editar contatos existentes
- **Delete**: Excluir contatos

### 🔍 Busca
- Busca por **nome**
- Busca por **e-mail**
- Busca por **telefone**
- Busca em tempo real (conforme digitação)

## 🧪 Testes

### Backend
```bash
cd backend
npm test
```

Os testes incluem:
- Criação de contatos
- Listagem de contatos
- Busca por nome, e-mail e telefone
- Atualização de contatos
- Exclusão de contatos

## 📡 API Endpoints

- `GET /api/contatos` - Lista todos os contatos
- `GET /api/contatos/search?term=termo` - Busca contatos
- `GET /api/contatos/:id` - Busca contato por ID
- `POST /api/contatos` - Cria um novo contato
- `PUT /api/contatos/:id` - Atualiza um contato
- `DELETE /api/contatos/:id` - Deleta um contato

## 🎨 Interface

A interface foi desenvolvida com:
- Design moderno e responsivo
- Gradiente de cores atrativo
- Animações suaves
- Feedback visual para ações do usuário
- Formulários validados

## 📝 Estrutura de Dados

### Tabela: contatos
```sql
id          INTEGER PRIMARY KEY AUTOINCREMENT
nome        TEXT NOT NULL
email       TEXT NOT NULL
telefone    TEXT NOT NULL
created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP
```

O banco de dados SQLite será criado automaticamente em `backend/data/agenda.db` na primeira execução.

## 🔒 Validações

- Todos os campos são obrigatórios ao criar um contato
- E-mail deve ter formato válido
- Busca case-insensitive (não diferencia maiúsculas/minúsculas)

## 📦 Build para Produção

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
```

Os arquivos de produção estarão em `frontend/dist`

## 👨‍💻 Desenvolvimento

O projeto segue boas práticas:
- ✅ Separação de responsabilidades (MVC)
- ✅ TypeScript para type safety
- ✅ Código modular e organizado
- ✅ Tratamento de erros
- ✅ Testes unitários
- ✅ Interface responsiva

