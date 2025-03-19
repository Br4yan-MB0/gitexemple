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
      router.push('/login');
      return;
    }

    try {
      const decoded = jwt.decode(storedToken);
      if (!decoded || !decoded.username) {
        throw new Error('Invalid token');
      }
      setUsername(decoded.username);
    } catch (error) {
      console.error('Token validation error:', error);
      router.push('/login');
    }
  }, [router]);

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div className={styles.container}>
      <h1>Bem-vindo ao TrocaDex, {username}!</h1>
      <p>A plataforma para você compartilhar e trocar habilidades.</p>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={() => handleNavigation('/configur')}>Configurações</button>
        <button className={styles.button} onClick={() => handleNavigation('/chat')}>Chat</button>
        <button className={styles.button} onClick={() => handleNavigation('/recommendedU')}>Recomendados</button>
      </div>
      <footer>
        <p>© 2025 TrocaDex - Todos os direitos reservados</p>
      </footer>
    </div>
  );
}

export default FirstP;
