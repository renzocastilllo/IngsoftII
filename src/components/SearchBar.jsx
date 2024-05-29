import React from 'react';

function SearchBar({ searchTerm, onSearch }) {
  return (
    <div className="search-bar">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        placeholder="Ingresa una o más palabras clave"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
      <button className="search-button">Buscar</button>
    </div>
  );
}

export default SearchBar;
