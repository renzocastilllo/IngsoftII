import React, { useState, useEffect } from 'react';
import ResultItem from './ResultItem';
import resultadosStyles from '../styles/Resultados.module.css';

function ResultsList({ investigaciones }) {
  const [likes, setLikes] = useState({});

  useEffect(() => {
    // Inicializar likes para cada investigación
    const initialLikes = {};
    investigaciones.forEach(inv => {
      initialLikes[inv.id] = 0; // Inicializar likes en 0
    });
    setLikes(initialLikes);
  }, [investigaciones]); // Dependencia del useEffect

  const handleLikeClick = (id) => {
    setLikes(prevLikes => ({
      ...prevLikes,
      [id]: prevLikes[id] + 1,
    }));
  };

  return (
    <div className={resultadosStyles['results-list']}>
      <h2 className={resultadosStyles['results-title']}>Resultados ({investigaciones.length})</h2>
      {investigaciones.length > 0 ? (
        investigaciones.map(inv => (
          <ResultItem
            key={inv.id}
            inv={inv}
            isLiked={likes[inv.id] > 0}
            likeCount={likes[inv.id]}
            handleLikeClick={() => handleLikeClick(inv.id)}
          />
        ))
      ) : (
        <p>No se encontraron resultados.</p>
      )}
    </div>
  );
}



export default ResultsList;
