import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">🏠 Inicio</Link></li>
        <li><Link to="/productos">📦 Productos</Link></li>
        <li><Link to="/categorias">📚 Categorías</Link></li>
        <li><Link to="/carrito">🛒 Carrito</Link></li>
        <li><Link to="/pedidos">🧾 Pedidos</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
