import React from 'react';

function SavedWork({ title, author, onDelete }) {
  return (
    <div className="result-item">
      <img src="/document-icon.png" alt="Document icon" />
      <div>
        <h3>{title}</h3>
        <p className="author">{author}</p>
        {}
        <button className="delete-button" onClick={onDelete}>Eliminar</button>
      </div>
      {}
    </div>
  );
}

export default SavedWork;
