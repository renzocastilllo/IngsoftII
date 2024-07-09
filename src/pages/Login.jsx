import React, { useState } from 'react';
import '../styles/login.css'; // Importa tu archivo CSS
import logoicon from '../images/logo.png';  
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí iría tu lógica de inicio de sesión
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <img src={logoicon} alt="Logo de Lumen Investiga" />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Correo" 
              onChange={(e) => setEmail(e.target.value)}
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
        <Link to="/register">Regístrate aquí</Link>
      </div>
    </div>
  );
}

export default Login;
