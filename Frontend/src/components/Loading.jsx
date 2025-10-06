import React from 'react';

const Loading = () => {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#ffffffff'
    }}>
      <div style={{
        border: '6px solid #f3f3f3',
        borderTop: '6px solid var(--secondary)',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        animation: 'spin 0.9s linear infinite'
      }}></div>

      {/* Spinner animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  )
};

export default Loading;
