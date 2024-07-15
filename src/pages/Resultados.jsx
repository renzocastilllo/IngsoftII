import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import FilterSection from '../components/FilterSection';
import ResultsList from '../components/ResultsList';
import searchBarStyles from '../styles/ResultadosSearchBar.module.css';
import filterStyles from '../styles/FilterSectionResultados.module.css';
import resultadosStyles from '../styles/Resultados.module.css';

function Resultados() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({ area: [], curso: [] });
  const [investigaciones, setInvestigaciones] = useState([]);
  const [savedInvestigaciones, setSavedInvestigaciones] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/articles', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        const investigacionesAdaptadas = data.map(item => ({
          id: item.id,
          title: item.articleDetailDTO.title,
          area: item.articleDetailDTO.area,
          curso: item.articleDetailDTO.subArea,
          resume: item.articleDetailDTO.resume,
          author: item.articleDetailDTO.author
        }));
        setInvestigaciones(investigacionesAdaptadas);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchArticles();
  }, []);

  const handleFilterChange = (filterType, filterValue) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType].includes(filterValue)
        ? prevFilters[filterType].filter(item => item !== filterValue)
        : [...prevFilters[filterType], filterValue]
    }));
  };

  const handleSaveInvestigation = async (investigation) => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/saved-articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ articleId: investigation.id })
      });

      if (!response.ok) {
        throw new Error('Error al guardar la investigación');
      }

      const updatedSavedInvestigaciones = [...savedInvestigaciones, investigation];
      setSavedInvestigaciones(updatedSavedInvestigaciones);
      localStorage.setItem('savedInvestigaciones', JSON.stringify(updatedSavedInvestigaciones));
      alert('Investigación guardada');
    } catch (error) {
      console.error('Error al guardar la investigación:', error);
      alert('Error al guardar la investigación');
    }
  };

  const filteredInvestigaciones = investigaciones.filter(inv => {
    const titleMatch = inv.title ? inv.title.toLowerCase().includes(searchTerm.toLowerCase()) : false;
    const areaMatch = selectedFilters.area.length === 0 || selectedFilters.area.includes(inv.area);
    const cursoMatch = selectedFilters.curso.length === 0 || selectedFilters.curso.includes(inv.curso);
    return titleMatch && areaMatch && cursoMatch;
  });

  const filters = { area: {}, curso: {} };
  filteredInvestigaciones.forEach(inv => {
    if (inv.area && !filters.area[inv.area]) {
      filters.area[inv.area] = 0;
    }
    filters.area[inv.area] = (filters.area[inv.area] || 0) + 1;
    if (inv.curso && !filters.curso[inv.curso]) {
      filters.curso[inv.curso] = 0;
    }
    filters.curso[inv.curso] = (filters.curso[inv.curso] || 0) + 1;
  });

  return (
    <div className={resultadosStyles.container}>
      <Header />
      <div className={resultadosStyles.resultadosContainer}>
        <div className={resultadosStyles.searchAndResults}>
          <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} className={searchBarStyles.searchBar} />
          {error ? (
            <p>Error fetching data: {error}</p>
          ) : (
            <ResultsList
              investigaciones={filteredInvestigaciones}
              onSaveInvestigation={handleSaveInvestigation}
              className={resultadosStyles.resultsList}
            />
          )}
        </div>
        <div className={resultadosStyles.filters}>
          <h2>Filtros</h2>
          <FilterSection
            title="Área"
            filters={Object.keys(filters.area)}
            selectedFilters={selectedFilters.area}
            handleFilterChange={(value) => handleFilterChange('area', value)}
            className={filterStyles.filterSection}
          />
          <FilterSection
            title="Curso"
            filters={Object.keys(filters.curso)}
            selectedFilters={selectedFilters.curso}
            handleFilterChange={(value) => handleFilterChange('curso', value)}
            className={filterStyles.filterSection}
          />
        </div>
      </div>
    </div>
  );
}

export default Resultados;
