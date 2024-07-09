import React from 'react';
import resultadosStyles from '../styles/Resultados.module.css';
import documentIcon from '../images/document-icon.png';
import likeIcon from '../images/like-icon.png';
import unlikeIcon from '../images/like-icon.png';

function ResultItem({ inv, isLiked, likeCount, handleLikeClick }) {
  return (
    <div className={resultadosStyles['result-item']}>
      {/* Sección de la imagen del documento */}
      <div className={resultadosStyles['image-container']}>
        <img src={documentIcon} alt="Icono de documento" className={resultadosStyles.image} />
      </div>

      {/* Sección de contenido de la investigación */}
      <div className={resultadosStyles['content-container']}>
        <h3>{inv.title}</h3>
        <p>Autor: {inv.author}</p>
        <p>Área: {inv.area}</p>
        <p>Curso: {inv.curso}</p>
        {/* ... (Puedes agregar más detalles de la investigación aquí) ... */}
      </div>

      {/* Sección de acciones (like y guardar) */}
      <div className={resultadosStyles['action-container']}>
        {/* Botón de like */}
        <div className={resultadosStyles.like}>
          <img
            src={isLiked ? likeIcon : unlikeIcon}
            alt="Like"
            className={resultadosStyles.likeIcon}
            onClick={handleLikeClick}
            style={{ width: '18px', height: '18px' }}
          />
          <span className={resultadosStyles.likeCount}>{likeCount}</span> {/* Contador de likes con clase */}
        </div>

        {/* Botón para guardar la investigación */}
        <button className={resultadosStyles['save-button']} onClick={() => {/* Lógica para guardar */}}>
          Guardar investigación
        </button>
      </div>
    </div>
  );
}

export default ResultItem;
