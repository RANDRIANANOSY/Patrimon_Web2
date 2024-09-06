import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/App.css'; // Importation du fichier CSS
import PossessionsPage from './components/PossessionsPage.jsx';
import AddPossessionPage from './components/AddPossessionsPage.jsx';

function App() {
  return (
    <Router>
      <Navbar expand="lg" className="bg">
        <Navbar.Brand as={Link} to="/" className="patrimoine">PATRIMOINE</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/" className="Liste">Liste des possessions</Nav.Link>
          <Nav.Link as={Link} to="/add" className="Liste3">Courbe de patrimoine</Nav.Link>
        </Nav>
      </Navbar>

      <Routes>
        <Route path="/" element={<PossessionsPage />} />
        <Route path="/add" element={<AddPossessionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
