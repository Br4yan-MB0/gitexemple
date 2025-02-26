import { useState } from 'react';
import ConfirmationDialog from '../components/ConfirmDialog';
import styles from '../styles/configuracoes.module.css';

export default function Configuracoes() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState(null);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const changeBackground = () => {
    document.body.style.backgroundColor = document.body.style.backgroundColor === 'lightblue' ? 'lightgreen' : 'lightblue';
  };

  const changeToPremium = () => {
    alert("Você agora tem acesso à conta Premium!");
  };

  const handleConfirmation = (action) => {
    setConfirmationAction(action);
  };

  const handleConfirmAction = (action) => {
    if (action === 'logout') {
      alert("Você foi desconectado!");
    } else if (action === 'delete') {
      alert("Sua conta foi excluída!");
    }
    setConfirmationAction(null);
  };

  const handleCancelAction = () => {
    setConfirmationAction(null);
  };
  const handleDeleteAccount = async () => {
    const token = localStorage.getItem('token'); // Ou pegue o token de onde você o armazena

    if (!token) {
      alert('Token não encontrado. Você precisa estar logado.');
      return;
    }

    const response = await fetch('/api/deleteAccount', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      // Aqui você pode redirecionar o usuário para a página inicial ou fazer logout
      window.location.href = '/login';  // Redireciona para a página de login, por exemplo
    } else {
      alert(data.message || 'Erro ao excluir conta');
    }
  };

  return (
    <div>
      <h1>Configurações</h1>
      <button onClick={handleDeleteAccount}>Excluir Conta</button>
    </div>
  );
}

  return (
    <div className={isDarkMode ? styles.darkMode : ''}>
      <div className={styles.container}>
        <h1>Configurações</h1>

        <button onClick={toggleTheme}>Alternar Tema</button>
        <button onClick={changeBackground}>Alterar Plano de Fundo</button>
        <button onClick={changeToPremium}>Mudar para Premium</button>
        <button onClick={() => handleConfirmation('logout')}>Sair</button>
        <button onClick={() => handleConfirmation('delete')}>Excluir Conta</button>
        
        {confirmationAction && (
          <ConfirmationDialog 
            action={confirmationAction} 
            onConfirm={handleConfirmAction}
            onCancel={handleCancelAction}
          />
        )}
      </div>
    </div>
  );
    
}
