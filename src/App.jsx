import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import ProfessorPage from './pages/ProfessorPage';
import investigaciones from './data';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    area: [],
    period: []
  });

  const [savedWorks, setSavedWorks] = useState([]);

  const handleFilterChange = (filterType, filterValue) => {
    setSelectedFilters(prevFilters => {
      const updatedFilters = { ...prevFilters };
      if (filterType === 'area') {
        updatedFilters.area = updatedFilters.area.includes(filterValue)
          ? updatedFilters.area.filter(item => item !== filterValue)
          : [...updatedFilters.area, filterValue];
      } else if (filterType === 'period') {
        updatedFilters.period = updatedFilters.period.includes(filterValue)
          ? updatedFilters.period.filter(item => item !== filterValue)
          : [...updatedFilters.period, filterValue];
      }
      return updatedFilters;
    });
  };

  const handleDeleteSavedWork = (workId) => {
    setSavedWorks(prevSavedWorks => prevSavedWorks.filter(work => work.id !== workId));
  };

  const filteredInvestigaciones = investigaciones.filter(inv => {
    const titleMatch = inv.title.toLowerCase().includes(searchTerm.toLowerCase());
    const areaMatch = selectedFilters.area.length === 0 || selectedFilters.area.includes(inv.area);
    const periodMatch = selectedFilters.period.length === 0 || selectedFilters.period.includes(inv.period);
    return titleMatch && areaMatch && periodMatch;
  });

  return (
    <Router>
      <div className="app-container">
        <Header />
        <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage 
              filteredInvestigaciones={filteredInvestigaciones} 
              searchTerm={searchTerm} 
              selectedFilters={selectedFilters} 
              handleFilterChange={handleFilterChange} />} />
          <Route path="/usuario" element={
            <UserPage
              savedWorks={savedWorks}
              onDeleteSavedWork={handleDeleteSavedWork}
              investigaciones={investigaciones}
              selectedFilters={selectedFilters} 
              handleFilterChange={handleFilterChange} 
            />
          } />
          <Route path="/profesor" element={
            <ProfessorPage
              investigaciones={investigaciones}
              onDeleteSavedWork={handleDeleteSavedWork} 
            />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
