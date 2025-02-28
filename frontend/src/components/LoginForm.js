import React, { useState } from 'react';
import axios from 'axios';
import { inputStyle, buttonStyle, formStyle } from '../styles/styles';
import { darkTheme } from '../styles/theme';

const LoginForm = ({ onLoginSuccess }) => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginError(''); // Clear any previous error messages
    try {
      const response = await axios.post('/api/auth/login', loginData); // Corrected line!
      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      onLoginSuccess();
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setLoginError(error.response.data.message);
      } else {
          setLoginError('Error en el inicio de sesión. Inténtalo de nuevo.');
      }
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ ...formStyle, maxWidth: '400px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Iniciar Sesión</h2>
      {loginError && <p style={{ color: darkTheme.danger, textAlign: 'center' }}>{loginError}</p>}
      <input type="email" name="email" placeholder="Email" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} style={{ ...inputStyle, background: darkTheme.inputBackground, borderColor: darkTheme.border, color: darkTheme.textPrimary }} />
      <input type="password" name="password" placeholder="Contraseña" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} style={{ ...inputStyle, background: darkTheme.inputBackground, borderColor: darkTheme.border, color: darkTheme.textPrimary }} />
      <button type="submit" style={{ ...buttonStyle, backgroundColor: darkTheme.primary, width: '100%', justifyContent: 'center' }}>Iniciar Sesión</button>
    </form>
  );
};

export default LoginForm;
