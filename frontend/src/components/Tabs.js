import React from 'react';
import { buttonStyle } from '../styles/styles';
import { darkTheme } from '../styles/theme';

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
      <button
        onClick={() => setActiveTab('courses')}
        style={{
          ...buttonStyle,
          backgroundColor: activeTab === 'courses' ? darkTheme.primary : darkTheme.secondary,
        }}
      >
        Cursos
      </button>
      <button
        onClick={() => setActiveTab('students')}
        style={{
          ...buttonStyle,
          backgroundColor: activeTab === 'students' ? darkTheme.primary : darkTheme.secondary,
        }}
      >
        Estudiantes
      </button>
    </div>
  );
};

export default Tabs;
