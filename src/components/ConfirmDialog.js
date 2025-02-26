// components/confirmationDialog.js

export default function ConfirmationDialog({ action, onConfirm, onCancel }) {
    return (
      <div className="confirmation-dialog">
        <p>{action === 'logout' ? 'Você tem certeza que quer sair?' : 'Você tem certeza que quer excluir sua conta?'}</p>
        <button onClick={() => onConfirm(action)}>Sim</button>
        <button onClick={onCancel}>Não</button>
      </div>
    );
  }
  