import React, { useState } from 'react';
import axios from 'axios';
import CourseCard from './CourseCard';
import { inputStyle, buttonStyle, formStyle, gridStyle } from '../styles/styles';
import { darkTheme } from '../styles/theme';

const CourseList = ({ courses, onAddCourse, onEditCourse, onDeleteCourse }) => {
  const [newCourse, setNewCourse] = useState({ name: '', students: 0, status: 'active' });

  const handleCourseInput = (event) => {
    setNewCourse({ ...newCourse, [event.target.name]: event.target.value });
  };

  const handleAddCourse = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/api/courses', newCourse);
      setNewCourse({ name: '', students: 0, status: 'active' });
      onAddCourse();
    } catch (error) {
      console.error('Error al agregar curso:', error);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>Cursos</h2>
      <form onSubmit={handleAddCourse} style={formStyle}>
        <input type="text" name="name" placeholder="Nombre del curso" value={newCourse.name} onChange={handleCourseInput} style={{ ...inputStyle, background: darkTheme.inputBackground, borderColor: darkTheme.border, color: darkTheme.textPrimary }} />
        <input type="number" name="students" placeholder="Número de estudiantes" value={newCourse.students} onChange={handleCourseInput} style={{ ...inputStyle, background: darkTheme.inputBackground, borderColor: darkTheme.border, color: darkTheme.textPrimary }} />
        <select name="status" value={newCourse.status} onChange={handleCourseInput} style={{ ...inputStyle, background: darkTheme.inputBackground, borderColor: darkTheme.border, color: darkTheme.textPrimary }}>
          <option value="active">Activo</option>
          <option value="inactive">Inactivo</option>
        </select>
        <button type="submit" style={{ ...buttonStyle, backgroundColor: darkTheme.success }}>Agregar Curso</button>
      </form>
      <div style={gridStyle}>
        {courses.map(course => (
          <CourseCard key={course.id} course={course} onEdit={onEditCourse} onDelete={onDeleteCourse} />
        ))}
      </div>
    </div>
  );
};

export default CourseList;
