import React from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';

const Cancel = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f8f8f8',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <CloseCircleOutlined style={{ fontSize: '80px', color: 'red', marginBottom: '20px' }} />
      <h1 style={{ color: 'red', fontSize: '32px', marginBottom: '10px' }}>Fizetés nem sikerült</h1>
      <p style={{ fontSize: '18px', color: '#555', marginBottom: '30px' }}>
        Kérjük, próbálja meg újra, vagy lépjen kapcsolatba az ügyfélszolgálattal.
      </p>
      <button
        onClick={() => window.location.href = '/home'}
        style={{
          padding: '12px 24px',
          backgroundColor: '#464747',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          transition: 'background-color 0.3s',
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#333'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#464747'}
      >
        Vissza a Szobákhoz
      </button>
    </div>
  );
};

export default Cancel;