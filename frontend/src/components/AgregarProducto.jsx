import React, { useState } from 'react';
// El CSS se carga globalmente o desde Admin.css importado en App, 
// pero las clases funcionarán igual.

function AgregarProducto() {
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
    imagenUrl: '', // Corregido para coincidir con backend (antes decía imagen)
    stock: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar tipos de datos antes de enviar
    const productoAEnviar = {
        ...nuevoProducto,
        precio: parseFloat(nuevoProducto.precio),
        stock: parseInt(nuevoProducto.stock)
    };

    fetch('http://localhost:8080/api/productos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productoAEnviar)
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al agregar producto');
        return res.json();
      })
      .then(() => {
        alert('✅ Producto agregado con éxito');
        window.location.reload(); 
      })
      .catch(error => alert(error.message));
  };

  return (
    <div>
      {/* Usamos la clase admin-form definida en Admin.css */}
      <form onSubmit={handleSubmit} className="admin-form">
        <input type="text" name="nombre" placeholder="Nombre del Producto" value={nuevoProducto.nombre} onChange={handleChange} required />
        <input type="text" name="descripcion" placeholder="Descripción breve" value={nuevoProducto.descripcion} onChange={handleChange} required />
        <input type="number" name="precio" placeholder="Precio ($)" value={nuevoProducto.precio} onChange={handleChange} required />
        <input type="text" name="categoria" placeholder="Categoría (ej: Teclados)" value={nuevoProducto.categoria} onChange={handleChange} required />
        <input type="text" name="imagenUrl" placeholder="URL de la Imagen" value={nuevoProducto.imagenUrl} onChange={handleChange} required />
        <input type="number" name="stock" placeholder="Cantidad de Stock" value={nuevoProducto.stock} onChange={handleChange} required />
        
        <button type="submit" className="btn-admin-submit">
            Guardar Producto
        </button>
      </form>
    </div>
  );
}

export default AgregarProducto;