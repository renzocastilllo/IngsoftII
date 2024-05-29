import React from 'react';
import ResultItem from '../components/ResultItem';
import ActionsSection from '../components/ActionsSection'; 

function ProfessorPage({ investigaciones, onDeleteSavedWork }) {
  return (
    <div className="user-page">
      <h2>Trabajos Subidos:</h2>
      <div className="content">
        <div className="filter-container"> {}
          <ActionsSection />
        </div>
        <div className="saved-works-and-articles">
          <div className="results-list"> 
            {investigaciones.map(work => (
              <ResultItem key={work.id} {...work} onDelete={onDeleteSavedWork} isProfessorPage={true} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfessorPage;
