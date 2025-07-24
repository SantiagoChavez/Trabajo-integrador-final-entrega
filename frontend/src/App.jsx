import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';

function App() {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
    imagen: '',
    stock: ''
  });

  useEffect(() => {
    fetch('http://localhost:8080/api/productos')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(error => console.error('Error al obtener productos:', error));
  }, []);

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
      .then(data => {
        setProductos(prev => [...prev, data]);
        setNuevoProducto({
          nombre: '',
          descripcion: '',
          precio: '',
          categoria: '',
          imagen: '',
          stock: ''
        });
      })
      .catch(error => alert(error.message));
  };

  return (
    <div>
      <Navbar />
      <main style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Sistema de Gestión - TechLab</h1>
        <p>Seleccioná una opción del menú.</p>

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
              {productos.map(producto => (
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
      </main>
    </div>
  );
}

export default App;

