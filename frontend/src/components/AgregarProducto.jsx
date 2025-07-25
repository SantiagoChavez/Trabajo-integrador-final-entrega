import React, { useState } from 'react';

function AgregarProducto() {
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
    imagen: '',
    stock: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/api/productos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoProducto)
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al agregar producto');
        return res.json();
      })
      .then(() => {
        alert('Producto agregado con éxito');
        window.location.reload(); // refresca la lista
      })
      .catch(error => alert(error.message));
  };

  return (
    <div>
      <h2 style={{ marginTop: '40px' }}>Agregar Nuevo Producto</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '400px', margin: '0 auto' }}>
        <input type="text" name="nombre" placeholder="Nombre" value={nuevoProducto.nombre} onChange={handleChange} required />
        <input type="text" name="descripcion" placeholder="Descripción" value={nuevoProducto.descripcion} onChange={handleChange} required />
        <input type="number" name="precio" placeholder="Precio" value={nuevoProducto.precio} onChange={handleChange} required />
        <input type="text" name="categoria" placeholder="Categoría" value={nuevoProducto.categoria} onChange={handleChange} required />
        <input type="text" name="imagen" placeholder="URL de Imagen" value={nuevoProducto.imagen} onChange={handleChange} required />
        <input type="number" name="stock" placeholder="Stock" value={nuevoProducto.stock} onChange={handleChange} required />
        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  );
}

export default AgregarProducto;

