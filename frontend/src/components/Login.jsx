import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    .then(async res => {
      if (!res.ok) throw new Error(await res.text() || "Error en credenciales");
      return res.json();
    })
    .then(data => {
      // data contiene el usuario con su rol
      onLogin(data); // Guardamos el usuario en App.jsx
      
      // Redirección inteligente
      if (data.rol === 'ADMIN') {
        navigate('/gestion');
      } else {
        navigate('/productos');
      }
    })
    .catch(err => {
      setError("Usuario o contraseña incorrectos");
      console.error(err);
    });
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="text" 
          placeholder="Usuario" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
          style={{ padding: '10px' }}
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          style={{ padding: '10px' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
          Ingresar
        </button>
      </form>
      <div style={{marginTop: '20px', fontSize: '0.8rem', color: '#666'}}>
         <p>Usuarios de prueba (créalos con Postman o curl primero si está vacío):</p>
         <p>Admin: admin / 1234</p>
         <p>User: user / 1234</p>
      </div>
    </div>
  );
}

export default Login;