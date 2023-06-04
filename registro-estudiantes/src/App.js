import React, { useState } from 'react';
import './App.css';
import Estudiante from './components/Estudiante/Estudiante.js';
import Profesor from './components/Profesor/Profesor';
import Materia from './components/Materia/Materia';
import Inicio from './components/Inicio/Inicio';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


function App() {
  const [isNavOpen, setNavOpen] = useState(false);

  const handleToggle = () => {
    setNavOpen(!isNavOpen);
  };

  return (
    <Router>
      <div>
        <div className={`l-navbar ${isNavOpen ? 'show' : ''}`} id="nav-bar">
          <nav className="nav">
            <div>
              <Link to="#" className="header_toggle nav_logo" onClick={handleToggle}>
                <i className="bx bx-grid-alt nav_icon">
                  <img src="https://i.imgur.com/Fd9vXns.png" alt="Menú Icon" />
                </i>
                <span className="nav_name">Inicio</span>
              </Link>
              <div className="nav_list">
                <Link to="/estudiantes" className="nav_link active">
                  <i className="bx bx-grid-alt nav_icon">
                    <img src="https://i.imgur.com/LywOA6W.png" alt="Estudiantes Icon" />
                  </i>
                  <span className="nav_name">Estudiantes</span>
                </Link>
                <Link to="/materias" className="nav_link">
                  <i className="bx bx-user nav_icon">
                    <img src="https://i.imgur.com/KMGOizl.png" alt="Materias Icon" />
                  </i>
                  <span className="nav_name">Materias</span>
                </Link>
                <Link to="/profesores" className="nav_link">
                  <i className="bx bx-message-square-detail nav_icon">
                    <img src="https://i.imgur.com/pKpmwBJ.png" alt="Profesores Icon" />
                  </i>
                  <span className="nav_name">Profesores</span>
                </Link>
              </div>
            </div>
          </nav>
        </div>

        <div className={`content ${isNavOpen ? 'expanded' : ''}`} style={{ padding: '2% 7% 2% 7%' }}>
          <div className="height-100 bg-light">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/estudiantes" element={<Estudiante />} />
              <Route path="/materias" element={<Materia />} />
              <Route path="/profesores" element={<Profesor />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
