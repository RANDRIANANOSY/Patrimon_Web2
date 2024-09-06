import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import PatrimoineTableRow from './PatrimoineTableRow';
import { Spinner, Alert } from 'react-bootstrap';
import './styles.css';

function PatrimoineTable({ onDataLoaded }) {
  const [donnee, setDonnee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/')
      .then(response => response.json())
      .then(data => {
        const possessions = data.data[1].data.possessions;
        setDonnee(possessions);
        setLoading(false);
        if (onDataLoaded) {
          onDataLoaded(possessions); 
        }
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [onDataLoaded]);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">Erreur de chargement des données</Alert>;

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Libelle</th>
              <th>Valeur</th>
              <th>Date Début</th>
              <th>Date Fin</th>
              <th>Taux Amortissement</th>
              <th>Valeur Actuelle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <PatrimoineTableRow tableRow={donnee} />
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default PatrimoineTable;