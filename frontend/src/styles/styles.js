export const buttonStyle = {
  padding: '0.5rem 1rem',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  color: 'white',
};

export const inputStyle = {
  padding: '0.5rem',
  margin: '0.5rem 0',
  border: '1px solid #ccc',
  borderRadius: '4px',
  width: '100%',
  boxSizing: 'border-box',
  background: '#333',
  borderColor: '#222',
  color: 'white',
};

export const labelStyle = {
  display: 'block',
  marginBottom: '0.5rem',
};

export const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
};

export const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '1rem',
};

export const modalOverlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

export const modalContent = {
  padding: '2rem',
  borderRadius: '8px',
  width: '90%',
  maxWidth: '600px',
  maxHeight: '80vh',
  overflowY: 'auto',
};
