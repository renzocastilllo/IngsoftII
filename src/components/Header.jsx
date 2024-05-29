import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import profileIcon from '../perfil.png';

function Header() {
  const location = useLocation();

  return (
    <header className="header">
      {location.pathname !== '/' && ( 
        <Link to="/" className="home-link">Home Page</Link>
      )}

      <h1>Lumen Investiga</h1>

      <div className="profile-container">
        {location.pathname === '/usuario' ? ( 
          <>
            <span className="profile-text">Hola, Juan</span>
            <img src={profileIcon} alt="Profile icon" className="profile-icon" />
          </>
        ) : location.pathname === '/profesor' ? ( 
            <>
              <span className="profile-text">Hola, Profesor</span>
              <img src={profileIcon} alt="Profile icon" className="profile-icon" />
            </>
          ) : ( // Renderizado para otras páginas
          <>
            <span className="profile-text">Perfil</span>
            <img src={profileIcon} alt="Profile icon" className="profile-icon" />
          </>
        )}
      </div>
    </header>
  );
}

export default Header;

