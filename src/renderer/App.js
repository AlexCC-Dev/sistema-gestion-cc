import React, { useState } from 'react';

function App() {
  const [response, setResponse] = useState('');

  const testIPC = async () => {
    try {
      const result = await window.electronAPI.ping();
      setResponse(result);
    } catch (error) {
      setResponse('Error: ' + error.message);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Sistema de Gestión C&C</h1>
      
      <button 
        onClick={testIPC}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Probar comunicación IPC
      </button>
      
      {response && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
          <strong>Respuesta:</strong> {response}
        </div>
      )}
    </div>
  );
}

export default App;