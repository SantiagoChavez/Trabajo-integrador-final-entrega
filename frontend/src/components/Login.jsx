import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  // Estado para saber si el usuario quiere LOGIN o REGISTRO
  const [esRegistro, setEsRegistro] = useState(false);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // 1. DETERMINAR URL SEGÚN EL MODO
    const url = esRegistro 
      ? 'http://localhost:8080/api/auth/registro' 
      : 'http://localhost:8080/api/auth/login';

    // 2. PREPARAR DATOS
    const payload = { username, password };
    // Si es registro, aseguramos que el rol sea USER por defecto
    if(esRegistro) payload.rol = 'USER';

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(async res => {
      // Si el backend responde con error (ej: 400 o 500), lanzamos excepción
      if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Error en la operación");
      }
      return res.json();
    })
    .then(data => {
      if (esRegistro) {
        // --- CASO REGISTRO EXITOSO ---
        alert("✅ ¡Cuenta creada con éxito! Ahora inicia sesión.");
        setEsRegistro(false); // Volvemos al modo login
        setPassword('');      // Limpiamos pass
      } else {
        // --- CASO LOGIN EXITOSO ---
        onLogin(data); // Actualizamos el estado global en App.jsx
        
        // Redirección según rol
        if (data.rol === 'ADMIN') {
          navigate('/gestion');
        } else {
          navigate('/productos');
        }
      }
    })
    .catch(err => {
      console.error(err);
      // Mostramos el mensaje limpio al usuario
      setError(esRegistro ? "Error: El usuario quizás ya existe." : "Usuario o contraseña incorrectos.");
    });
  };

  const handleOlvidePassword = (e) => {
      e.preventDefault();
      // Como no tenemos servidor de correo real, mostramos un aviso simulado
      alert("🔒 Para recuperar tu contraseña, por favor contacta a soporte@utnstore.com o pide al administrador que restablezca tu cuenta.");
  };

  return (
    <div style={{ 
        maxWidth: '400px', 
        margin: '60px auto', 
        padding: '30px', 
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        backgroundColor: 'white',
        textAlign: 'center'
    }}>
      
      <h2 style={{ color: '#333', marginBottom: '20px' }}>
          {esRegistro ? "Crear Cuenta" : "Bienvenido"}
      </h2>

      {error && (
        <div style={{ 
            backgroundColor: '#ffdddd', 
            color: '#d8000c', 
            padding: '10px', 
            borderRadius: '5px',
            marginBottom: '15px',
            fontSize: '0.9rem'
        }}>
            {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="text" 
          placeholder="Nombre de Usuario" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
          style={{ 
              padding: '12px', 
              borderRadius: '5px', 
              border: '1px solid #ccc',
              fontSize: '1rem' 
          }}
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          style={{ 
              padding: '12px', 
              borderRadius: '5px', 
              border: '1px solid #ccc',
              fontSize: '1rem' 
          }}
        />
        
        <button 
            type="submit" 
            style={{ 
                padding: '12px', 
                backgroundColor: esRegistro ? '#28a745' : '#007bff', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1rem',
                transition: 'background 0.3s'
            }}
        >
          {esRegistro ? "Registrarme" : "Ingresar"}
        </button>
      </form>

      {/* --- ENLACES DE AYUDA --- */}
      <div style={{ marginTop: '20px', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          
          {/* Toggle entre Login y Registro */}
          <div>
            {esRegistro ? "¿Ya tienes cuenta? " : "¿No tienes cuenta? "}
            <button 
                onClick={() => { setEsRegistro(!esRegistro); setError(''); }}
                style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: '#007bff', 
                    cursor: 'pointer', 
                    textDecoration: 'underline',
                    fontWeight: 'bold',
                    fontSize: 'inherit'
                }}
            >
                {esRegistro ? "Inicia Sesión" : "Regístrate aquí"}
            </button>
          </div>

          {/* Olvidé contraseña (solo visible en Login) */}
          {!esRegistro && (
              <a href="#" onClick={handleOlvidePassword} style={{ color: '#666', textDecoration: 'none', fontSize: '0.85rem' }}>
                  ¿Olvidaste tu contraseña?
              </a>
          )}

      </div>
    </div>
  );
}

export default Login;