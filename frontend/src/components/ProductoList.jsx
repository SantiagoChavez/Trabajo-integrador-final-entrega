import React, { useEffect, useState } from "react";
import "./ProductoList.css";

function ProductoList() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/productos")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        console.log("Productos recibidos:", data);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
      });
  }, []);

  const handleEliminar = (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;

    fetch(`http://localhost:8080/api/productos/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al eliminar producto");
        setProductos(productos.filter((p) => p.id !== id));
      })
      .catch((error) => {
        console.error("Error al eliminar producto:", error);
        alert("Ocurrió un error al eliminar el producto");
      });
  };

  return (
    <div>
      <h2>Lista de Productos</h2>
      {productos.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <table className="tabla-productos">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Stock</th>
              <th style={{ minWidth: "130px" }}>Acciones</th>
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
                <td>
                  <button
                    className="btn-eliminar"
                    onClick={() => handleEliminar(producto.id)}
                  >
                    ❌ Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductoList;
