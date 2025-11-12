import { useState, useEffect } from 'react';
import { Contato, ContatoCreate } from '../types/Contato';
import './ContatoForm.css';

interface ContatoFormProps {
  contato?: Contato | null;
  onSubmit: (contato: ContatoCreate) => void;
  onCancel: () => void;
}

export const ContatoForm: React.FC<ContatoFormProps> = ({
  contato,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<ContatoCreate>({
    nome: '',
    email: '',
    telefone: '',
  });

  useEffect(() => {
    if (contato) {
      setFormData({
        nome: contato.nome,
        email: contato.email,
        telefone: contato.telefone,
      });
    } else {
      setFormData({
        nome: '',
        email: '',
        telefone: '',
      });
    }
  }, [contato]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.nome && formData.email && formData.telefone) {
      onSubmit(formData);
    }
  };

  return (
    <form className="contato-form" onSubmit={handleSubmit}>
      <h2>{contato ? 'Editar Contato' : 'Novo Contato'}</h2>
      
      <div className="form-group">
        <label htmlFor="nome">Nome *</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
          placeholder="Digite o nome"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">E-mail *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Digite o e-mail"
        />
      </div>

      <div className="form-group">
        <label htmlFor="telefone">Telefone *</label>
        <input
          type="tel"
          id="telefone"
          name="telefone"
          value={formData.telefone}
          onChange={handleChange}
          required
          placeholder="Digite o telefone"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {contato ? 'Atualizar' : 'Criar'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

