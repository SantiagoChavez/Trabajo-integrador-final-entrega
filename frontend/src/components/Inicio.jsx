import React from 'react';
import { Link } from 'react-router-dom';
import './Inicio.css';
// Asegúrate de que esta ruta apunte a tu archivo renombrado "logo.jpg" en assets
import logoImg from '../assets/logo.jpg'; 

const Inicio = () => {
  return (
    <div className="inicio-contenedor">
      <div className="inicio-contenido">
        
        {/* Imagen del Logo */}
        <img src={logoImg} alt="Logo UTN" className="logo-principal" />
        
        {/* Texto corregido */}
        <h1 className="titulo-overlay">Tienda de Insumos Informáticos</h1>
        <p className="subtitulo">Todo lo que necesitas para tu computadora en un solo lugar</p>
        
        <div className="botones-accion">
          <Link to="/productos" className="btn btn-primario">
            📦 Ver Catálogo
          </Link>
          <Link to="/carrito" className="btn btn-secundario">
            🛒 Ir al Carrito
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Inicio;