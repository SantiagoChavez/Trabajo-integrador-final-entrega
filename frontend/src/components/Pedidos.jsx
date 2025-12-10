import React, { useEffect, useState } from "react";
import "./Pedidos.css"; // <-- Importamos los estilos nuevos

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/pedidos")
      .then((res) => res.json())
      .then((data) => {
        setPedidos(data);
      })
      .catch((err) => {
        console.error("Error al obtener pedidos:", err);
        alert("Error al obtener pedidos");
      });
  }, []);

  return (
    <div className="pedidos-container">
      <h2>Historial de Pedidos</h2>
      {pedidos.length === 0 ? (
        <p style={{textAlign: 'center', color: '#ccc'}}>No hay pedidos aún.</p>
      ) : (
        pedidos.map((pedido) => (
          <div key={pedido.id} className="pedido-card">
            <h4>Pedido #{pedido.id}</h4>
            <p><strong>Fecha:</strong> {new Date(pedido.fecha).toLocaleString()}</p>
            <p>
                <strong>Estado:</strong> 
                <span style={{ 
                    marginLeft: '8px', 
                    color: pedido.estado === 'FACTURADO' ? '#4caf50' : '#00d2ff',
                    fontWeight: 'bold' 
                }}>
                    {pedido.estado}
                </span>
            </p>
            <p><strong>Total:</strong> ${pedido.total.toFixed(2)}</p>

            <table className="tabla-pedidos">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio Unit.</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {pedido.lineas.map((linea, index) => (
                  <tr key={index}>
                    <td>{linea.productoNombre}</td>
                    <td>{linea.cantidad}</td>
                    <td>${linea.productoPrecio?.toFixed(2)}</td>
                    <td>${(linea.productoPrecio * linea.cantidad).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
}

export default Pedidos;