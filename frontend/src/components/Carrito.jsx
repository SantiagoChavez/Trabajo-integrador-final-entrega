import React from "react";
import "./Carrito.css";
import { useNavigate } from "react-router-dom"; 

// 1. AHORA RECIBIMOS LOS DATOS DESDE APP.JSX (PROPS)
function Carrito({ carrito, restarDelCarrito, vaciarCarrito }) {
  
  const navigate = useNavigate();

  // Calcular el precio total
  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  const crearPedido = () => {
    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    const pedido = {
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
        alert("✅ ¡Pedido creado con éxito!");
        // Usamos la función que nos prestó App.jsx para limpiar
        vaciarCarrito(); 
        // Opcional: redirigir al inicio o a historial
        navigate("/pedidos");
      })
      .catch((err) => {
        console.error("Error al crear pedido", err);
        alert("❌ Error al crear el pedido");
      });
  };

  return (
    <div className="carrito-container">
      <h2>🛒 Tu Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <div className="carrito-vacio">
            <p>No hay productos en el carrito.</p>
            <button onClick={() => navigate("/productos")}>Ir al Catálogo</button>
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
                    {/* Usamos la función que viene de App.jsx */}
                    <button 
                        className="btn-eliminar" 
                        onClick={() => restarDelCarrito(item.id)}
                    >
                        ➖
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