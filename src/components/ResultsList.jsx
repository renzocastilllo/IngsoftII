import React from 'react';
import ResultItem from './ResultItem';

function ResultsList({ investigaciones }) {
  return (
    <div className="results-list">
      <h2>Resultados 1-{investigaciones.length}</h2>
      {investigaciones.map(inv => (
        <ResultItem key={inv.id} {...inv} />
      ))}
    </div>
  );
}

export default ResultsList;
