import React from 'react';

function SearchBar({ searchTerm, onSearch, className }) {
  return (
    <div className={`search-bar ${className}`}>
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
      <button className="search-button">Buscar</button>
    </div>
  );
}

export default SearchBar;
