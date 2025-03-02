import React, { useState } from 'react';
import axios from 'axios';
import { darkTheme } from '../styles/theme';
import { buttonStyle, inputStyle, labelStyle, formStyle } from '../styles/styles';

const LoginForm = ({ onLoginSuccess }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      onLoginSuccess();
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    try {
      const response = await axios.post('/api/auth/register', { username:name, email, password });
      setMessage(response.data.message || 'Register success');
      setIsRegistering(false);
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ background: darkTheme.background, color: darkTheme.textPrimary, padding: '20px', borderRadius: '10px', width: '300px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
        <button
          onClick={() => setIsRegistering(false)}
          style={{
            ...buttonStyle,
            backgroundColor: !isRegistering ? darkTheme.primary : darkTheme.secondary,
            borderColor: !isRegistering ? darkTheme.primary : darkTheme.secondary,
          }}
        >
          Login
        </button>
        <button
          onClick={() => setIsRegistering(true)}
          style={{
            ...buttonStyle,
            backgroundColor: isRegistering ? darkTheme.primary : darkTheme.secondary,
            borderColor: isRegistering ? darkTheme.primary : darkTheme.secondary,
          }}
        >
          Register
        </button>
      </div>
      {error && <div style={{ color: darkTheme.danger }}>{error}</div>}
      {message && <div style={{ color: darkTheme.success }}>{message}</div>}
      <form onSubmit={isRegistering ? handleRegister : handleLogin} style={formStyle}>
        {isRegistering && (
          <>
            <label htmlFor="username" style={labelStyle}>Username:</label>
            <input
              type="text"
              id="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={inputStyle}
            />
          </>
        )}

          <label htmlFor="email" style={labelStyle}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />

        <label htmlFor="password" style={labelStyle}>Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />

        <button type="submit" style={{ ...buttonStyle, width: '100%', backgroundColor: darkTheme.primary}}> {/* Changed here */}
          {isRegistering ? 'Register' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
