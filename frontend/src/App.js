import React, { useState, useEffect, useCallback } from 'react';
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
import CurrencyConverter from './components/CurrencyConverter';

// Set the base URL for all axios requests
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const App = () => {
  const [activeAppTab, setActiveAppTab] = useState('courses');
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
  const [coursePage, setCoursePage] = useState(1);
  const [courseLimit, setCourseLimit] = useState(10);
  const [courseSearch, setCourseSearch] = useState('');

  const [studentPage, setStudentPage] = useState(1);
  const [studentLimit, setStudentLimit] = useState(10);
  const [studentSearch, setStudentSearch] = useState('');

  const fetchCourses = useCallback(async () => {
    try {
      const response = await axios.get('/api/courses', {
        params: {
          page: coursePage,
          limit: courseLimit,
          search: courseSearch,
        },
      });
      const coursesWithId = response.data.courses.map((course) => ({
        ...course,
        id: course._id,
      }));
      setCourses(coursesWithId);
      console.log('Total courses:', response.data.total);
      console.log('Current page:', response.data.currentPage);
      console.log('Total pages:', response.data.totalPages);
    } catch (error) {
      setError('Error obteniendo cursos:', error);
      console.error(error);
    }
  }, [coursePage, courseLimit, courseSearch]);

  const fetchStudents = useCallback(async () => {
    try {
      const response = await axios.get('/api/students', {
        params: {
          page: studentPage,
          limit: studentLimit,
          search: studentSearch,
        },
      });
      const studentsWithId = response.data.students.map((student) => ({
        ...student,
        id: student._id,
      }));
      setStudents(studentsWithId);
      console.log('Total students:', response.data.total);
      console.log('Current page:', response.data.currentPage);
      console.log('Total pages:', response.data.totalPages);
    } catch (error) {
      setError('Error obteniendo estudiantes:', error);
      console.error(error);
    }
  }, [studentPage, studentLimit, studentSearch]);

  const fetchData = useCallback(() => {
    fetchCourses();
    fetchStudents();
  }, [fetchCourses, fetchStudents]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsLoggedIn(true);
      fetchData();
      setActiveAppTab('courses');
    }
  }, [fetchData]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    fetchData();
    setActiveAppTab('courses');
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
    setEditingCourseId(course.id);
    setEditedCourse({ ...course });
    setIsEditingCourse(true);
  };

  const handleUpdateCourse = async (newCourse) => {
    try {
      await axios.put(`/api/courses/${editingCourseId}`, newCourse);
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
    setActiveAppTab('courses');
    delete axios.defaults.headers.common['Authorization'];
  };

  const handleCoursePageChange = (newPage) => {
    if (newPage < 1) {
      newPage = 1;
    }
    setCoursePage(newPage);
  };

  const handleCourseLimitChange = (newLimit) => {
    setCourseLimit(newLimit);
    setCoursePage(1);
  };

  const handleCourseSearchChange = (newSearch) => {
    setCourseSearch(newSearch);
    setCoursePage(1);
  };
  const handleStudentPageChange = (newPage) => {
    if (newPage < 1) {
      newPage = 1;
    }
    setStudentPage(newPage);
  };

  const handleStudentLimitChange = (newLimit) => {
    setStudentLimit(newLimit);
    setStudentPage(1);
  };

  const handleStudentSearchChange = (newSearch) => {
    setStudentSearch(newSearch);
    setStudentPage(1);
  };
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return (
    <div style={{ padding: '2rem', color: darkTheme.textPrimary, background: darkTheme.background, minHeight: '100vh' }}>
      {error && <p>{error}</p>}
      {!isLoggedIn ? (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div>
          <div style={{ display: 'flex', justifyContent: "space-between", alignItems: 'center', marginBottom: "1rem" }}>
            <Tabs activeTab={activeAppTab} setActiveTab={setActiveAppTab} />
            <button onClick={handleLogout} style={{ ...buttonStyle, backgroundColor: darkTheme.danger }}>
              Cerrar Sesión
            </button>
          </div>
          {activeAppTab === 'currency' && (
            <CurrencyConverter />
          )}
          {activeAppTab === 'courses' && (
            <>
              <div style={{ display: "flex", justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <label htmlFor="courseSearchInput">Buscar por Nombre: </label> {/* Changed htmlFor */}
                  <input type="text" id="courseSearchInput" value={courseSearch} onChange={(e) => handleCourseSearchChange(e.target.value)} style={{ background: darkTheme.inputBackground, borderColor: darkTheme.border, color: darkTheme.textPrimary }} /> {/* Changed id */}
                </div>
                <div>
                  <label htmlFor="courseLimitSelect">Límite por página:</label> {/* Changed htmlFor */}
                  <select id="courseLimitSelect" value={courseLimit} onChange={(e) => handleCourseLimitChange(parseInt(e.target.value))} style={{ background: darkTheme.inputBackground, borderColor: darkTheme.border, color: darkTheme.textPrimary }}> {/* Changed id */}
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="coursePageInput">Página:</label> {/* Changed htmlFor */}
                  <input type="number" id="coursePageInput" value={coursePage} onChange={(e) => handleCoursePageChange(parseInt(e.target.value))} min="1" style={{ background: darkTheme.inputBackground, borderColor: darkTheme.border, color: darkTheme.textPrimary, width: '50px' }} /> {/* Changed id */}
                </div>
              </div>
              <CourseList
                courses={courses}
                onAddCourse={fetchCourses}
                onEditCourse={handleEditCourse}
                onDeleteCourse={openDeleteModal}
              />
            </>
          )}

          {activeAppTab === 'students' && (
            <>
              <div style={{ display: "flex", justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <label htmlFor="studentSearchInput">Buscar por Nombre o Email: </label> {/* Changed htmlFor */}
                  <input type="text" id="studentSearchInput" value={studentSearch} onChange={(e) => handleStudentSearchChange(e.target.value)} style={{ background: darkTheme.inputBackground, borderColor: darkTheme.border, color: darkTheme.textPrimary }} /> {/* Changed id */}
                </div>
                <div>
                  <label htmlFor="studentLimitSelect">Límite por página:</label> {/* Changed htmlFor */}
                  <select id="studentLimitSelect" value={studentLimit} onChange={(e) => handleStudentLimitChange(parseInt(e.target.value))} style={{ background: darkTheme.inputBackground, borderColor: darkTheme.border, color: darkTheme.textPrimary }}> {/* Changed id */}
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="studentPageInput">Página:</label> {/* Changed htmlFor */}
                  <input type="number" id="studentPageInput" value={studentPage} onChange={(e) => handleStudentPageChange(parseInt(e.target.value))} min="1" style={{ background: darkTheme.inputBackground, borderColor: darkTheme.border, color: darkTheme.textPrimary, width: '50px' }} /> {/* Changed id */}
                </div>
              </div>
              <StudentList
                students={students}
                onAddStudent={fetchStudents}
                onEditStudent={handleEditStudent}
                onDeleteStudent={openDeleteModal}
              />
            </>
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
