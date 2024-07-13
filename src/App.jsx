import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import BusquedaAlumno from './pages/BusquedaAlumno';
import BusquedaProfesor from './pages/BusquedaProfesor'; // Importación correcta
import Register from './pages/Register';
import PerfilAlumno from './components/PerfilAlumno'; // Importación correcta
import PerfilProfesor from './components/PerfilProfesor'; // Importación correcta
import DetalleInvestigacion from './pages/DetalleInvestigacion';
import Resultados from './pages/Resultados';
import './styles/App.css';
import investigaciones from './data/db.json';
import ProtectedRoute from './components/ProtectedRoute'; // Importación correcta

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
          <Route path="/perfilAlumno" element={<ProtectedRoute><PerfilAlumno /></ProtectedRoute>} />
          <Route path="/detalle/:id" element={<ProtectedRoute><DetalleInvestigacion /></ProtectedRoute>} />
          <Route path="/perfilProfesor" element={<ProtectedRoute><PerfilProfesor /></ProtectedRoute>} /> {/* Usa PerfilProfesor en la ruta */}
          <Route path="/busquedaAlumno" element={
            <ProtectedRoute>
              <BusquedaAlumno
                investigaciones={investigaciones.investigaciones} 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedFilters={selectedFilters}
                handleFilterChange={handleFilterChange}
              />
            </ProtectedRoute>
          } />
          <Route path="/busquedaProfesor" element={
            <ProtectedRoute>
              <BusquedaProfesor
                investigaciones={investigaciones.investigaciones} 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedFilters={selectedFilters}
                handleFilterChange={handleFilterChange}
              />
            </ProtectedRoute>
          } />
          <Route path="/resultados" element={
            <ProtectedRoute>
              <Resultados 
                investigaciones={investigaciones.investigaciones} 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedFilters={selectedFilters}
                handleFilterChange={handleFilterChange}
              />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} /> {/* Ruta de login definida */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
