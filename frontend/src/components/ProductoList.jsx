import React, { useEffect, useState } from "react";
import "./ProductoList.css";

function ProductoList() {
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  const [datosEditados, setDatosEditados] = useState({});

  useEffect(() => {
    fetch("http://localhost:8080/api/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data))
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

  const handleEditar = (producto) => {
    setProductoEditando(producto.id);
    setDatosEditados({ ...producto });
  };

  const handleCancelar = () => {
    setProductoEditando(null);
    setDatosEditados({});
  };

  const handleGuardar = () => {
    fetch(`http://localhost:8080/api/productos/${productoEditando}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datosEditados),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al actualizar producto");
        return res.json();
      })
      .then((productoActualizado) => {
        const actualizados = productos.map((p) =>
          p.id === productoActualizado.id ? productoActualizado : p
        );
        setProductos(actualizados);
        setProductoEditando(null);
        setDatosEditados({});
      })
      .catch((error) => {
        console.error("Error al actualizar producto:", error);
        alert("Error al guardar los cambios");
      });
  };

  const handleCambioCampo = (e) => {
    const { name, value } = e.target;
    setDatosEditados({ ...datosEditados, [name]: value });
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
              <th style={{ minWidth: "160px" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>
                  {productoEditando === producto.id ? (
                    <input
                      name="nombre"
                      value={datosEditados.nombre}
                      onChange={handleCambioCampo}
                    />
                  ) : (
                    producto.nombre
                  )}
                </td>
                <td>
                  {productoEditando === producto.id ? (
                    <input
                      name="descripcion"
                      value={datosEditados.descripcion}
                      onChange={handleCambioCampo}
                    />
                  ) : (
                    producto.descripcion
                  )}
                </td>
                <td>
                  {productoEditando === producto.id ? (
                    <input
                      name="precio"
                      type="number"
                      value={datosEditados.precio}
                      onChange={handleCambioCampo}
                    />
                  ) : (
                    `$${producto.precio}`
                  )}
                </td>
                <td>
                  {productoEditando === producto.id ? (
                    <input
                      name="categoria"
                      value={datosEditados.categoria}
                      onChange={handleCambioCampo}
                    />
                  ) : (
                    producto.categoria
                  )}
                </td>
                <td>
                  {productoEditando === producto.id ? (
                    <input
                      name="stock"
                      type="number"
                      value={datosEditados.stock}
                      onChange={handleCambioCampo}
                    />
                  ) : (
                    producto.stock
                  )}
                </td>
                <td>
                  {productoEditando === producto.id ? (
                    <>
                      <button onClick={handleGuardar}>💾 Guardar</button>
                      <button onClick={handleCancelar}>✖ Cancelar</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditar(producto)}>
                        ✏ Editar
                      </button>
                      <button
                        className="btn-eliminar"
                        onClick={() => handleEliminar(producto.id)}
                      >
                        ❌ Eliminar
                      </button>
                    </>
                  )}
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