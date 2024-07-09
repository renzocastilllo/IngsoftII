import React, { useState, useEffect } from 'react';
import Header from './Header';
import FormInput from './common/FormInput';
import ProfilePicture from '../images/perfil.png'; // Asegúrate de que esta ruta sea correcta
import Likes from './Likes'; // Importamos el componente Likes
import styles from '../styles/PerfilAlumno.module.css';
import trabajosStyles from '../styles/TrabajosGuardados.module.css';

function PerfilAlumno() {
  const [userData, setUserData] = useState({
    nombres: '',
    apellidos: '',
    codigo: '',
    correo: '',
    fotoPerfil: null,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({ ...userData });
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('informacion');
  const [trabajosGuardados] = useState([
    {
      id: 1,
      title: 'Investigación 1',
      description: 'Descripción de la investigación 1',
      image: 'https://via.placeholder.com/100',
      likes: 7, // Cambiado de rating a likes
    },
    {
      id: 2,
      title: 'Investigación 2',
      description: 'Descripción de la investigación 2',
      image: 'https://via.placeholder.com/100',
      likes: 5, // Cambiado de rating a likes
    },
  ]);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (storedUserData) {
      setUserData(storedUserData);
      setUpdatedData(storedUserData);
    }
    setIsLoading(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setUserData(updatedData);
    localStorage.setItem('userData', JSON.stringify(updatedData));
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
                      name="nombres"
                      value={updatedData.nombres}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    <FormInput
                      label="Apellidos"
                      type="text"
                      name="apellidos"
                      value={updatedData.apellidos}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    <FormInput
                      label="Código"
                      type="text"
                      name="codigo"
                      value={updatedData.codigo}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    <FormInput
                      label="Correo"
                      type="email"
                      name="correo"
                      value={updatedData.correo}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className={styles.buttonContainer}>
                  <button type="button" className={styles.modificarButton} onClick={() => setIsEditing(!isEditing)}>Modificar</button>
                  <button type="button" className={styles.cambiarContrasenaButton}>Cambiar contraseña</button>
                </div>
              </form>
              <div className={styles.imageSection}>
                <img
                  src={updatedData.fotoPerfil ? updatedData.fotoPerfil : ProfilePicture}
                  alt="Foto de perfil"
                  onError={(e) => e.target.src = ProfilePicture} // Fallback en caso de error
                />
                <label className={styles.cambiarFotoButton} htmlFor="fotoPerfil" style={{ marginLeft: '-10px' }}> {/* Modificación aquí */}
                  Cambiar foto
                  <input
                    type="file"
                    id="fotoPerfil"
                    name="fotoPerfil"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
            </div>
          )}
          {activeTab === 'trabajos' && (
            trabajosGuardados.map(trabajo => (
              <div key={trabajo.id} className={trabajosStyles.trabajoItem}>
                <img src={trabajo.image} alt="Trabajo" className={trabajosStyles.trabajoImage} />
                <div className={trabajosStyles.trabajoInfo}>
                  <h3 className={trabajosStyles.trabajoTitle}>{trabajo.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p className={trabajosStyles.trabajoDescription}>{trabajo.description}</p>
                    <div className={trabajosStyles.trabajoActions} style={{ marginLeft: '200px' }}> {/* Añadido aquí */}
                      <Likes initialLikes={trabajo.likes} />
                      <button className={trabajosStyles.removeButton}>Eliminar del perfil</button>
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
