import React from 'react';
import FilterSection from '../components/FilterSection';
import ResultsList from '../components/ResultsList';

function HomePage({ filteredInvestigaciones, searchTerm, selectedFilters, handleFilterChange }) { 

  return (
    <div className="content">
      <ResultsList investigaciones={filteredInvestigaciones} />
      <div>
        <FilterSection selectedFilters={selectedFilters} onFilterChange={handleFilterChange} />
      </div>
    </div>
  );
}
export default HomePage;