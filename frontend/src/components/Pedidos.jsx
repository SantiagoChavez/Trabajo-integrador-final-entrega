import React, { useEffect, useState } from "react";

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/pedidos")
      .then((res) => res.json())
      .then((data) => {
        console.log("Pedidos recibidos:", data);  // Para debug
        setPedidos(data);
      })
      .catch((err) => {
        console.error("Error al obtener pedidos:", err);
        alert("Error al obtener pedidos");
      });
  }, []);

  return (
    <div>
      <h2>Historial de Pedidos</h2>
      {pedidos.length === 0 ? (
        <p>No hay pedidos aún.</p>
      ) : (
        pedidos.map((pedido) => (
          <div key={pedido.id} style={{ border: "1px solid #ccc", margin: "20px", padding: "10px" }}>
            <h4>Pedido #{pedido.id}</h4>
            <p>Fecha: {new Date(pedido.fecha).toLocaleString()}</p>
            <p>Estado: {pedido.estado}</p>
            <p>Total: ${pedido.total.toFixed(2)}</p>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid black" }}>Producto</th>
                  <th style={{ border: "1px solid black" }}>Cantidad</th>
                  <th style={{ border: "1px solid black" }}>Precio Unitario</th>
                  <th style={{ border: "1px solid black" }}>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {pedido.lineas.map((linea, index) => (
                  <tr key={index}>
                    <td style={{ border: "1px solid black" }}>{linea.productoNombre}</td>
                    <td style={{ border: "1px solid black" }}>{linea.cantidad}</td>
                    <td style={{ border: "1px solid black" }}>${linea.productoPrecio?.toFixed(2)}</td>
                    <td style={{ border: "1px solid black" }}>${(linea.productoPrecio * linea.cantidad).toFixed(2)}</td>
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