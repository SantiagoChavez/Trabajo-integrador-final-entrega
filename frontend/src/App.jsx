import React from 'react';
import Navbar from './components/Navbar';
import ProductoList from './components/ProductoList';
import AgregarProducto from './components/AgregarProducto';

function App() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Sistema de Gestión - TechLab</h1>
        <p>Seleccioná una opción del menú.</p>

        <ProductoList />
        <AgregarProducto />
      </main>
    </div>
  );
}

export default App;

