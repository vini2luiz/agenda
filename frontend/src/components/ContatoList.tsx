import { Contato } from '../types/Contato';
import './ContatoList.css';

interface ContatoListProps {
  contatos: Contato[];
  onEdit: (contato: Contato) => void;
  onDelete: (id: number) => void;
}

export const ContatoList: React.FC<ContatoListProps> = ({
  contatos,
  onEdit,
  onDelete,
}) => {
  if (contatos.length === 0) {
    return (
      <div className="empty-state">
        <p>Nenhum contato encontrado.</p>
      </div>
    );
  }

  return (
    <div className="contato-list">
      {contatos.map((contato) => (
        <div key={contato.id} className="contato-card">
          <div className="contato-info">
            <h3>{contato.nome}</h3>
            <p className="contato-email">{contato.email}</p>
            <p className="contato-telefone">{contato.telefone}</p>
          </div>
          <div className="contato-actions">
            <button
              className="btn btn-edit"
              onClick={() => onEdit(contato)}
            >
              Editar
            </button>
            <button
              className="btn btn-delete"
              onClick={() => contato.id && onDelete(contato.id)}
            >
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

