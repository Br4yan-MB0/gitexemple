import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import Link from 'next/link';
import styles from '../styles/home.module.css';

function FirstP() {
  const [recommendedUsers, setRecommendedUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
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

  useEffect(() => {
    async function fetchRecommendedUsers() {
      try {
        const response = await fetch('/api/recommendedUsers');
        const data = await response.json();
        setRecommendedUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Erro ao buscar usuários recomendados:', error);
        setRecommendedUsers([]);
      }
    }
    fetchRecommendedUsers();
  }, []);

  useEffect(() => {
    async function fetchOnlineUsers() {
      try {
        const response = await fetch('/api/onlineUsers');
        const data = await response.json();
        setOnlineUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Erro ao buscar usuários online:', error);
        setOnlineUsers([]);
      }
    }
    fetchOnlineUsers();
  }, []);

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div className={styles.container}>
      <h1>Bem-vindo ao TrocaDex, {username}!</h1>
      <p>A plataforma para você compartilhar e trocar habilidades.</p>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={() => handleNavigation('/configuracoes')}>Configurações</button>
        <button className={styles.button} onClick={() => handleNavigation('/chat')}>Chat</button>
        <button className={styles.button} onClick={() => handleNavigation('/recomendados')}>Recomendados</button>
      </div>
      <section>
        <h2>Usuários Online</h2>
        {onlineUsers.length > 0 ? (
          onlineUsers.map((user, index) => (
            <div key={index} className={styles.userCard}>
              <h3>{user.username}</h3>
              <p>{user.skills}</p>
            </div>
          ))
        ) : (
          <p>Nenhum usuário online no momento.</p>
        )}
      </section>
      <section>
        <h2>Usuários Recomendados</h2>
        {recommendedUsers.map((user, index) => (
          <div key={index} className={styles.userCard}>
            <h3>{user.username}</h3>
            <p>{user.skills}</p>
          </div>
        ))}
      </section>
      <footer>
        <p>© 2025 TrocaDex - Todos os direitos reservados</p>
      </footer>
    </div>
  );
}

export default FirstP;
