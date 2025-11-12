#!/bin/bash
# Script de configuração do backend

echo "Configurando backend..."

# Criar arquivo .env se não existir
if [ ! -f .env ]; then
    echo "Criando arquivo .env..."
    cat > .env << EOF
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=agenda_db
DB_USER=postgres
DB_PASSWORD=postgres
EOF
    echo "Arquivo .env criado com sucesso!"
else
    echo "Arquivo .env já existe."
fi

echo "Configuração concluída!"
echo ""
echo "IMPORTANTE: Verifique se o PostgreSQL está rodando e ajuste as credenciais no arquivo .env se necessário."

