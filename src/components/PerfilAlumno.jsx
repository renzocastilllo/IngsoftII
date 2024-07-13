import React, { useState, useEffect } from 'react';
import Header from './Header';
import FormInput from './common/FormInput';
import ProfilePicture from '../images/perfil.png'; // Asegúrate de que esta ruta sea correcta
import Likes from './Likes'; // Importamos el componente Likes
import styles from '../styles/PerfilAlumno.module.css';
import trabajosStyles from '../styles/TrabajosGuardados.module.css';

function PerfilAlumno() {
  const [userData, setUserData] = useState({
    id: '',
    name: '',
    lastName: '',
    username: '',
    emailAddress: '',
    fotoPerfil: null,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({ ...userData });
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('informacion');
  const [trabajosGuardados, setTrabajosGuardados] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/users/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching user data');
        }

        const data = await response.json();

        setUserData(data);
        setUpdatedData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoading(false);
      }
    };

    const fetchSavedArticles = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem('userData')).id;
        const response = await fetch(`http://localhost:8080/api/v1/saved-articles?userId=${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Error fetching saved articles');
        }

        const data = await response.json();
        setTrabajosGuardados(data);
      } catch (error) {
        console.error('Error fetching saved articles:', error);
      }
    };

    fetchUserData();
    fetchSavedArticles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdatedData({ ...updatedData, fotoPerfil: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsEditing(false);

    try {
      const response = await fetch(`http://localhost:8080/api/v1/users/${userData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Error updating user data');
      }

      const data = await response.json();
      setUserData(data);
      setUpdatedData(data); // Asegúrate de actualizar también updatedData con la nueva información
      localStorage.setItem('userData', JSON.stringify(data));
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleDeleteSavedArticle = async (articleId) => {
    try {
      const userId = JSON.parse(localStorage.getItem('userData')).id;
      const response = await fetch(`http://localhost:8080/api/v1/saved-articles?userId=${userId}&articleId=${articleId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        alert('Investigación eliminada del perfil');
        setTrabajosGuardados(prev => prev.filter(trabajo => trabajo.article.id !== articleId));
      } else {
        throw new Error('Error al eliminar la investigación');
      }
    } catch (error) {
      console.error('Error al eliminar la investigación:', error);
    }
  };

  if (isLoading) {
    return <div>Cargando datos del perfil...</div>;
  }

  return (
    <div>
      <Header />
      <div className={styles.profileContent}>
        <h2 className={styles.profileTitle}>Mi perfil</h2>
        <div className={styles.profileHeader}>
          <div className={styles.tabs}>
            <button
              className={activeTab === 'informacion' ? styles.activeTab : ''}
              onClick={() => setActiveTab('informacion')}
            >
              <span className={activeTab === 'informacion' ? styles.tabActiveText : styles.tabText}>Información de la cuenta</span>
            </button>
            <button
              className={activeTab === 'trabajos' ? styles.activeTab : ''}
              onClick={() => setActiveTab('trabajos')}
            >
              <span className={activeTab === 'trabajos' ? styles.tabActiveText : styles.tabText}>Trabajos guardados</span>
            </button>
          </div>
        </div>
        <div className={styles.perfilContainer}>
          {activeTab === 'informacion' && (
            <div className={styles.formContent} style={{ margin: 'auto', width: '60%' }}>
              <form onSubmit={handleSubmit}>
                <div className={styles.inputRow}>
                  <div className={styles.formGroup}>
                    <FormInput
                      label="Nombres"
                      type="text"
                      name="name"
                      value={updatedData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    <FormInput
                      label="Apellidos"
                      type="text"
                      name="lastName"
                      value={updatedData.lastName}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    <FormInput
                      label="Código"
                      type="text"
                      name="username"
                      value={updatedData.username}
                      onChange={handleChange}
                      disabled={true} // El código no debe ser editable
                    />
                    <FormInput
                      label="Correo"
                      type="email"
                      name="emailAddress"
                      value={updatedData.emailAddress}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className={styles.buttonContainer}>
                  {!isEditing ? (
                    <button type="button" className={styles.modificarButton} onClick={() => setIsEditing(true)}>Modificar</button>
                  ) : (
                    <button type="submit" className={styles.cambiarContrasenaButton}>Guardar</button>
                  )}
                </div>
              </form>
              <div className={styles.imageSection}>
                <img
                  src={updatedData.fotoPerfil ? updatedData.fotoPerfil : ProfilePicture}
                  alt="Foto de perfil"
                  onError={(e) => e.target.src = ProfilePicture} // Fallback en caso de error
                />
                <label className={styles.cambiarFotoButton} htmlFor="fotoPerfil" style={{ marginLeft: '-10px' }}>
                  Cambiar foto
                  <input
                    type="file"
                    id="fotoPerfil"
                    name="fotoPerfil"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    disabled={!isEditing}
                  />
                </label>
              </div>
            </div>
          )}
          {activeTab === 'trabajos' && (
            trabajosGuardados.map(trabajo => (
              <div key={trabajo.article.id} className={trabajosStyles.trabajoItem}>
                <img src="https://via.placeholder.com/100" alt="Trabajo" className={trabajosStyles.trabajoImage} />
                <div className={trabajosStyles.trabajoInfo}>
                  <h3 className={trabajosStyles.trabajoTitle}>{trabajo.article.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p className={trabajosStyles.trabajoDescription}>{trabajo.article.resume}</p>
                    <div className={trabajosStyles.trabajoActions} style={{ marginLeft: '200px' }}>
                      <Likes initialLikes={trabajo.likes} />
                      <button className={trabajosStyles.removeButton} onClick={() => handleDeleteSavedArticle(trabajo.article.id)}>Eliminar del perfil</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default PerfilAlumno;
