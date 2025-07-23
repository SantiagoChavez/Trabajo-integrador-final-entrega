import React from 'react';
import {
  FaHome,
  FaBoxOpen,
  FaTags,
  FaShoppingCart,
  FaListAlt
} from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><a href="#"><FaHome /> Inicio</a></li>
        <li><a href="#"><FaBoxOpen /> Productos</a></li>
        <li><a href="#"><FaTags /> Categorías</a></li>
        <li><a href="#"><FaShoppingCart /> Carrito</a></li>
        <li><a href="#"><FaListAlt /> Pedidos</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
