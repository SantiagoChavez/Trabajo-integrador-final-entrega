import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// 1. IMPORTAMOS EL PROVEEDOR DE NOTIFICACIONES
import { NotificationProvider } from './context/NotificationContext';

import Navbar from './components/Navbar';
import ProductoList from './components/ProductoList';
import AgregarProducto from './components/AgregarProducto';
import Carrito from './components/Carrito';
import Pedidos from './components/Pedidos';
import Inicio from './components/Inicio';
import Categorias from './components/Categorias';
import Login from './components/Login';
import AdminPedidos from './components/AdminPedidos'; 
import './components/Admin.css'; 

const RutaPrivadaAdmin = ({ usuario, children }) => {
  if (!usuario) return <Navigate to="/login" />;
  if (usuario.rol !== 'ADMIN') return <Navigate to="/" />;
  return children;
};

function App() {
  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState(""); 

  // 2. CORRECCIÓN DE PERSISTENCIA: Leemos de localStorage al iniciar
  const [usuario, setUsuario] = useState(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  });

  // Guardamos en localStorage al loguear
  const handleLogin = (userData) => {
    setUsuario(userData);
    localStorage.setItem("usuario", JSON.stringify(userData));
  };

  // Borramos de localStorage al salir
  const handleLogout = () => { 
    setUsuario(null); 
    setCarrito([]); 
    localStorage.removeItem("usuario");
  };

  const agregarAlCarrito = (producto) => {
    if (producto.stock === 0) { alert("Sin stock"); return; }
    
    const itemEnCarrito = carrito.find((p) => p.id === producto.id);
    if (itemEnCarrito && itemEnCarrito.cantidad + 1 > producto.stock) {
      alert("Stock insuficiente"); return;
    }

    if (itemEnCarrito) {
      setCarrito(carrito.map(p => p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
    
    // 3. QUITAMOS EL ALERT DE AQUÍ
    // Ya no hacemos alert("✅ Agregado") para que no salga la ventana gris.
    // El mensaje bonito lo mostrará ProductoList.jsx usando el contexto.
  };

  const restarDelCarrito = (id) => {
    const item = carrito.find((p) => p.id === id);
    if (!item) return;
    if (item.cantidad === 1) setCarrito(carrito.filter((p) => p.id !== id));
    else setCarrito(carrito.map((p) => p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p));
  };

  const vaciarCarrito = () => setCarrito([]);

  return (
    // 4. ENVOLVEMOS TODO CON EL PROVEEDOR DE NOTIFICACIONES
    <NotificationProvider>
      <Router>
        <Navbar 
          usuario={usuario} 
          onLogout={handleLogout} 
          carrito={carrito} 
          busqueda={busqueda} 
          setBusqueda={setBusqueda} 
        />
        
        <main>
          <Routes>
            <Route path="/" element={<Inicio usuario={usuario} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            
            <Route path="/productos" element={
               <div style={{ padding: '20px', textAlign: 'center' }}>
                 <ProductoList agregarAlCarrito={agregarAlCarrito} esAdmin={false} busqueda={busqueda} />
               </div>
            } />

            <Route path="/carrito" element={
               <div style={{ padding: '20px', textAlign: 'center' }}>
                 <Carrito 
                    carrito={carrito} 
                    restarDelCarrito={restarDelCarrito} 
                    vaciarCarrito={vaciarCarrito} 
                    usuario={usuario} 
                 />
               </div>
            } />

            <Route path="/pedidos" element={<div style={{ padding: '20px' }}><Pedidos /></div>} />
            <Route path="/categorias" element={<Categorias />} />

            {/* --- ZONA ADMIN --- */}
            <Route path="/gestion" element={
              <RutaPrivadaAdmin usuario={usuario}>
                <div className="admin-container">
                  
                  <h1 className="admin-title">⚙️ Panel de Operaciones</h1>
                  
                  {/* 1. Tarjeta de Alta */}
                  <div className="admin-card">
                     <h3 className="section-title">➕ Dar de Alta Nuevo Producto</h3>
                     <AgregarProducto />
                  </div>
                  
                  {/* 2. Tarjeta de Listado */}
                  <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                      <h3 className="section-title" style={{textAlign:'center', display:'block'}}>📝 Gestión de Stock</h3>
                      <ProductoList esAdmin={true} busqueda={busqueda} />
                  </div>

                  <hr style={{ margin: '60px auto', width: '80%', borderColor: '#333' }} />
                  
                  {/* 3. Pedidos y Facturación */}
                  <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <AdminPedidos />
                  </div>
                  
                </div>
              </RutaPrivadaAdmin>
            } />

          </Routes>
        </main>
      </Router>
    </NotificationProvider>
  );
}

export default App;