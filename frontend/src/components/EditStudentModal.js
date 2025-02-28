import React, { useState, useEffect } from 'react';
import { buttonStyle, modalOverlay, modalContent, inputStyle } from '../styles/styles';

const EditStudentModal = ({ isOpen, onClose, onUpdateStudent, student, darkTheme }) => {
  const [editedStudent, setEditedStudent] = useState({ name: '', email: '' });

  useEffect(() => {
    if (student) {
      setEditedStudent({ ...student });
    }
  }, [student]);

  const handleInputChange = (event) => {
    setEditedStudent({ ...editedStudent, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    onUpdateStudent(editedStudent);
  };

  if (!isOpen) return null;

  return (
    <div style={modalOverlay}>
      <div style={{ ...modalContent, backgroundColor: darkTheme.secondary, color: darkTheme.textPrimary }}>
        <h2>Editar Estudiante</h2>
        <input
          type="text"
          name="name"
          placeholder="Nombre del estudiante"
          value={editedStudent.name}
          onChange={handleInputChange}
          style={{ ...inputStyle, background: darkTheme.inputBackground, borderColor: darkTheme.border, color: darkTheme.textPrimary }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email del estudiante"
          value={editedStudent.email}
          onChange={handleInputChange}
          style={{ ...inputStyle, background: darkTheme.inputBackground, borderColor: darkTheme.border, color: darkTheme.textPrimary }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '2rem' }}>
          <button style={{ ...buttonStyle, backgroundColor: darkTheme.primary }} onClick={handleSubmit}>Actualizar</button>
          <button style={{ ...buttonStyle, backgroundColor: darkTheme.danger }} onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default EditStudentModal;
