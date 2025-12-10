import React from "react";
import "./Carrito.css";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useNotification } from "../context/NotificationContext";

function Carrito({ carrito, restarDelCarrito, vaciarCarrito, usuario }) {
  
  const navigate = useNavigate();
  const { mostrarNotificacion } = useNotification();
  
  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  const crearPedido = () => {
    if (!usuario) {
        mostrarNotificacion("🔒 Inicia sesión para finalizar la compra");
        setTimeout(() => {
            navigate("/login");
        }, 2000);
        return;
    }

    if (carrito.length === 0) {
        mostrarNotificacion("⚠️ El carrito está vacío");
        return;
    }

    const pedido = {
      usuarioId: usuario.username, 
      estado: "nuevo",
      lineas: carrito.map((item) => ({
        productoId: item.id,
        cantidad: item.cantidad,
      })),
    };

    fetch("http://localhost:8080/api/pedidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pedido),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al crear pedido");
        return res.json();
      })
      .then(() => {
        mostrarNotificacion("✅ ¡Pedido creado con éxito!");
        vaciarCarrito(); 
        setTimeout(() => {
            navigate("/pedidos");
        }, 2000);
      })
      .catch((err) => {
        console.error("Error al crear pedido", err);
        mostrarNotificacion("❌ Error al procesar el pedido");
      });
  };

  return (
    <div className="carrito-container">
      <h2>🛒 Tu Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <div className="carrito-vacio">
            <p>No hay productos en el carrito.</p>
            <button className="btn-confirmar" style={{background: '#444', marginTop:'10px'}} onClick={() => navigate("/productos")}>
                Ir al Catálogo
            </button>
        </div>
      ) : (
        <div>
          <ul className="carrito-lista">
            {carrito.map((item) => (
              <li key={item.id} className="carrito-item">
                <div className="info-producto">
                    <span className="nombre">{item.nombre}</span>
                    <span className="precio">${item.precio}</span>
                </div>
                
                <div className="controles-cantidad">
                    <span className="cantidad">Cant: {item.cantidad}</span>
                    
                    {/* --- BOTÓN AHORA TIENE TEXTO E ÍCONO --- */}
                    <button 
                        className="btn-eliminar" 
                        onClick={() => restarDelCarrito(item.id)}
                        title="Eliminar producto"
                    >
                         <FaTrash size={14} /> 
                         <span>Eliminar</span>
                    </button>
                </div>
              </li>
            ))}
          </ul>
          
          <div className="resumen-compra">
            <h3>Total: ${total}</h3>
            <button className="btn-confirmar" onClick={crearPedido}>
                Confirmar Pedido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Carrito;