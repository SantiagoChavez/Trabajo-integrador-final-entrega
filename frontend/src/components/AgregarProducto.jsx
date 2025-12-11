import React, { useState } from 'react';
// El CSS se carga globalmente o desde Admin.css importado en App

function AgregarProducto() {
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    marca: '', // <--- 1. ESTO YA ESTABA BIEN
    descripcion: '',
    precio: '',
    categoria: '',
    imagenUrl: '',
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
      <form onSubmit={handleSubmit} className="admin-form">
        
        {/* 2. AGREGAMOS ESTO: MARCA Y NOMBRE EN LA MISMA LINEA */}
        <div style={{ display: 'flex', gap: '10px' }}>
            <input 
                type="text" 
                name="marca" 
                placeholder="Marca (ej: Logitech)" 
                value={nuevoProducto.marca} 
                onChange={handleChange} 
                required 
                style={{ flex: 1 }} // Ocupa menos espacio
            />
            <input 
                type="text" 
                name="nombre" 
                placeholder="Modelo/Nombre (ej: G203)" 
                value={nuevoProducto.nombre} 
                onChange={handleChange} 
                required 
                style={{ flex: 2 }} // Ocupa más espacio
            />
        </div>

        <input type="text" name="descripcion" placeholder="Descripción breve" value={nuevoProducto.descripcion} onChange={handleChange} required />
        
        {/* También agrupamos Precio y Stock para que quede lindo */}
        <div style={{ display: 'flex', gap: '10px' }}>
            <input type="number" name="precio" placeholder="Precio ($)" value={nuevoProducto.precio} onChange={handleChange} required style={{flex: 1}}/>
            <input type="number" name="stock" placeholder="Stock" value={nuevoProducto.stock} onChange={handleChange} required style={{flex: 1}}/>
        </div>

        <input type="text" name="categoria" placeholder="Categoría (ej: Teclados)" value={nuevoProducto.categoria} onChange={handleChange} required />
        <input type="text" name="imagenUrl" placeholder="URL de la Imagen" value={nuevoProducto.imagenUrl} onChange={handleChange} required />
        
        <button type="submit" className="btn-admin-submit">
            Guardar Producto
        </button>
      </form>
    </div>
  );
}

export default AgregarProducto;