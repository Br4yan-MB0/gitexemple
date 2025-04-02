import { useEffect, useState } from 'react';

function Match() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/api/match-users');
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="match-container">
      {users.map(user => (
        <div key={user.id} className="match-card">
          <img src={user.profile_picture} alt={user.username} className="profile-picture" />
          <div className="user-info">
            <h3>{user.username}</h3>
            <p>{user.description}</p>
            <p><strong>Skills:</strong> {user.skills}</p>
          </div>
          <div className="actions">
            <button>Curtir</button>
            <button>Chamar para Conversar</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Match;
