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
import AdminPedidos from './components/AdminPedidos'; // <--- IMPORTANTE

const RutaPrivadaAdmin = ({ usuario, children }) => {
  if (!usuario) return <Navigate to="/login" />;
  if (usuario.rol !== 'ADMIN') return <Navigate to="/" />;
  return children;
};

function App() {
  const [carrito, setCarrito] = useState([]);
  const [usuario, setUsuario] = useState(null);

  const handleLogin = (userData) => setUsuario(userData);
  const handleLogout = () => { setUsuario(null); setCarrito([]); };

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
    alert(`✅ ${producto.nombre} agregado!`);
  };

  const restarDelCarrito = (id) => {
    const item = carrito.find((p) => p.id === id);
    if (!item) return;
    if (item.cantidad === 1) setCarrito(carrito.filter((p) => p.id !== id));
    else setCarrito(carrito.map((p) => p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p));
  };

  const vaciarCarrito = () => setCarrito([]);

  return (
    <Router>
      <Navbar usuario={usuario} onLogout={handleLogout} carrito={carrito} />
      <main>
        <Routes>
          <Route path="/" element={<Inicio usuario={usuario} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          
          <Route path="/productos" element={
             <div style={{ padding: '20px', textAlign: 'center' }}>
               <ProductoList agregarAlCarrito={agregarAlCarrito} esAdmin={false} />
             </div>
          } />

          <Route path="/carrito" element={
             <div style={{ padding: '20px', textAlign: 'center' }}>
               <Carrito carrito={carrito} restarDelCarrito={restarDelCarrito} vaciarCarrito={vaciarCarrito} />
             </div>
          } />

          <Route path="/pedidos" element={<div style={{ padding: '20px' }}><Pedidos /></div>} />
          <Route path="/categorias" element={<Categorias />} />

          {/* --- ZONA ADMIN --- */}
          <Route path="/gestion" element={
            <RutaPrivadaAdmin usuario={usuario}>
              <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#fffbf2', minHeight: '100vh' }}>
                <h1 style={{ color: '#d35400' }}>⚙️ Panel de Operaciones</h1>
                
                {/* 1. ALTA */}
                <div style={{ border: '2px dashed #d35400', padding: '20px', margin: '20px auto', maxWidth: '800px', background: 'white', borderRadius: '8px' }}>
                   <h3>➕ Dar de Alta Nuevo Producto</h3>
                   <AgregarProducto />
                </div>
                
                {/* 2. LISTADO Y STOCK */}
                <h3>📝 Modificar / Eliminar Stock</h3>
                <ProductoList esAdmin={true} />

                {/* 3. NUEVO: FACTURACIÓN Y ENVÍOS */}
                <hr style={{margin: '40px 0'}} />
                <AdminPedidos />  {/* <--- AQUÍ ESTÁ LA MAGIA */}
                
              </div>
            </RutaPrivadaAdmin>
          } />

        </Routes>
      </main>
    </Router>
  );
}

export default App;