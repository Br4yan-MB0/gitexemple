import React, { useEffect, useState } from 'react';

const Menu = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Simulação do status de autenticação
  const [isDatabaseOnline, setIsDatabaseOnline] = useState(false); // Estado inicial como falso

  // Verifica autenticação (simulação)
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // Se houver token, está autenticado
  }, []);

  // Faz requisição para verificar a conexão do banco
  useEffect(() => {
    fetch('/api/check-db-connection')
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          setIsDatabaseOnline(true);
        } else {
          setIsDatabaseOnline(false);
        }
      })
      .catch((error) => {
        console.error('Erro ao verificar o banco de dados:', error);
        setIsDatabaseOnline(false);
      });
  }, []);

  let authLightColor = isAuthenticated ? 'green' : 'red';
  let dbLightColor = isDatabaseOnline ? 'green' : 'red';

  return (
    <div className="menuContainer">
      {/* Luzes de Status no Canto Superior Direito */}
      <div className="statusContainer">
        <div className={`statusLight ${authLightColor}`} title={isAuthenticated ? 'AUTHORIZED' : 'NOT AUTHORIZED'} />
        <div className={`statusLight ${dbLightColor}`} title={isDatabaseOnline ? 'Database ONLINE' : 'Database OFFLINE'} />
      </div>

      {/* Logo Centralizada e Grande */}
      <img src="/TrocaDex.png" alt="TrocaDex Logo" className="logoGreat" />

      {/* Cartão de Menu com Botões Empilhados */}
      <div className="menuCard">
        <ul className="menuList">
          <li><a href="/login" className="menuButton">Login</a></li>
          <li><a href="/register" className="menuButton">Register</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
