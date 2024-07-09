import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import profileIcon from '../images/perfil.png'; // Corregir la ruta de la imagen
import '../index.css'; // Corregir la ruta del CSS

function Header() {
  const location = useLocation();

  // Determina la ruta de perfil según la ubicación actual
  let perfilPath = '';
  if (location.pathname === '/busquedaprofesor') {
    perfilPath = '/perfilprofesor';
  } else if (location.pathname === '/busquedaalumno') {
    perfilPath = '/perfilalumno';
  } else {
    perfilPath = '/';
  }

  return (
    <header className="header">
      <h1>Lumen Investiga</h1>
      {location.pathname !== '/' && (
        <Link to={perfilPath} className="home-link profile-container">
          <span className="profile-text">Perfil</span>
          <img src={profileIcon} alt="Profile icon" className="profile-icon" />
        </Link>
      )}
    </header>
  );
}

export default Header;
