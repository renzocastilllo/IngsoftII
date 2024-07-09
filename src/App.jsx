import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import BusquedaAlumno from './pages/BusquedaAlumno';
import BusquedaProfesor from './pages/BusquedaProfesor'; // Corregir la importación
import Register from './pages/Register';
import PerfilAlumno from './components/PerfilAlumno'; // Importa PerfilAlumno
import PerfilProfesor from './components/PerfilProfesor'; // Importa PerfilProfesor
import DetalleInvestigacion from './pages/DetalleInvestigacion';
import Resultados from './pages/Resultados';
import './styles/App.css';
import investigaciones from './data/db.json';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    area: [],
    curso: [],
  });

  const handleFilterChange = (filterType, filterValue) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType].includes(filterValue)
        ? prevFilters[filterType].filter(item => item !== filterValue)
        : [...prevFilters[filterType], filterValue]
    }));
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/perfilAlumno" element={<PerfilAlumno />} />
          <Route path="/detalle/:id" element={<DetalleInvestigacion investigaciones={investigaciones.investigaciones} />} />
          <Route path="/perfilProfesor" element={<PerfilProfesor />} /> {/* Usa PerfilProfesor en la ruta */}
          <Route path="/busquedaAlumno" element={
            <BusquedaAlumno
              investigaciones={investigaciones.investigaciones} 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedFilters={selectedFilters}
              handleFilterChange={handleFilterChange}
            />
          } />
          <Route path="/busquedaProfesor" element={
            <BusquedaProfesor
              investigaciones={investigaciones.investigaciones} 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedFilters={selectedFilters}
              handleFilterChange={handleFilterChange}
            />
          } />
          <Route path="/resultados" element={
            <Resultados 
              investigaciones={investigaciones.investigaciones} 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedFilters={selectedFilters}
              handleFilterChange={handleFilterChange}
            />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
