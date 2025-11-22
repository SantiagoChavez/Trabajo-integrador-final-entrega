import React, { useState, useEffect } from 'react';
import { generarFacturaPDF } from '../utils/facturaPDF'; 

function AdminPedidos() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/pedidos")
      .then((res) => res.json())
      .then((data) => setPedidos(data))
      .catch((err) => console.error(err));
  }, []);

  const handleFacturar = (pedido) => {
    try {
        generarFacturaPDF(pedido);
        console.log("Factura descargada");
    } catch (error) {
        alert("Error al crear el PDF.");
    }
  };

  const handleDespachar = (pedido) => {
    const tracking = "TRK-" + Math.floor(Math.random() * 99999);
    alert(`Enviado: ${tracking}`);
  };

  return (
    <div style={{ 
        padding: '20px', 
        color: '#e0e0e0', 
        background: '#1e1e2f', 
        borderRadius: '8px',
        border: '1px solid #2d2d44',
        marginTop: '20px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
    }}>
      
      <h3 style={{ 
          color: '#a0a0b0', 
          borderBottom: '1px solid #2d2d44', 
          paddingBottom: '10px',
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '2px'
      }}>
        ⚙️ Control de Pedidos
      </h3>
      
      {pedidos.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666' }}>Sin pedidos pendientes.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            {/* CABECERA CON COLUMNAS SEPARADAS */}
            <tr style={{ background: '#2d2d44', color: '#fff' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>ID Corto</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>Estado</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>Ítems</th>
              {/* AQUÍ ESTÁ EL CAMBIO: DOS COLUMNAS ESPECÍFICAS */}
              <th style={{ padding: '12px', textAlign: 'center', color: '#4caf50' }}>Facturación</th>
              <th style={{ padding: '12px', textAlign: 'center', color: '#ff9800' }}>Logística</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid #2d2d44' }}>
                
                <td style={{ padding: '10px', color: '#888', fontFamily: 'monospace' }}>
                    {p.id.substring(0, 8)}...
                </td>
                
                <td style={{ padding: '10px', textAlign: 'center' }}>
                    <span style={{ 
                        padding: '4px 10px', 
                        borderRadius: '4px', 
                        fontSize: '0.75rem',
                        border: '1px solid #00d2ff',
                        color: '#00d2ff',
                        background: 'rgba(0, 210, 255, 0.1)'
                    }}>
                        PENDIENTE
                    </span>
                </td>
                
                <td style={{ padding: '10px', textAlign: 'center', color: '#ccc' }}>
                    {p.lineas ? p.lineas.length : 0}
                </td>
                
                {/* COLUMNA 1: FACTURACIÓN */}
                <td style={{ padding: '10px', textAlign: 'center' }}>
                  <button 
                    onClick={() => handleFacturar(p)}
                    style={{ 
                        background: 'transparent', 
                        color: '#4caf50', 
                        border: '1px solid #4caf50', 
                        padding: '6px 12px', 
                        cursor: 'pointer', 
                        borderRadius:'4px',
                        fontSize: '0.8rem',
                        transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => { e.target.style.background = '#4caf50'; e.target.style.color = 'white'; }}
                    onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#4caf50'; }}
                  >
                    📄 Pdf
                  </button>
                </td>

                {/* COLUMNA 2: LOGÍSTICA */}
                <td style={{ padding: '10px', textAlign: 'center' }}>
                  <button 
                    onClick={() => handleDespachar(p)}
                    style={{ 
                        background: 'transparent', 
                        color: '#ff9800', 
                        border: '1px solid #ff9800', 
                        padding: '6px 12px', 
                        cursor: 'pointer', 
                        borderRadius:'4px',
                        fontSize: '0.8rem',
                        transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => { e.target.style.background = '#ff9800'; e.target.style.color = 'white'; }}
                    onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#ff9800'; }}
                  >
                    🚚 Despachar
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminPedidos;