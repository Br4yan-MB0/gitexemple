import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Register = () => {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState(''); // Pré-visualização da imagem
  const [preferredLanguage, setPreferredLanguage] = useState('English');
  const [region, setRegion] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result); // Criar preview da imagem
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.includes('@')) {
      setErrorMessage('Please enter a valid email!');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('birthDate', birthDate);
    formData.append('bio', bio);
    formData.append('profilePicture', profilePicture); // Adiciona a imagem de perfil
    formData.append('preferredLanguage', preferredLanguage);
    formData.append('region', region);

    try {
      const response = await fetch('/api/register-user-db', {
        method: 'POST',
        body: formData, // Envio como FormData para suportar a imagem
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
        <img src="/trocadex-logo.svg" alt="Logo" className="logo" />
        <h2>Create Your Account</h2>
        <form onSubmit={handleRegister} encType="multipart/form-data">
          <div className="input-container">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
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
          <div className="input-container">
            <label htmlFor="birthDate">Birth Date</label>
            <input
              type="date"
              id="birthDate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us something about yourself"
              rows="3"
            />
          </div>
          <div className="input-container">
            <label htmlFor="profilePicture">Profile Picture</label>
            <input type="file" id="profilePicture" onChange={handleFileChange} accept="image/*" />
            {preview && <img src={preview} alt="Profile Preview" className="profile-preview" />}
          </div>
          <div className="input-container">
            <label htmlFor="preferredLanguage">Preferred Language</label>
            <select
              id="preferredLanguage"
              value={preferredLanguage}
              onChange={(e) => setPreferredLanguage(e.target.value)}
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="Portuguese">Portuguese</option>
              <option value="French">French</option>
            </select>
          </div>
          <div className="input-container">
            <label htmlFor="region">Region</label>
            <input
              type="text"
              id="region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="Enter your city or region"
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="button primary-button">
            Register
          </button>
        </form>
        <button onClick={() => router.push('/')} className="button mt-20">
          Return to Main Menu
        </button>
      </div>
    </div>
  );
};

export default Register;