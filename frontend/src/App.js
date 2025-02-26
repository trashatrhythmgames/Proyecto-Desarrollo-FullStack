import React, { useState, useEffect } from 'react';
import axios from 'axios';

const darkTheme = {
  background: '#1a1a1a',
  textPrimary: '#ffffff',
  textSecondary: '#b3b3b3',
  primary: '#2d88ff',
  secondary: '#242424',
  cardBackground: '#2d2d2d',
  inputBackground: '#333333',
  border: '#404040',
  danger: '#ff4d4d',
  success: '#00cc66',
  warning: '#ffc107'
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newCourse, setNewCourse] = useState({ 
    name: '', 
    students: 0, 
    status: 'active' 
  });
  const [newStudent, setNewStudent] = useState({ 
    name: '', 
    email: '' 
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsLoggedIn(true);
      fetchData();
    }
  }, []);

  const fetchData = () => {
    fetchCourses();
    fetchStudents();
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error obteniendo cursos:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error obteniendo estudiantes:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', loginData);
      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      setIsLoggedIn(true);
      setActiveTab('courses');
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Error en el inicio de sesión');
    }
  };

  const handleCourseInput = (e) => {
    setNewCourse({
      ...newCourse,
      [e.target.name]: e.target.value
    });
  };

  const handleStudentInput = (e) => {
    setNewStudent({
      ...newStudent,
      [e.target.name]: e.target.value
    });
  };

  const handleAddCourse = async () => {
    try {
      await axios.post('/api/courses', newCourse);
      setNewCourse({ name: '', students: 0, status: 'active' });
      fetchCourses();
    } catch (error) {
      alert('Error al crear curso: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleAddStudent = async () => {
    try {
      await axios.post('/api/students', newStudent);
      setNewStudent({ name: '', email: '' });
      fetchStudents();
    } catch (error) {
      alert('Error al crear estudiante: ' + (error.response?.data?.message || error.message));
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ 
        backgroundColor: darkTheme.background,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ 
          width: '100%',
          maxWidth: '400px',
          padding: '2rem',
          backgroundColor: darkTheme.cardBackground,
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)'
        }}>
          <h2 style={{ 
            color: darkTheme.textPrimary, 
            textAlign: 'center', 
            marginBottom: '2rem',
            fontSize: '1.8rem'
          }}>
            Iniciar Sesión
          </h2>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1.5rem' }}>
              <input
                type="email"
                placeholder="Correo Electrónico"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                style={{
                  ...inputStyle,
                  backgroundColor: darkTheme.inputBackground,
                  color: darkTheme.textPrimary,
                  borderColor: darkTheme.border
                }}
                required
              />
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <input
                type="password"
                placeholder="Contraseña"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                style={{
                  ...inputStyle,
                  backgroundColor: darkTheme.inputBackground,
                  color: darkTheme.textPrimary,
                  borderColor: darkTheme.border
                }}
                required
              />
            </div>
            <button
              type="submit"
              style={{
                ...buttonStyle,
                backgroundColor: darkTheme.primary,
                width: '100%',
                ':hover': {
                  backgroundColor: '#1f6fd1'
                }
              }}
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      backgroundColor: darkTheme.background,
      minHeight: '100vh',
      padding: '2rem',
      color: darkTheme.textPrimary
    }}>
      <header style={{ 
        marginBottom: '3rem',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          color: darkTheme.textPrimary,
          marginBottom: '0.5rem'
        }}>
          Panel de Control Educativo
        </h1>
        <p style={{ 
          color: darkTheme.textSecondary,
          fontSize: '1.1rem'
        }}>
          Gestión integral de cursos y estudiantes
        </p>
      </header>

      <div style={{ 
        marginBottom: '2rem',
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        <TabButton 
          active={activeTab === 'courses'} 
          onClick={() => setActiveTab('courses')}
          label="Cursos"
          theme={darkTheme}
        />
        <TabButton 
          active={activeTab === 'students'} 
          onClick={() => setActiveTab('students')}
          label="Estudiantes"
          theme={darkTheme}
        />
        <button
          onClick={() => {
            localStorage.removeItem('token');
            setIsLoggedIn(false);
          }}
          style={{
            ...buttonStyle,
            backgroundColor: darkTheme.danger,
            marginLeft: 'auto',
            ':hover': {
              backgroundColor: '#cc0000'
            }
          }}
        >
          Cerrar Sesión
        </button>
      </div>

      {activeTab === 'courses' && (
        <SectionWrapper title="Cursos Disponibles" onAdd={handleAddCourse} theme={darkTheme}>
          <div style={{ marginBottom: '2rem' }}>
            <div style={formStyle}>
              <input
                type="text"
                name="name"
                placeholder="Nombre del curso"
                value={newCourse.name}
                onChange={handleCourseInput}
                style={{
                  ...inputStyle,
                  backgroundColor: darkTheme.inputBackground,
                  color: darkTheme.textPrimary,
                  borderColor: darkTheme.border
                }}
              />
              <input
                type="number"
                name="students"
                placeholder="Número de estudiantes"
                value={newCourse.students}
                onChange={handleCourseInput}
                style={{
                  ...inputStyle,
                  backgroundColor: darkTheme.inputBackground,
                  color: darkTheme.textPrimary,
                  borderColor: darkTheme.border
                }}
              />
              <select
                name="status"
                value={newCourse.status}
                onChange={handleCourseInput}
                style={{
                  ...inputStyle,
                  backgroundColor: darkTheme.inputBackground,
                  color: darkTheme.textPrimary,
                  borderColor: darkTheme.border,
                  cursor: 'pointer'
                }}
              >
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
              </select>
            </div>
          </div>
          <div style={gridStyle}>
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} theme={darkTheme} />
            ))}
          </div>
        </SectionWrapper>
      )}

      {activeTab === 'students' && (
        <SectionWrapper title="Estudiantes Registrados" onAdd={handleAddStudent} theme={darkTheme}>
          <div style={{ marginBottom: '2rem' }}>
            <div style={formStyle}>
              <input
                type="text"
                name="name"
                placeholder="Nombre completo"
                value={newStudent.name}
                onChange={handleStudentInput}
                style={{
                  ...inputStyle,
                  backgroundColor: darkTheme.inputBackground,
                  color: darkTheme.textPrimary,
                  borderColor: darkTheme.border
                }}
              />
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={newStudent.email}
                onChange={handleStudentInput}
                style={{
                  ...inputStyle,
                  backgroundColor: darkTheme.inputBackground,
                  color: darkTheme.textPrimary,
                  borderColor: darkTheme.border
                }}
              />
            </div>
          </div>
          <div style={gridStyle}>
            {students.map((student) => (
              <StudentCard key={student._id} student={student} theme={darkTheme} />
            ))}
          </div>
        </SectionWrapper>
      )}
    </div>
  );
};

const TabButton = ({ active, onClick, label, theme }) => (
  <button
    onClick={onClick}
    style={{
      padding: '0.8rem 1.5rem',
      backgroundColor: active ? theme.primary : theme.secondary,
      color: theme.textPrimary,
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: active ? '#1f6fd1' : '#303030'
      }
    }}
  >
    {label}
  </button>
);

const SectionWrapper = ({ title, children, onAdd, theme }) => (
  <div style={{
    backgroundColor: theme.cardBackground,
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)'
  }}>
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginBottom: '2rem'
    }}>
      <h2 style={{ 
        fontSize: '1.8rem', 
        color: theme.textPrimary 
      }}>
        {title}
      </h2>
      <button
        onClick={onAdd}
        style={{
          ...buttonStyle,
          backgroundColor: theme.success,
          ':hover': {
            backgroundColor: '#00b359'
          }
        }}
      >
        Nuevo
      </button>
    </div>
    {children}
  </div>
);

const CourseCard = ({ course, theme }) => (
  <div style={{
    backgroundColor: theme.secondary,
    padding: '1.5rem',
    borderRadius: '8px',
    transition: 'transform 0.2s ease',
    ':hover': {
      transform: 'translateY(-2px)'
    }
  }}>
    <h3 style={{ 
      marginBottom: '0.5rem', 
      color: theme.textPrimary,
      fontSize: '1.2rem'
    }}>
      {course.name}
    </h3>
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <span style={{ color: theme.textSecondary }}>
        {course.students} estudiantes
      </span>
      <span style={{
        padding: '5px 15px',
        backgroundColor: course.status === 'active' ? '#e8f5e9' : '#ffebee',
        color: course.status === 'active' ? '#2e7d32' : '#c62828',
        borderRadius: '15px',
        fontSize: '0.9rem'
      }}>
        {course.status}
      </span>
    </div>
  </div>
);

const StudentCard = ({ student, theme }) => (
  <div style={{
    backgroundColor: theme.secondary,
    padding: '1.5rem',
    borderRadius: '8px',
    transition: 'transform 0.2s ease',
    ':hover': {
      transform: 'translateY(-2px)'
    }
  }}>
    <h3 style={{ 
      marginBottom: '0.5rem', 
      color: theme.textPrimary,
      fontSize: '1.2rem'
    }}>
      {student.name}
    </h3>
    <p style={{ 
      color: theme.textSecondary, 
      marginBottom: '0.5rem' 
    }}>
      {student.email}
    </p>
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <span style={{ color: theme.textSecondary }}>
        Cursos inscritos: {student.courses}
      </span>
    </div>
  </div>
);

const inputStyle = {
  width: '100%',
  padding: '0.8rem',
  margin: '0.5rem 0',
  border: '1px solid',
  borderRadius: '6px',
  fontSize: '1rem',
  transition: 'all 0.3s ease',
  ':focus': {
    outline: 'none',
    borderColor: darkTheme.primary,
    boxShadow: `0 0 0 2px ${darkTheme.primary}40`
  }
};

const buttonStyle = {
  padding: '0.8rem 1.5rem',
  border: 'none',
  borderRadius: '6px',
  color: darkTheme.textPrimary,
  cursor: 'pointer',
  fontSize: '1rem',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem'
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '1.5rem'
};

const formStyle = {
  display: 'grid',
  gap: '1rem',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
};

export default Dashboard;