import { useEffect, useState } from 'react';
import styles from '../styles/home.module.css';

function RecommendedUsers() {
  const [recommendedUsers, setRecommendedUsers] = useState([]);

  useEffect(() => {
    async function fetchRecommendedUsers() {
      try {
        const response = await fetch('/api/recommendedUsers');
        const data = await response.json();
        // Garante que 'data' seja um array antes de definir o estado
        setRecommendedUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Erro ao buscar usuários recomendados:', error);
        setRecommendedUsers([]);
      }
    }
    fetchRecommendedUsers();
  }, []);

  return (
    <section>
      <h2>Usuários Recomendados</h2>
      {recommendedUsers.map((user, index) => (
        <div key={index} className={styles.userCard}>
          <h3>{user.name}</h3>
          <p>{user.skills}</p>
        </div>
      ))}
    </section>
  );
}

export default RecommendedUsers;
