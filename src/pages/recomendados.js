import { useEffect, useState } from 'react';
import styles from '../styles/home.module.css';

const RecommendedU = () => {
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
    <div>
      <h1>Página Recomendada</h1>
      <p>Veja abaixo os usuários recomendados:</p>
      <section>
        <h2>Usuários Recomendados</h2>
        {recommendedUsers.length > 0 ? (
          recommendedUsers.map((user, index) => (
            <div key={index} className={styles.userCard}>
              <h3>{user.name}</h3>
              <p>{user.skills}</p>
            </div>
          ))
        ) : (
          <p>Nenhum usuário recomendado no momento.</p>
        )}
      </section>
    </div>
  );
};

export default RecommendedU;
