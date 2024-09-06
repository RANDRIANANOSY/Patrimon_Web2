import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import PossessionsChart from './PossessionsChart';

function AddPossessionPage() {
  const [libelle, setLibelle] = useState('');
  const [valeur, setValeur] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [tauxAmortissement, setTauxAmortissement] = useState('');
  const [possessions, setPossessions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/')
      .then(response => response.json())
      .then(data => {
        const fetchedPossessions = data.data[1].data.possessions;
        setPossessions(fetchedPossessions);
      })
      .catch(err => console.error('Erreur lors du chargement des possessions:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPossession = {
      libelle,
      valeur: parseFloat(valeur),
      dateDebut: new Date(dateDebut),
      dateFin: dateFin ? new Date(dateFin) : null,
      tauxAmortissement: parseFloat(tauxAmortissement),
    };

    setPossessions([...possessions, newPossession]);

    setLibelle('');
    setValeur('');
    setDateDebut('');
    setDateFin('');
    setTauxAmortissement('');
  };

  return (
    <div>
      <h1>Ajouter une possession</h1>
      <div style={{ width: '80%', margin: '0 auto' }}>
        <PossessionsChart data={possessions} />
      </div>
      <Form onSubmit={handleSubmit}>
       
      </Form>
    </div>
  );
}

export default AddPossessionPage;
