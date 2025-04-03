import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import styles from '../styles/home.module.css';

function FirstP() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      router.replace('/login');
      return;
    }

    try {
      const decoded = jwt.decode(storedToken);
      if (!decoded || typeof decoded !== 'object' || !decoded.username) {
        throw new Error('Token inválido');
      }
      setUsername(decoded.username);
    } catch (error) {
      console.error('Erro na validação do token:', error);
      localStorage.removeItem('token');
      router.replace('/login');
    }
  }, [router]);

  const handleNavigation = (path) => router.push(path);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bem-vindo ao TrocaDex, {username}!</h1>
      <p className={styles.subtitle}>A plataforma para você compartilhar e trocar habilidades.</p>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={() => handleNavigation('/configuracoes')}>Configurações</button>
        <button className={styles.button} onClick={() => handleNavigation('/chat')}>Chat</button>
        <button className={styles.button} onClick={() => handleNavigation('/recomendados')}>Recomendados</button>
      </div>
      <footer className={styles.footer}>
        <p>© 2025 TrocaDex - Todos os direitos reservados</p>
      </footer>
    </div>
  );
}

export default FirstP;
