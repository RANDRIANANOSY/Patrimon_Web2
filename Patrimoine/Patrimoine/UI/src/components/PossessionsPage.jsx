import React, { useState } from 'react';
import PatrimoineTable from './PatrimoineTable';
import './styles.css'; // Assurez-vous d'importer le fichier CSS

function PossessionsPage() {
  const [data, setData] = useState([]);

  const handleDataLoaded = (loadedData) => {
    setData(loadedData);
  };

  return (
    <div className="list-possession-container">
      <h1 style={{ color: '#fff' }}>Liste des possessions</h1>
      <PatrimoineTable onDataLoaded={handleDataLoaded} />
    </div>
  );
}

export default PossessionsPage;
