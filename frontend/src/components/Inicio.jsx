import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Inicio.css'; 

function Inicio({ usuario }) {
  const navigate = useNavigate();

  return (
    <div className="inicio-container">
      
      {/* Ya no necesitamos la alerta flotante compleja, porque el botón llevará al login directamente */}

      <div className="hero-section">
        <div className="logo-container">
           <img src="/logo.jpg" alt="Logo Tienda Gamer" />
        </div>
        <h1 className="titulo-principal">Tienda de Insumos Informáticos</h1>
        <p className="subtitulo">
            {usuario 
              ? "Bienvenido de nuevo. Tu setup te espera." 
              : "Inicia sesión para acceder a nuestro catálogo exclusivo."}
        </p>
        
        <div className="botones-accion">
          {usuario ? (
            // --- VERSIÓN LOGUEADO ---
            <>
                <button className="btn-catalogo" onClick={() => navigate('/productos')}>
                    📦 Ir al Catálogo
                </button>
                <button className="btn-carrito" onClick={() => navigate('/carrito')}>
                    🛒 Mi Carrito
                </button>
            </>
          ) : (
            // --- VERSIÓN INVITADO (GUEST) ---
            <button 
                className="btn-catalogo" 
                onClick={() => navigate('/login')}
                style={{ padding: '15px 40px', fontSize: '1.2rem' }} // Un poco más grande para llamar la atención
            >
                🔑 Iniciar Sesión para Comprar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Inicio;