# Script de configuração do backend (PowerShell)

Write-Host "Configurando backend..." -ForegroundColor Green

# Criar arquivo .env se não existir
if (-not (Test-Path .env)) {
    Write-Host "Criando arquivo .env..." -ForegroundColor Yellow
    @"
PORT=3001

# SQLite - Caminho do banco de dados (opcional, padrão: ./data/agenda.db)
# DB_PATH=./data/agenda.db
"@ | Out-File -FilePath .env -Encoding utf8
    Write-Host "Arquivo .env criado com sucesso!" -ForegroundColor Green
} else {
    Write-Host "Arquivo .env já existe." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Configuração concluída!" -ForegroundColor Green
Write-Host ""
Write-Host "✅ SQLite será usado como banco de dados." -ForegroundColor Green
Write-Host "📁 O banco será criado automaticamente em: ./data/agenda.db" -ForegroundColor Cyan

