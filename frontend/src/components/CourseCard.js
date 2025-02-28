import React from 'react';
import { buttonStyle } from '../styles/styles';
import { darkTheme } from '../styles/theme';

const CourseCard = ({ course, onEdit, onDelete }) => (
  <div style={{
    background: darkTheme.cardBackground,
    padding: '1.5rem',
    borderRadius: '8px',
    transition: 'transform 0.2s ease',
    ':hover': {
      transform: 'translateY(-2px)'
    }
  }}>
    <h3 style={{ marginBottom: '0.5rem', color: darkTheme.textPrimary, fontSize: '1.2rem' }}>{course.name}</h3>
    <p style={{ color: darkTheme.textSecondary, marginBottom: '0.5rem' }}>Estudiantes: {course.students}</p>
    <p style={{ color: darkTheme.textSecondary, marginBottom: '0.5rem' }}>Estado: {course.status}</p>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <button onClick={() => onEdit(course)} style={{ ...buttonStyle, backgroundColor: darkTheme.primary }}>
        <i className="fas fa-edit"></i>
      </button>
      <button onClick={() => onDelete('course', course.id)} style={{ ...buttonStyle, backgroundColor: darkTheme.danger }}>
        <i className="fas fa-trash"></i>
      </button>
    </div>
  </div>
);

export default CourseCard;
