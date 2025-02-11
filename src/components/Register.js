import React, { useState } from 'react';
import { useRouter } from 'next/router';
//import '../styles/LoginRegister.css'; // Use the same Login.css file

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Match variable name with Login.js
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset errors

    if (!email.includes('@')) {
      setErrorMessage('Please enter a valid email!');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('/api/register-user-db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      alert('Registration successful!');
      router.push('/');
    } catch (err) {
      setErrorMessage(err.message || 'Registration failed.');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <img src="/next.svg" alt="Logo" className="logo" />
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div className="input-container">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="button">
            REGISTER
          </button>
        </form>
        <button onClick={() => router.push('/')} className="button mt-20">
          RETURN TO MAIN MENU
        </button>
      </div>
    </div>
  );
};

export default Register;