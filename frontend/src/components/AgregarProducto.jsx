import React, { useState } from "react";

function AgregarProducto() {
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
    imagen: "",
    stock: ""
  });

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/productos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producto),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al guardar producto");
        return res.json();
      })
      .then((data) => {
        alert("Producto agregado exitosamente");
        // Opcional: limpiar el formulario
        setProducto({
          nombre: "",
          descripcion: "",
          precio: "",
          categoria: "",
          imagen: "",
          stock: ""
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Ocurrió un error al agregar el producto");
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "auto", textAlign: "left" }}>
      <h2>Agregar Producto</h2>
      <label>Nombre: <input type="text" name="nombre" value={producto.nombre} onChange={handleChange} required /></label><br />
      <label>Descripción: <input type="text" name="descripcion" value={producto.descripcion} onChange={handleChange} required /></label><br />
      <label>Precio: <input type="number" name="precio" value={producto.precio} onChange={handleChange} required /></label><br />
      <label>Categoría: <input type="text" name="categoria" value={producto.categoria} onChange={handleChange} required /></label><br />
      <label>URL Imagen: <input type="text" name="imagen" value={producto.imagen} onChange={handleChange} /></label><br />
      <label>Stock: <input type="number" name="stock" value={producto.stock} onChange={handleChange} required /></label><br /><br />
      <button type="submit">Guardar Producto</button>
    </form>
  );
}

export default AgregarProducto;
