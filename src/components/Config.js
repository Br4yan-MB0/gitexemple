import { useState, useEffect } from 'react';
import ConfirmationDialog from '../components/ConfirmDialog';
import styles from '../styles/configuracoes.module.css';

export default function Configuracoes() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Recupera o nome de usuário do localStorage ou outro armazenamento
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Alterna o tema (claro/escuro)
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.style.backgroundColor = isDarkMode ? 'white' : 'black';
  };

  // Altera a cor de fundo da página
  const changeBackground = () => {
    document.body.style.backgroundColor =
      document.body.style.backgroundColor === 'lightblue' ? 'lightgreen' : 'lightblue';
  };

  // Simulação de mudança para conta Premium
  const changeToPremium = () => {
    alert('Você agora tem acesso à conta Premium!');
  };

  // Ação de logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username'); // Remove o nome de usuário também
    alert('Você foi desconectado!');
    window.location.href = '/login'; // Redireciona para a página de login
  };

  // Ação de exclusão de conta
  const handleDeleteAccount = async () => {
    if (!username) {
      alert('Nome de usuário não encontrado. Você precisa estar logado.');
      return;
    }

    try {
      const response = await fetch('/api/deleteAccount', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }), // Envia o nome de usuário para a API
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao excluir conta');
      }

      const data = await response.json();
      alert(data.message);
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      window.location.href = '/login'; // Redireciona para a página de login

    } catch (error) {
      alert(`Erro ao excluir conta: ${error.message}`);
    }
  };

  // Lida com a ação de confirmação
  const handleConfirmAction = (action) => {
    if (action === 'logout') {
      handleLogout();
    } else if (action === 'delete') {
      handleDeleteAccount();
    }
    setConfirmationAction(null);
  };

  // Cancelar ação de confirmação
  const handleCancelAction = () => {
    setConfirmationAction(null);
  };

  // Abrir o diálogo de confirmação
  const handleConfirmation = (action) => {
    setConfirmationAction(action);
  };

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
