import React, { useState, useEffect } from 'react';
import { buttonStyle, modalOverlay, modalContent, inputStyle } from '../styles/styles';

const EditCourseModal = ({ isOpen, onClose, onUpdateCourse, course, darkTheme }) => {
  const [editedCourse, setEditedCourse] = useState({ name: '', students: 0, status: 'active' });

  useEffect(() => {
    if (course) {
      setEditedCourse({ ...course });
    }
  }, [course]);

  const handleInputChange = (event) => {
    setEditedCourse({ ...editedCourse, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    onUpdateCourse(editedCourse);
  };

  if (!isOpen) return null;

  return (
    <div style={modalOverlay}>
      <div style={{ ...modalContent, backgroundColor: darkTheme.secondary, color: darkTheme.textPrimary }}>
        <h2>Editar Curso</h2>
        <input
          type="text"
          name="name"
          placeholder="Nombre del curso"
          value={editedCourse.name}
          onChange={handleInputChange}
          style={{ ...inputStyle, background: darkTheme.inputBackground, borderColor: darkTheme.border, color: darkTheme.textPrimary }}
        />
        <input
          type="number"
          name="students"
          placeholder="Número de estudiantes"
          value={editedCourse.students}
          onChange={handleInputChange}
          style={{ ...inputStyle, background: darkTheme.inputBackground, borderColor: darkTheme.border, color: darkTheme.textPrimary }}
        />
        <select
          name="status"
          value={editedCourse.status}
          onChange={handleInputChange}
          style={{ ...inputStyle, background: darkTheme.inputBackground, borderColor: darkTheme.border, color: darkTheme.textPrimary }}
        >
          <option value="active">Activo</option>
          <option value="inactive">Inactivo</option>
        </select>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '2rem' }}>
          <button style={{ ...buttonStyle, backgroundColor: darkTheme.primary }} onClick={handleSubmit}>Actualizar</button>
          <button style={{ ...buttonStyle, backgroundColor: darkTheme.danger }} onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default EditCourseModal;
