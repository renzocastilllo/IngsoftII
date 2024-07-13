import React, { useState, useEffect } from 'react';
import ResultItem from './ResultItem';
import resultadosStyles from '../styles/Resultados.module.css';

function ResultsList({ investigaciones, onSaveInvestigation }) {
  const [likes, setLikes] = useState({});

  useEffect(() => {
    const initialLikes = {};
    investigaciones.forEach(inv => {
      initialLikes[inv.id] = 0;
    });
    setLikes(initialLikes);
  }, [investigaciones]);

  const handleLikeClick = (id) => {
    setLikes(prevLikes => ({
      ...prevLikes,
      [id]: prevLikes[id] + 1,
    }));
  };

  const handleSaveClick = (investigation) => {
    onSaveInvestigation(investigation);
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
            handleSaveClick={() => handleSaveClick(inv)}
          />
        ))
      ) : (
        <p>No se encontraron resultados.</p>
      )}
    </div>
  );
}

export default ResultsList;
