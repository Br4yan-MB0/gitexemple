import React, { useState } from 'react';
import { useRouter } from 'next/router';

//import '../styles/LoginRegister.css';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous errors
    try {
      const response = await fetch('/api/login-user-db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // Save token securely
        router.push('../components/index.js'); // Redirect to index page
      } else {
        setErrorMessage(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <img src="/trocadex-logo.svg" alt="TrocaDex Logo" className="logo" />
        <h2>Welcome Back!</h2>
        <p className="subtitle">Log in to exchange your skills and grow with TrocaDex</p>
        <form onSubmit={handleLogin} className="form">
          <div className="input-container">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="button primary-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;