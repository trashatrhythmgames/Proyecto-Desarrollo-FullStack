import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginForm from './components/LoginForm';
import CourseList from './components/CourseList';
import StudentList from './components/StudentList';
import DeleteModal from './components/DeleteModal';
import EditCourseModal from './components/EditCourseModal';
import EditStudentModal from './components/EditStudentModal';
import Tabs from './components/Tabs';
import { darkTheme } from './styles/theme';
import { buttonStyle } from './styles/styles';

const App = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({ type: null, id: null });
  const [isEditingCourse, setIsEditingCourse] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [editedCourse, setEditedCourse] = useState({ name: '', students: 0, status: 'active' });
  const [isEditingStudent, setIsEditingStudent] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [editedStudent, setEditedStudent] = useState({ name: '', email: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsLoggedIn(true);
      fetchData();
      setActiveTab("courses");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function fetchData() {
    fetchCourses();
    fetchStudents();
  }

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/api/courses');
      // Map _id to id here
      const coursesWithId = response.data.map(course => ({ ...course, id: course._id }));
      setCourses(coursesWithId);
    } catch (error) {
      setError('Error obteniendo cursos:', error);
      console.error(error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/students');
      // Map _id to id here
      const studentsWithId = response.data.map(student => ({ ...student, id: student._id }));
      setStudents(studentsWithId);
    } catch (error) {
      setError('Error obteniendo estudiantes:', error);
      console.error(error);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    fetchData();
    setActiveTab('courses');
  };

  const openDeleteModal = (type, id) => {
    setItemToDelete({ type, id });
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete({ type: null, id: null });
  };

  const handleDelete = async () => {
    try {
      if (itemToDelete.type === 'course') {
        await axios.delete(`/api/courses/${itemToDelete.id}`);
        fetchCourses();
      } else if (itemToDelete.type === 'student') {
        await axios.delete(`/api/students/${itemToDelete.id}`);
        fetchStudents();
      }
      closeDeleteModal();
    } catch (error) {
      setError('Error al eliminar:', error);
      console.error(error);
    }
  };

  const handleEditCourse = (course) => {
    setEditingCourseId(course.id); // Now the id will be defined
    setEditedCourse({ ...course });
    setIsEditingCourse(true);
  };

  const handleUpdateCourse = async (newCourse) => {
    try {
      await axios.put(`/api/courses/${editingCourseId}`, newCourse); // Now the id will be defined
      fetchCourses();
      setIsEditingCourse(false);
    } catch (error) {
      setError('Error al actualizar curso:', error);
      console.error(error);
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudentId(student.id);
    setEditedStudent({ ...student });
    setIsEditingStudent(true);
  };

  const handleUpdateStudent = async (newStudent) => {
    try {
      await axios.put(`/api/students/${editingStudentId}`, newStudent);
      fetchStudents();
      setIsEditingStudent(false);
    } catch (error) {
      setError('Error al actualizar estudiante:', error);
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setActiveTab('login');
    // Clear axios default header
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <div style={{ padding: '2rem', color: darkTheme.textPrimary, background: darkTheme.background, minHeight: '100vh' }}>
      {error && <p>{error}</p>}
      {!isLoggedIn ? (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div>
          <div style={{display: 'flex', justifyContent: "space-between", alignItems: 'center', marginBottom: "1rem"}}>
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <button onClick={handleLogout} style={{ ...buttonStyle, backgroundColor: darkTheme.danger }}>
              Cerrar Sesión
            </button>
          </div>
          {activeTab === 'courses' && (
            <CourseList
              courses={courses}
              onAddCourse={fetchCourses}
              onEditCourse={handleEditCourse}
              onDeleteCourse={openDeleteModal}
            />
          )}

          {activeTab === 'students' && (
            <StudentList
              students={students}
              onAddStudent={fetchStudents}
              onEditStudent={handleEditStudent}
              onDeleteStudent={openDeleteModal}
            />
          )}
        </div>
      )}

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={handleDelete}
        itemType={itemToDelete.type}
        darkTheme={darkTheme}
      />
      {/* Edit Course Modal */}
      {isEditingCourse && (
        <EditCourseModal
          isOpen={isEditingCourse}
          onClose={() => setIsEditingCourse(false)}
          onUpdateCourse={handleUpdateCourse}
          course={editedCourse}
          darkTheme={darkTheme}
        />
      )}

      {/* Edit Student Modal */}
      {isEditingStudent && (
        <EditStudentModal
          isOpen={isEditingStudent}
          onClose={() => setIsEditingStudent(false)}
          onUpdateStudent={handleUpdateStudent}
          student={editedStudent}
          darkTheme={darkTheme}
        />
      )}
    </div>
  );
};

export default App;
