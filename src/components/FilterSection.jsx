import React from 'react';

function FilterSection({ selectedFilters, onFilterChange }) {
  const areas = ["IoT", "Software", "Cloud Computing", "Inteligencia Artificial"];
  const periods = ["2023-2", "2023-1", "2022-2"];

  return (
    <div className="filter-section">
      <h3 className="filter-title">Filtros</h3>
      <div className="filter-group"> 
        <h4 className="filter-subtitle">Área</h4>
        {areas.map(area => (
          <label key={area}>
            <div className="checkbox-container">
              <input 
                type="checkbox" 
                value={area} 
                checked={selectedFilters.area.includes(area)}
                onChange={() => onFilterChange('area', area)} 
              />
              {area}
            </div>
          </label>
        ))}
      </div>
      <div className="filter-group">
        <h4 className="filter-subtitle">Período</h4>
        {periods.map(period => (
          <label key={period}>
            <div className="checkbox-container">
              <input 
                type="checkbox" 
                value={period} 
                checked={selectedFilters.period.includes(period)}
                onChange={() => onFilterChange('period', period)} 
              />
              {period}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

export default FilterSection;
