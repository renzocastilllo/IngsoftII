import React from 'react';
import PropTypes from 'prop-types';

function FilterSection({ title, filters, selectedFilters, handleFilterChange, className }) {
  return (
    <div className={className}>
      <h3>{title}</h3>
      {filters.map(filter => (
        <div
          key={filter}
          className={`${className} ${selectedFilters.includes(filter) ? 'active' : ''}`}
          onClick={() => handleFilterChange(filter)}
        >
          {filter}
        </div>
      ))}
    </div>
  );
}

FilterSection.propTypes = {
  title: PropTypes.string.isRequired,
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedFilters: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

export default FilterSection;
