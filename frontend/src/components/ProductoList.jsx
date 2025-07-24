import React, { useEffect, useState } from "react";

function ProductoList() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/productos")
      .then((res) => res.json())
      .then((data) => {
        console.log("Productos recibidos:", data); // 👈 Esto nos dirá si llegaron
        setProductos(data);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
      });
  }, []);

  return (
    <div>
      <h2>Lista de Productos</h2>
      {productos.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ margin: "0 auto" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>{producto.descripcion}</td>
                <td>${producto.precio}</td>
                <td>{producto.categoria}</td>
                <td>{producto.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductoList;
