import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductoList from './components/ProductoList';
import AgregarProducto from './components/AgregarProducto';
import Carrito from './components/Carrito';
import Pedidos from './components/Pedidos';
import Inicio from './components/Inicio';

function App() {
  return (
    <Router className="App">
      <Navbar />
      <main style={{ padding: '20px', textAlign: 'center' }}>
        <Routes>
          <Route path="/" element={<Inicio />} />

          <Route
            path="/productos"
            element={
              <>
                <h2>Lista de Productos</h2>
                <ProductoList />
                <AgregarProducto />
              </>
            }
          />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route
            path="/categorias"
            element={<p>Sitio en construccion.</p>}
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
