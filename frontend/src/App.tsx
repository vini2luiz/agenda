import { useState, useEffect } from 'react';
import { Contato, ContatoCreate } from './types/Contato';
import { contatoService } from './services/api';
import { ContatoForm } from './components/ContatoForm';
import { ContatoList } from './components/ContatoList';
import { SearchBar } from './components/SearchBar';
import './App.css';

function App() {
  const [contatos, setContatos] = useState<Contato[]>([]);
  const [filteredContatos, setFilteredContatos] = useState<Contato[]>([]);
  const [editingContato, setEditingContato] = useState<Contato | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadContatos();
  }, []);

  const loadContatos = async () => {
    try {
      setLoading(true);
      const data = await contatoService.getAll();
      setContatos(data);
      if (!isSearching) {
        setFilteredContatos(data);
      }
    } catch (error) {
      console.error('Erro ao carregar contatos:', error);
      alert('Erro ao carregar contatos');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (term: string) => {
    try {
      setIsSearching(true);
      const results = await contatoService.search(term);
      setFilteredContatos(results);
    } catch (error) {
      console.error('Erro ao buscar contatos:', error);
      alert('Erro ao buscar contatos');
    }
  };

  const handleClearSearch = () => {
    setIsSearching(false);
    setFilteredContatos(contatos);
  };

  const handleCreate = async (contatoData: ContatoCreate) => {
    try {
      await contatoService.create(contatoData);
      await loadContatos();
      setShowForm(false);
      setEditingContato(null);
    } catch (error) {
      console.error('Erro ao criar contato:', error);
      alert('Erro ao criar contato');
    }
  };

  const handleUpdate = async (contatoData: ContatoCreate) => {
    if (!editingContato?.id) return;

    try {
      await contatoService.update(editingContato.id, contatoData);
      await loadContatos();
      setShowForm(false);
      setEditingContato(null);
    } catch (error) {
      console.error('Erro ao atualizar contato:', error);
      alert('Erro ao atualizar contato');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir este contato?')) {
      return;
    }

    try {
      await contatoService.delete(id);
      await loadContatos();
    } catch (error) {
      console.error('Erro ao deletar contato:', error);
      alert('Erro ao deletar contato');
    }
  };

  const handleEdit = (contato: Contato) => {
    setEditingContato(contato);
    setShowForm(true);
  };

  const handleNewContato = () => {
    setEditingContato(null);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingContato(null);
  };

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>📇 Agenda de Contatos</h1>
          <p>Gerencie seus contatos de forma simples e eficiente</p>
        </header>

        {!showForm ? (
          <>
            <div className="toolbar">
              <button className="btn btn-new" onClick={handleNewContato}>
                + Novo Contato
              </button>
            </div>

            <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />

            {loading ? (
              <div className="loading">Carregando...</div>
            ) : (
              <ContatoList
                contatos={filteredContatos}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </>
        ) : (
          <ContatoForm
            contato={editingContato}
            onSubmit={editingContato ? handleUpdate : handleCreate}
            onCancel={handleCancelForm}
          />
        )}
      </div>
    </div>
  );
}

export default App;

