import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ usuario, onLogout, carrito }) {
  const navigate = useNavigate();

  const handleSalir = () => {
    onLogout();
    navigate('/');
  };

  const cantidadTotal = carrito ? carrito.reduce((acc, item) => acc + item.cantidad, 0) : 0;

  return (
    <nav className="navbar">
      <ul>
        {/* 1. INICIO */}
        <li><Link to="/">🏠 Inicio</Link></li>
        
        {/* 2. CATÁLOGO */}
        <li><Link to="/productos">📦 Catálogo</Link></li>
        
        {/* 3. CARRITO (Ahora va tercero) */}
        <li>
          <Link to="/carrito" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            🛒 Carrito
            {cantidadTotal > 0 && (
              <span className="cart-badge">{cantidadTotal}</span>
            )}
          </Link>
        </li>

        {/* 4. MIS PEDIDOS (Ahora va cuarto) */}
        <li><Link to="/pedidos">📄 Mis Pedidos</Link></li>
        
        {/* LÓGICA DE USUARIO / ADMIN (Va a la derecha del todo) */}
        {usuario ? (
          <>
            {usuario.rol === 'ADMIN' && (
              <li style={{ marginLeft: '20px', borderLeft:'1px solid #555', paddingLeft:'20px' }}>
                  <Link to="/gestion" style={{ color: '#ffca28' }}>⚙️ Gestión</Link>
              </li>
            )}
            
            <li style={{ marginLeft: 'auto' }}>
              <span style={{ color: 'white', marginRight: '10px' }}>Hola, {usuario.username}</span>
              <button onClick={handleSalir} style={{ background: 'transparent', border: '1px solid white', color: 'white', cursor: 'pointer', padding:'2px 8px', borderRadius:'4px' }}>
                Salir
              </button>
            </li>
          </>
        ) : (
          <li style={{ marginLeft: 'auto' }}>
            <Link to="/login" style={{ backgroundColor: '#007bff', padding: '5px 10px', borderRadius: '4px' }}>
              🔑 Iniciar Sesión
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
