import React, { useState, useEffect } from "react";

function Carrito() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error al obtener productos", err));
  }, []);

  const agregarAlCarrito = (producto) => {
    if (producto.stock === 0) {
      alert(`El producto "${producto.nombre}" no tiene stock disponible.`);
      return;
    }

    const itemEnCarrito = carrito.find((p) => p.id === producto.id);
    const cantidadActual = itemEnCarrito ? itemEnCarrito.cantidad : 0;

    if (cantidadActual + 1 > producto.stock) {
      alert(`Stock insuficiente para "${producto.nombre}". Stock disponible: ${producto.stock}`);
      return;
    }

    if (itemEnCarrito) {
      setCarrito(
        carrito.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const crearPedido = () => {
    const pedido = {
      estado: "nuevo",
      lineas: carrito.map((item) => ({
        producto: { id: item.id },
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
        alert("Pedido creado con éxito");
        setCarrito([]);
      })
      .catch((err) => {
        console.error("Error al crear pedido", err);
        alert("Error al crear el pedido");
      });
  };

  return (
    <div>
      <h2>Productos disponibles</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {productos.map((p) => (
          <li key={p.id}>
            {p.nombre} - ${p.precio}{" "}
            <button onClick={() => agregarAlCarrito(p)}>Agregar</button>
          </li>
        ))}
      </ul>

      <h2>Carrito</h2>
      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div>
          <ul>
            {carrito.map((item) => (
              <li key={item.id}>
                {item.nombre} - Cantidad: {item.cantidad}
              </li>
            ))}
          </ul>
          <button onClick={crearPedido}>Confirmar Pedido</button>
        </div>
      )}
    </div>
  );
}

export default Carrito;
