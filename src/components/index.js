import { useEffect, useState } from 'react';
//import styles from './Inic.css'; // Arquivo de estilos para a página

// Exemplo de dados de usuários
const recommendedUsers = [
  {
    id: 1,
    name: 'Lucas',
    region: 'São Paulo',
    interests: ['JavaScript', 'Design'],
    profileImage: '/images/user1.jpg',
  },
  {
    id: 2,
    name: 'Ana',
    region: 'Rio de Janeiro',
    interests: ['Marketing', 'Fotografia'],
    profileImage: '/images/user2.jpg',
  },
  {
    id: 3,
    name: 'Carlos',
    region: 'Minas Gerais',
    interests: ['Python', 'Cultura'],
    profileImage: '/images/user3.jpg',
  },
  {
    id: 4,
    name: 'Maria',
    region: 'Belo Horizonte',
    interests: ['Música', 'Arte'],
    profileImage: '/images/user4.jpg',
  },
  {
    id: 5,
    name: 'Júlia',
    region: 'Curitiba',
    interests: ['Data Science', 'História'],
    profileImage: '/images/user5.jpg',
  },
];

export default function Home() {
  const [users, setUsers] = useState([]);

  // Simula a busca por usuários recomendados (em um sistema real, viria do banco de dados)
  useEffect(() => {
    setUsers(recommendedUsers);
  }, []);

  return (
    <div className={styles.container}>
      <h1>Bem-vindo ao TrocaDex</h1>
      <h2>Usuários Recomendados</h2>
      <div className={styles.userList}>
        {users.map((user) => (
          <div key={user.id} className={styles.userCard}>
            <img src={user.profileImage} alt={user.name} className={styles.profileImage} />
            <div className={styles.userInfo}>
              <h3>{user.name}</h3>
              <p>Região: {user.region}</p>
              <p>Interesses: {user.interests.join(', ')}</p>
            </div>
            <div className={styles.actions}>
              <button className={styles.matchButton}>Fazer Match</button>
              <button className={styles.viewProfileButton}>Ver Perfil</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
