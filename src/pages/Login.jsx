import React, { useState } from 'react';
import '../styles/login.css'; // Importa tu archivo CSS
import logoicon from '../images/logo.png';  
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Guardar el token JWT en localStorage
        navigate('/resultados'); // Redirigir al usuario a la página principal u otra página protegida
      } else {
        const errorData = await response.text();
        setError(errorData || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error de conexión. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <img src={logoicon} alt="Logo de Lumen Investiga" />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              placeholder="Código"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Ingresar</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <Link to="/register">Regístrate aquí</Link>
      </div>
    </div>
  );
}

export default Login;
