import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ usuario, onLogout, carrito, busqueda, setBusqueda }) {
  const navigate = useNavigate();

  const handleSalir = () => {
    onLogout();
    navigate('/');
  };

  const cantidadTotal = carrito ? carrito.reduce((acc, item) => acc + item.cantidad, 0) : 0;

  return (
    <nav className="navbar">
      <ul>
        {/* Siempre visible: Inicio */}
        <li><Link to="/">🏠 Inicio</Link></li>
        
        {/* --- SOLO VISIBLE SI HAY USUARIO --- */}
        {usuario && (
          <>
            <li><Link to="/productos">📦 Catálogo</Link></li>

            {/* BARRA DE BÚSQUEDA (Solo para usuarios) */}
            <li style={{ flexGrow: 1, margin: '0 20px', maxWidth: '400px' }}>
              <input 
                type="text"
                placeholder="🔍 Buscar producto..."
                value={busqueda}
                onChange={(e) => {
                    setBusqueda(e.target.value);
                    navigate('/productos');
                }}
                style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '20px',
                    border: 'none',
                    outline: 'none'
                }}
              />
            </li>

            <li>
              <Link to="/carrito" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                🛒 <span className="cart-badge">{cantidadTotal}</span>
              </Link>
            </li>
            
            <li><Link to="/pedidos">📄 Mis Pedidos</Link></li>
          </>
        )}

        {/* --- LADO DERECHO (LOGIN / LOGOUT) --- */}
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
            <Link to="/login" style={{ backgroundColor: '#007bff', padding: '5px 10px', borderRadius: '4px', color: 'white', textDecoration: 'none' }}>
              🔑 Iniciar Sesión
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;