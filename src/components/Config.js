import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import ConfirmationDialog from '../components/ConfirmDialog';
import styles from '../styles/configuracoes.module.css';

export default function Configuracoes() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      router.push('/login');
      return;
    }

    try {
      const decoded = JSON.parse(atob(storedToken.split('.')[1]));
      if (!decoded || !decoded.username) {
        throw new Error('Token inválido');
      }
      setUsername(decoded.username);
    } catch (error) {
      console.error('Erro ao validar token:', error);
      router.push('/login');
    }
  }, [router]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Configurações</h1>
      <p className={styles.subtitle}>Bem-vindo, {username}!</p>
      
      <div className={styles.settingsContainer}>
        <button className={styles.button}>Alterar Plano</button>
        <button className={styles.button}>Mudar Tema</button>
        <button className={styles.button}>Excluir Conta</button>
        <button className={styles.logoutButton} onClick={() => {
          localStorage.removeItem('token');
          router.push('/login');
        }}>Sair</button>
      </div>
    </div>
  );
}
