import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import profileIcon from '../images/perfil.png'; // Corregir la ruta de la imagen
import '../index.css'; // Corregir la ruta del CSS

function Header() {
  const location = useLocation();
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/users/role', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Asegúrate de tener el token guardado en localStorage
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUserRole(data.role); // Suponiendo que la respuesta contiene el rol del usuario
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole();
  }, []);

  // Determina la ruta de perfil según el rol del usuario
  let perfilPath = '/';
  if (userRole === 'STUDENT') {
    perfilPath = '/perfilAlumno';
  } else if (userRole === 'TEACHER') {
    perfilPath = '/perfilProfesor';
  }

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token del localStorage
    window.location.href = '/'; // Redirige al usuario a la página de inicio o de login
  };

  return (
    <header className="header">
      <Link to="/resultados" className="title-link">
        <h1>Lumen Investiga</h1>
      </Link>
      {location.pathname !== '/' && (
        <div className="profile-container">
          <Link to={perfilPath} className="home-link profile-item">
            <span className="profile-text">Perfil</span>
            <img src={profileIcon} alt="Profile icon" className="profile-icon" />
          </Link>
          <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
        </div>
      )}
    </header>
  );
}

export default Header;
