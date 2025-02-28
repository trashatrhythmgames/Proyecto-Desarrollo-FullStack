import React, { useState } from 'react';
import axios from 'axios';
import StudentCard from './StudentCard';
import { inputStyle, buttonStyle, formStyle, gridStyle } from '../styles/styles';
import { darkTheme } from '../styles/theme';

const StudentList = ({ students, onAddStudent, onEditStudent, onDeleteStudent }) => {
  const [newStudent, setNewStudent] = useState({ name: '', email: '' });

  const handleStudentInput = (event) => {
    setNewStudent({ ...newStudent, [event.target.name]: event.target.value });
  };

  const handleAddStudent = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/api/students', newStudent);
      setNewStudent({ name: '', email: '' });
      onAddStudent();
    } catch (error) {
      console.error('Error al agregar estudiante:', error);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>Estudiantes</h2>
      <form onSubmit={handleAddStudent} style={formStyle}>
        <input type="text" name="name" placeholder="Nombre del estudiante" value={newStudent.name} onChange={handleStudentInput} style={{ ...inputStyle, background: darkTheme.inputBackground, borderColor: darkTheme.border, color: darkTheme.textPrimary }} />
        <input type="email" name="email" placeholder="Email del estudiante" value={newStudent.email} onChange={handleStudentInput} style={{ ...inputStyle, background: darkTheme.inputBackground, borderColor: darkTheme.border, color: darkTheme.textPrimary }} />
        <button type="submit" style={{ ...buttonStyle, backgroundColor: darkTheme.success }}>Agregar Estudiante</button>
      </form>
      <div style={gridStyle}>
        {students.map(student => (
          <StudentCard key={student.id} student={student} onEdit={onEditStudent} onDelete={onDeleteStudent} />
        ))}
      </div>
    </div>
  );
};

export default StudentList;
