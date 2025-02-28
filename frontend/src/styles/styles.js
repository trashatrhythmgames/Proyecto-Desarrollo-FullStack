export const inputStyle = {
    padding: '0.8rem',
    margin: '0.5rem 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '100%',
    boxSizing: 'border-box',
  };
  
  export const buttonStyle = {
    padding: '0.8rem 1.2rem',
    borderRadius: '4px',
    cursor: 'pointer',
    border: 'none',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };
  
  export const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto 2rem',
  };
  export const gridStyle = {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1rem',
      marginBottom: '2rem'
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
      background: 'white',
      padding: '2rem',
      borderRadius: '8px',
      maxWidth: '500px',
      width: '90%',
    };