<<<<<<< HEAD
import React from 'react';
//import '../styles/Menu.css';

const Menu = () => {
  const isAuthenticated = false; // Simulação do status de autenticação
  const isDatabaseOnline = true; // Simulação do status do banco de dados

  return (
    <div className="menuContainer">
      {/* Cabeçalho */}
      <header className="menuHeader">
        <img src="/logo.png" alt="TrocaDex Logo" className="logoSmall" />
        <div className="statusContainer">
          <p className={`authStatus ${isAuthenticated ? 'online' : 'offline'}`}>
            {isAuthenticated ? 'AUTHORIZED' : 'NOT AUTHORIZED'}
          </p>
          <p className="dbStatus" style={{ color: isDatabaseOnline ? 'green' : 'red' }}>
            Database {isDatabaseOnline ? 'ONLINE' : 'OFFLINE'}
          </p>
        </div>
      </header>
      
      {/* Cartão de Menu */}
      <div className="menuCard">
        <h2>TrocaDex Dashboard</h2>
        <ul className="menuList">
          <li><a href="/login" className="menuButton">Login</a></li>
          <li><a href="/register" className="menuButton">Register</a></li>
          <li><a href="/profile" className="menuButton">View Profile</a></li>
          <li><a href="/match" className="menuButton">Match Zone</a></li>
          <li><a href="/settings" className="menuButton">Settings</a></li>
          <li><button className="menuButton logoutButton">Logout</button></li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
