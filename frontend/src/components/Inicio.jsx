import React, { useState } from 'react'; // 1. Importamos useState
import { useNavigate } from 'react-router-dom';
import './Inicio.css'; 

function Inicio({ usuario }) {
  const navigate = useNavigate();
  
  // 2. Nuevo estado para controlar si se muestra la alerta personalizada
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  const navegarA = (ruta) => {
    if (usuario) {
      navigate(ruta);
    } else {
      // 3. En vez del 'alert()' feo, activamos nuestra alerta personalizada
      setMostrarAlerta(true);
      // No redirigimos inmediatamente, esperamos a que el usuario lea y clickee.
    }
  };

  // 4. Función para cerrar la alerta e ir al login
  const irAlLogin = () => {
    setMostrarAlerta(false);
    navigate('/login');
  };

  return (
    <div className="inicio-container">
      
      {/* 5. AQUÍ ESTÁ LA MAGIA: El cartel flotante personalizado */}
      {/* Solo se muestra si 'mostrarAlerta' es true */}
      {mostrarAlerta && (
        <div className="alerta-backdrop">
          <div className="alerta-neon-flotante">
             <h3 style={{ color: '#00d2ff', marginBottom: '10px' }}>🔒 Acceso Restringido</h3>
             <p>Por favor, inicia sesión para acceder al catálogo y realizar compras.</p>
             <button className="btn-alerta" onClick={irAlLogin}>
               Entendido, ir a Loguearme
             </button>
          </div>
        </div>
      )}

      <div className="hero-section">
        <div className="logo-container">
           <img src="/logo.jpg" alt="Logo Tienda Gamer" />
        </div>
        <h1 className="titulo-principal">Tienda de Insumos Informáticos</h1>
        <p className="subtitulo">Todo lo que necesitas para tu computadora en un solo lugar</p>
        <div className="botones-accion">
          <button className="btn-catalogo" onClick={() => navegarA('/productos')}>
            📦 Ver Catálogo
          </button>
          <button className="btn-carrito" onClick={() => navegarA('/carrito')}>
            🛒 Ir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default Inicio;