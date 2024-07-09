// TrabajoGuardado.jsx
import React, { useState } from 'react';
import trabajosStyles from '../styles/TrabajosGuardados.module.css';
import likeIcon from '../images/like-icon.png';
import unlikeIcon from '../images/like-icon.png';

function TrabajoGuardado({ trabajo }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(trabajo.likes);

  const handleLikeClick = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className={trabajosStyles.trabajoItem}>
      <img src={trabajo.image} alt="Trabajo" className={trabajosStyles.trabajoImage} />
      <div className={trabajosStyles.trabajoInfo}>
        <h3 className={trabajosStyles.trabajoTitle}>{trabajo.title}</h3>
        <p className={trabajosStyles.trabajoDescription}>{trabajo.description}</p>
        <div className={trabajosStyles.trabajoActions}>
          <div className={trabajosStyles.like}>
            <img
              src={isLiked ? likeIcon : unlikeIcon}
              alt="Like"
              className={trabajosStyles.likeIcon}
              onClick={handleLikeClick}
              style={{ width: '18px', height: '18px' }}
            />
            <span className={trabajosStyles.likeCount}>{likeCount}</span>
          </div>
          <button className={trabajosStyles.removeButton}>Eliminar del perfil</button>
        </div>
      </div>
    </div>
  );
}

export default TrabajoGuardado;
