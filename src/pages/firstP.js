import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import Link from 'next/link';
import '@/styles/inic.module.css'

function FirstP() {
  const [recommendedUsers, setRecommendedUsers] = useState([
    { name: 'João', skills: 'Database, Binary' },
    { name: 'Maria', skills: 'Python, Machine Learning' },
    { name: 'Carlos', skills: 'Design Gráfico, UX/UI' },
    { name: 'Ana', skills: 'Marketing Digital, SEO' },
    { name: 'Luiz', skills: 'DevOps, Kubernetes' },
  ]);
  
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

  return (
    <div>
      <header>
        <h1>Bem-vindo ao TrocaDex, {username}!</h1>
        <p>A plataforma para você compartilhar e trocar habilidades.</p>
        <Link href="/">Descubra Mais</Link>
      </header>

      <section>
        <h2>Usuários Recomendados</h2>
        {recommendedUsers.map((user, index) => (
          <div key={index}>
            <h3>{user.name}</h3>
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
