import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// 1. IMPORTAMOS EL HOOK
import { useNotification } from '../context/NotificationContext';

function Login({ onLogin }) {
  // 2. USAMOS EL HOOK
  const { mostrarNotificacion } = useNotification();
  
  const [esRegistro, setEsRegistro] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const url = esRegistro 
      ? 'http://localhost:8080/api/auth/registro' 
      : 'http://localhost:8080/api/auth/login';

    const payload = { username, password };
    if(esRegistro) payload.rol = 'USER';

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(async res => {
      if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Error en la operación");
      }
      return res.json();
    })
    .then(data => {
      if (esRegistro) {
        // --- 3. REEMPLAZO ALERT POR NOTIFICACIÓN ---
        mostrarNotificacion("✅ ¡Cuenta creada con éxito! Ahora inicia sesión.");
        
        setEsRegistro(false); // Volvemos al modo login
        setPassword('');      // Limpiamos pass
      } else {
        // --- LOGIN EXITOSO ---
        onLogin(data);
        mostrarNotificacion(`👋 ¡Bienvenido, ${data.username}!`); // Agregué un saludo lindo acá también
        
        if (data.rol === 'ADMIN') {
          navigate('/gestion');
        } else {
          navigate('/productos');
        }
      }
    })
    .catch(err => {
      console.error(err);
      setError(esRegistro ? "Error: El usuario quizás ya existe." : "Usuario o contraseña incorrectos.");
      // Opcional: Si querés que el error también flote, descomentá esto:
      // mostrarNotificacion("❌ " + (esRegistro ? "Error al registrar" : "Error al ingresar"));
    });
  };

  const handleOlvidePassword = (e) => {
      e.preventDefault();
      // Reemplazamos el alert también aquí
      mostrarNotificacion("🔒 Contacta a soporte@utnstore.com para recuperar tu clave.");
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

      <div style={{ marginTop: '20px', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          
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