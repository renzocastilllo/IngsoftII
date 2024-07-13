import React from 'react';
import { Link } from 'react-router-dom';
import resultadosStyles from '../styles/Resultados.module.css';
import documentIcon from '../images/document-icon.png';
import likeIcon from '../images/like-icon.png';

function ResultItem({ inv, isLiked, likeCount, handleLikeClick, handleSaveClick }) {
  return (
    <div className={resultadosStyles['result-item']} key={inv.id}>
      <div className={resultadosStyles['image-container']}>
        <img src={documentIcon} alt="Icono de documento" className={resultadosStyles.image} />
      </div>
      <div className={resultadosStyles['content-container']}>
        <Link to={`/detalle/${inv.id}`} className={resultadosStyles['title-link']}>
          <h3>{inv.title}</h3>
        </Link>
        <p>Autor: {inv.author}</p>
        <p>Área: {inv.area}</p>
        <p>Curso: {inv.curso}</p>
        <p>Resumen: {inv.resume}</p>
      </div>
      <div className={resultadosStyles['action-container']}>
        <div className={resultadosStyles.like}>
          <img
            src={isLiked ? likeIcon : likeIcon}
            alt="Like"
            className={resultadosStyles.likeIcon}
            onClick={handleLikeClick}
            style={{ width: '18px', height: '18px' }}
          />
          <span className={resultadosStyles.likeCount}>{likeCount}</span>
        </div>
        <button className={resultadosStyles['save-button']} onClick={handleSaveClick}>
          Guardar investigación
        </button>
      </div>
    </div>
  );
}

export default ResultItem;
