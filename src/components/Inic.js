import { useState } from 'react';
import Link from 'next/link';
//import styles from '../styles/inic.module.css'; // Certifique-se de ter este arquivo CSS

function Home() {
  const [recommendedUsers, setRecommendedUsers] = useState([
    { name: 'João', skills: 'Database, Binary' },
    { name: 'Maria', skills: 'Python, Machine Learning' },
    { name: 'Carlos', skills: 'Design Gráfico, UX/UI' },
    { name: 'Ana', skills: 'Marketing Digital, SEO' },
    { name: 'Luiz', skills: 'DevOps, Kubernetes' },
  ]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Bem-vindo ao TrocaDex!</h1>
        <p className={styles.subtitle}>
          A plataforma para você compartilhar e trocar habilidades com pessoas ao redor do mundo.
        </p>
        <Link href="/inic" className={styles.button}>Descubra Mais</Link>
      </header>

      <section className={styles.features}>
        <h2>Como Funciona?</h2>
        <div className={styles.feature}>
          <h3>Conecte-se com outros usuários</h3>
          <p>Encontre pessoas com as habilidades que você procura ou que podem precisar do que você sabe.</p>
        </div>
        <div className={styles.feature}>
          <h3>Crie um perfil</h3>
          <p>Adicione suas habilidades e interesses para ser encontrado facilmente por outros usuários.</p>
        </div>
        <div className={styles.feature}>
          <h3>Troque experiências</h3>
          <p>Se conecte com usuários e troque experiências e conhecimentos de forma colaborativa.</p>
        </div>
      </section>

      <section className={styles.recommended}>
        <h2>Usuários Recomendados</h2>
        <div className={styles.userList}>
          {recommendedUsers.map((user, index) => (
            <div key={index} className={styles.userCard}>
              <h3>{user.name}</h3>
              <p>{user.skills}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <p>© 2025 TrocaDex - Todos os direitos reservados</p>
      </footer>
    </div>
  );
}

export default Home;