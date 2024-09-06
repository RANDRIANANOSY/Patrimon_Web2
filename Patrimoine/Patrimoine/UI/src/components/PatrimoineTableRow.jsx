import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function PatrimoineTableRow({ tableRow }) {
  const [rows, setRows] = useState(tableRow);
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedRow, setUpdatedRow] = useState({});

  // Handle FinalDate button click
  const handleFinalDateClick = (index) => {
    setCurrentIndex(index);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDate('');
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSaveDate = () => {
    if (new Date(selectedDate) <= new Date()) {
      alert('La date de fin doit être supérieure à aujourd\'hui.');
      return;
    }

    const newRows = [...rows];
    newRows[currentIndex].dateFin = selectedDate;
    setRows(newRows);
    handleCloseModal();
  };

  // Handle Delete button click
  const handleDelete = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
    console.log('Deleted row at index', index);
  };

  // Handle Update button click
  const handleUpdateClick = (index) => {
    setCurrentIndex(index);
    setUpdatedRow({ ...rows[index] });
    setShowUpdateModal(true);
  };

  const handleUpdateChange = (event) => {
    const { name, value } = event.target;
    setUpdatedRow({ ...updatedRow, [name]: value });
  };

  const handleUpdateSave = () => {
    const newRows = [...rows];
    newRows[currentIndex] = updatedRow;
    setRows(newRows);
    setShowUpdateModal(false);
  };

  const calculateValeurActuelle = (valeur, tauxAmortissement, dateDebut) => {
    const currentDate = new Date();
    const startDate = new Date(dateDebut);
    const yearsElapsed = (currentDate - startDate) / (1000 * 60 * 60 * 24 * 365); // Convert milliseconds to years
    return valeur * Math.pow((1 - tauxAmortissement / 100), yearsElapsed);
  };

  return (
    <>
      {rows.map((row, index) => (
        <tr key={index}>
          <td>{row.libelle}</td>
          <td>{row.valeur}</td>
          <td>{row.dateDebut}</td>
          <td>{row.dateFin || 'N/A'}</td>
          <td>{row.tauxAmortissement}</td>
          <td>{calculateValeurActuelle(row.valeur, row.tauxAmortissement, row.dateDebut).toFixed(2)}</td>
          <td>
            <Button variant="primary" size="sm" onClick={() => handleUpdateClick(index)}>Update</Button>
            <Button variant="danger" size="sm" className="ms-2" onClick={() => handleDelete(index)}>Delete</Button>
            <Button variant="warning" size="sm" onClick={() => handleFinalDateClick(index)} className="ms-2">FinalDate</Button>
          </td>
        </tr>
      ))}

      {/* FinalDate Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Set Final Date</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Final Date</Form.Label>
            <Form.Control
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveDate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Update Modal */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Possession</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Libellé</Form.Label>
            <Form.Control
              type="text"
              name="libelle"
              value={updatedRow.libelle || ''}
              onChange={handleUpdateChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Valeur</Form.Label>
            <Form.Control
              type="number"
              name="valeur"
              value={updatedRow.valeur || ''}
              onChange={handleUpdateChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date de début</Form.Label>
            <Form.Control
              type="date"
              name="dateDebut"
              value={updatedRow.dateDebut || ''}
              onChange={handleUpdateChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Taux d'amortissement (%)</Form.Label>
            <Form.Control
              type="number"
              name="tauxAmortissement"
              value={updatedRow.tauxAmortissement || ''}
              onChange={handleUpdateChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default React.memo(PatrimoineTableRow);
