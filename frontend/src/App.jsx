import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductoList from './components/ProductoList';
import AgregarProducto from './components/AgregarProducto';
import Carrito from './components/Carrito';
import Pedidos from './components/Pedidos';
import Inicio from './components/Inicio';
import Categorias from './components/Categorias';
import Login from './components/Login';

// Componente de seguridad: Solo deja pasar si el usuario es ADMIN
const RutaPrivadaAdmin = ({ usuario, children }) => {
  if (!usuario) return <Navigate to="/login" />;
  if (usuario.rol !== 'ADMIN') return <Navigate to="/" />;
  return children;
};

function App() {
  // Estado del Carrito
  const [carrito, setCarrito] = useState([]);
  // Estado del Usuario (Login)
  const [usuario, setUsuario] = useState(null);

  // --- LÓGICA DEL LOGIN ---
  const handleLogin = (userData) => {
    setUsuario(userData);
  };

  const handleLogout = () => {
    setUsuario(null);
    setCarrito([]); 
  };

  // --- LÓGICA DEL CARRITO (Versión Diagnóstico con Rayos X) ---
  const agregarAlCarrito = (producto) => {
    console.log("1. APP RECIBIÓ PRODUCTO:", producto);

    // 1. Validar si hay stock general
    if (producto.stock === 0) {
      alert("❌ Error: El producto reporta stock 0");
      return;
    }

    // 2. Buscar si ya está en el carrito
    console.log("2. Buscando en carrito actual:", carrito);
    
    const itemEnCarrito = carrito.find((p) => {
      // Debug de IDs (a veces uno es número y otro string)
      // console.log(`Comparando: ${p.id} con ${producto.id}`);
      return p.id === producto.id;
    });

    const cantidadActual = itemEnCarrito ? itemEnCarrito.cantidad : 0;
    console.log("3. Cantidad actual en carrito:", cantidadActual);

    // 3. Validar stock máximo
    if (cantidadActual + 1 > producto.stock) {
      alert(`❌ Stock insuficiente. Tienes ${cantidadActual}, stock máx: ${producto.stock}`);
      return;
    }

    // 4. Agregar o actualizar cantidad
    console.log("4. Procediendo a actualizar estado del carrito...");
    if (itemEnCarrito) {
      const nuevoCarrito = carrito.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
      );
      setCarrito(nuevoCarrito);
      console.log("✅ Carrito actualizado (cantidad sumada)");
    } else {
      const nuevoCarrito = [...carrito, { ...producto, cantidad: 1 }];
      setCarrito(nuevoCarrito);
      console.log("✅ Carrito actualizado (nuevo item)");
    }
    
    // ALERTA VISUAL PARA CONFIRMAR QUE LLEGÓ AL FINAL
    alert(`✅ ¡${producto.nombre} agregado al carrito!`);
  };

  const restarDelCarrito = (id) => {
    const itemEnCarrito = carrito.find((p) => p.id === id);
    if (!itemEnCarrito) return;

    if (itemEnCarrito.cantidad === 1) {
      setCarrito(carrito.filter((p) => p.id !== id));
    } else {
      setCarrito(
        carrito.map((p) =>
          p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p
        )
      );
    }
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <Router className="App">
      <Navbar usuario={usuario} onLogout={handleLogout} carrito={carrito} />
      
      <main>
        <Routes>
          <Route path="/" element={<Inicio usuario={usuario} />} />
          
          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          {/* RUTA CLIENTE */}
          <Route
            path="/productos"
            element={
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <ProductoList agregarAlCarrito={agregarAlCarrito} esAdmin={false} />
              </div>
            }
          />
          
          {/* RUTA ADMIN */}
          <Route
            path="/gestion"
            element={
              <RutaPrivadaAdmin usuario={usuario}>
                <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#fffbf2' }}>
                  <h1 style={{ color: '#d35400' }}>⚙️ Panel de Operaciones</h1>
                  <div style={{
                      border: '2px dashed #d35400', 
                      padding: '20px', 
                      margin: '20px auto', 
                      maxWidth: '600px', 
                      borderRadius: '8px',
                      backgroundColor: '#fff'
                  }}>
                      <h3>➕ Dar de Alta Nuevo Producto</h3>
                      <AgregarProducto />
                  </div>
                  <hr style={{ margin: '40px 0', borderTop: '1px solid #ccc' }} />
                  <h3>📝 Modificar / Eliminar Stock Existente</h3>
                  <ProductoList esAdmin={true} />
                </div>
              </RutaPrivadaAdmin>
            }
          />
          
          <Route 
            path="/carrito" 
            element={
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <Carrito 
                  carrito={carrito} 
                  restarDelCarrito={restarDelCarrito} 
                  vaciarCarrito={vaciarCarrito} 
                />
              </div>
            } 
          />
          
          <Route path="/pedidos" element={<div style={{ padding: '20px', textAlign: 'center' }}><Pedidos /></div>} />
          <Route path="/categorias" element={<Categorias />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;