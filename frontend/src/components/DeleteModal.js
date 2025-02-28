import React from 'react';
import { buttonStyle, modalOverlay, modalContent } from '../styles/styles';

const DeleteModal = ({ isOpen, onClose, onDelete, itemType, darkTheme }) => {
  if (!isOpen) return null;

  return (
    <div style={modalOverlay}>
      <div style={{ ...modalContent, backgroundColor: darkTheme.secondary, color: darkTheme.textPrimary }}>
        <h2>¿Estás seguro de que quieres eliminar este {itemType === 'course' ? 'curso' : 'estudiante'}?</h2>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '2rem' }}>
          <button style={{ ...buttonStyle, backgroundColor: darkTheme.danger }} onClick={onDelete}>Eliminar</button>
          <button style={{ ...buttonStyle, backgroundColor: darkTheme.primary }} onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
