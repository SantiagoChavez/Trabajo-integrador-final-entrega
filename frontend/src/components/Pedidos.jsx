import React, { useEffect, useState } from "react";
import "./Pedidos.css";

function Pedidos({ usuario }) {
  const [pedidos, setPedidos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/pedidos")
      .then((res) => res.json())
      .then((data) => {
        setPedidos(data);
      })
      .catch((err) => {
        console.error("Error al obtener pedidos:", err);
      });
  }, []);

  // LÓGICA DE FILTRADO
  const pedidosFiltrados = pedidos.filter((pedido) => {
    // 1. FILTRO DE SEGURIDAD (Rol)
    // Si NO es admin, solo puede ver SUS propios pedidos
    if (usuario?.rol !== 'ADMIN') {
        if (pedido.usuarioId !== usuario?.username) return false;
    }

    // 2. FILTRO DE BÚSQUEDA (Input)
    if (busqueda) {
       const termino = busqueda.toLowerCase();
       const idMatch = pedido.id.toLowerCase().includes(termino);
       const usuarioMatch = pedido.usuarioId ? pedido.usuarioId.toLowerCase().includes(termino) : false;
       
       // El admin puede buscar por Usuario también
       if (usuario?.rol === 'ADMIN') {
           return idMatch || usuarioMatch;
       } else {
           return idMatch; // El usuario normal solo busca por ID de pedido
       }
    }

    return true;
  });

  return (
    <div className="pedidos-container">
      <h2>
          {usuario?.rol === 'ADMIN' ? "Gestión Global de Pedidos" : "Mis Pedidos"}
      </h2>

      {/* --- BUSCADOR --- */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
          <input 
            type="text"
            placeholder={usuario?.rol === 'ADMIN' ? "🔍 Buscar por ID o Cliente..." : "🔍 Buscar orden por ID..."}
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{
                padding: '10px',
                width: '100%',
                maxWidth: '400px',
                borderRadius: '8px',
                border: '1px solid #444',
                background: '#2b2b36',
                color: 'white',
                fontSize: '1rem',
                outline: 'none'
            }}
          />
      </div>

      {pedidosFiltrados.length === 0 ? (
        <p style={{textAlign: 'center', color: '#ccc', marginTop: '40px'}}>
            {busqueda ? "No se encontraron pedidos con ese criterio." : "No tienes pedidos registrados."}
        </p>
      ) : (
        pedidosFiltrados.map((pedido) => (
          <div key={pedido.id} className="pedido-card">
            {/* CABECERA DE LA TARJETA */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                borderBottom: '1px solid #444', 
                paddingBottom: '10px', 
                marginBottom: '10px'
            }}>
                <div>
                    <h4 style={{ margin: 0, color: '#82b1ff' }}>Pedido #{pedido.id.substring(0, 8)}...</h4>
                    <span style={{ fontSize: '0.85rem', color: '#aaa' }}>
                        {new Date(pedido.fecha).toLocaleString()}
                    </span>
                </div>
                
                {/* SI ES ADMIN, MOSTRAMOS EL CLIENTE GRANDE */}
                {usuario?.rol === 'ADMIN' && (
                    <div style={{ textAlign: 'right' }}>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: '#aaa' }}>CLIENTE</span>
                        <span style={{ color: '#fff', fontWeight: 'bold' }}>{pedido.usuarioId || "Anónimo"}</span>
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <p style={{ margin: 0 }}>
                    <strong>Estado:</strong> 
                    <span style={{ 
                        marginLeft: '8px', 
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: pedido.estado === 'FACTURADO' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(0, 210, 255, 0.2)',
                        color: pedido.estado === 'FACTURADO' ? '#4caf50' : '#00d2ff',
                        fontWeight: 'bold',
                        fontSize: '0.9rem'
                    }}>
                        {pedido.estado}
                    </span>
                </p>
                <p style={{ margin: 0, fontSize: '1.2rem', color: '#00d2ff', fontWeight: 'bold' }}>
                    ${pedido.total.toFixed(2)}
                </p>
            </div>

            <table className="tabla-pedidos">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cant</th>
                  <th>Precio</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {pedido.lineas.map((linea, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: 'left' }}>{linea.productoNombre}</td>
                    <td>{linea.cantidad}</td>
                    <td>${linea.productoPrecio?.toFixed(2)}</td>
                    <td>${(linea.productoPrecio * linea.cantidad).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
}

export default Pedidos;