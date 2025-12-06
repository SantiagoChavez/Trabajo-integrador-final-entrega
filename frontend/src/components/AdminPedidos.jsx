import React, { useState, useEffect } from 'react';
import { generarFacturaPDF } from '../utils/facturaPDF'; 

function AdminPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [mensajeAlerta, setMensajeAlerta] = useState(null);
  
  // NUEVO ESTADO: Guarda qué pedido estamos a punto de anular para mostrar el modal
  const [pedidoAAnular, setPedidoAAnular] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/pedidos")
      .then((res) => res.json())
      .then((data) => setPedidos(data))
      .catch((err) => console.error(err));
  }, []);

  const mostrarNotificacion = (texto) => {
      setMensajeAlerta(texto);
      setTimeout(() => setMensajeAlerta(null), 3000);
  };

  const handleFacturar = (pedido) => {
    try {
        generarFacturaPDF(pedido);
    } catch (error) {
        mostrarNotificacion("❌ Error al crear el PDF.");
        return;
    }

    if (pedido.estado === "FACTURADO") return;

    fetch(`http://localhost:8080/api/pedidos/${pedido.id}/estado?nuevoEstado=FACTURADO`, {
        method: "PUT"
    })
    .then(res => {
        if (!res.ok) throw new Error("Error");
        return res.json();
    })
    .then(() => {
        setPedidos(prev => prev.map(p => 
            p.id === pedido.id ? { ...p, estado: "FACTURADO" } : p
        ));
    })
    .catch(err => console.error(err));
  };

  // 1. PRIMER PASO: El usuario toca "Anular" y abrimos el modal (NO hacemos fetch todavía)
  const abrirModalAnular = (pedido) => {
      setPedidoAAnular(pedido);
  };

  // 2. SEGUNDO PASO: El usuario confirmó en el modal, ahora sí ejecutamos
  const confirmarAnulacion = () => {
      if (!pedidoAAnular) return;

      fetch(`http://localhost:8080/api/pedidos/${pedidoAAnular.id}/estado?nuevoEstado=PENDIENTE`, {
          method: "PUT"
      })
      .then(res => {
          if (!res.ok) throw new Error("Error");
          return res.json();
      })
      .then(() => {
          setPedidos(prev => prev.map(p => 
              p.id === pedidoAAnular.id ? { ...p, estado: "PENDIENTE" } : p
          ));
          mostrarNotificacion("✅ Factura anulada. Listo para corregir.");
          setPedidoAAnular(null); // Cerramos el modal
      })
      .catch(() => {
          mostrarNotificacion("❌ Error al conectar con el servidor.");
          setPedidoAAnular(null);
      });
  };

  const handleDespachar = (pedido) => {
    if (pedido.estado !== "FACTURADO") {
        mostrarNotificacion("⚠️ Debes facturar antes de despachar.");
        return;
    }
    const tracking = "TRK-" + Math.floor(Math.random() * 99999);
    mostrarNotificacion(`🚚 Pedido despachado. Tracking: ${tracking}`);
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
      
      {/* --- NOTIFICACIÓN FLOTANTE --- */}
      {mensajeAlerta && (
          <div className="notificacion-oval">
              {mensajeAlerta}
          </div>
      )}

      {/* --- MODAL DE CONFIRMACIÓN PROPIO (Solo se muestra si pedidoAAnular tiene datos) --- */}
      {pedidoAAnular && (
          <div className="modal-backdrop">
              <div className="modal-neon">
                  <h3>⚠️ Confirmar Anulación</h3>
                  <p>
                      ¿Estás seguro de anular la factura del pedido 
                      <strong style={{color: 'white'}}> {pedidoAAnular.id.substring(0,8)}</strong>?
                      <br/><br/>
                      <span style={{fontSize:'0.9rem', opacity:0.8}}>El estado volverá a "PENDIENTE" para que puedas editar y refacturar.</span>
                  </p>
                  <div className="modal-botones">
                      <button className="btn-cancelar" onClick={() => setPedidoAAnular(null)}>
                          Cancelar
                      </button>
                      <button className="btn-confirmar-rojo" onClick={confirmarAnulacion}>
                          Sí, Anular
                      </button>
                  </div>
              </div>
          </div>
      )}

      <h3 style={{ 
          color: '#a0a0b0', borderBottom: '1px solid #2d2d44', 
          paddingBottom: '10px', textAlign: 'center', 
          textTransform: 'uppercase', letterSpacing: '2px'
      }}>
        ⚙️ Control de Pedidos
      </h3>
      
      {pedidos.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666' }}>Sin pedidos pendientes.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#2d2d44', color: '#fff' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>ID Corto</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>Estado</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>Ítems</th>
              <th style={{ padding: '12px', textAlign: 'center', color: '#4caf50' }}>Facturación</th>
              <th style={{ padding: '12px', textAlign: 'center', color: '#ff9800' }}>Logística</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((p) => {
              const esFacturado = p.estado === "FACTURADO";
              return (
              <tr key={p.id} style={{ borderBottom: '1px solid #2d2d44' }}>
                <td style={{ padding: '10px', color: '#888', fontFamily: 'monospace' }}>
                    {p.id.substring(0, 8)}...
                </td>
                <td style={{ padding: '10px', textAlign: 'center' }}>
                    <span style={{ 
                        padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold',
                        border: esFacturado ? '1px solid #4caf50' : '1px solid #00d2ff',
                        color: esFacturado ? '#4caf50' : '#00d2ff',
                        background: esFacturado ? 'rgba(76, 175, 80, 0.1)' : 'rgba(0, 210, 255, 0.1)'
                    }}>
                        {p.estado || "PENDIENTE"}
                    </span>
                </td>
                <td style={{ padding: '10px', textAlign: 'center', color: '#ccc' }}>
                    {p.lineas ? p.lineas.length : 0}
                </td>
                <td style={{ padding: '10px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                      <button 
                        onClick={() => handleFacturar(p)}
                        style={{ 
                            background: esFacturado ? 'rgba(76, 175, 80, 0.15)' : 'transparent', 
                            color: '#69f0ae',
                            border: esFacturado ? '1px solid rgba(76, 175, 80, 0.3)' : '1px solid #69f0ae',
                            padding: '6px 12px', cursor: 'pointer', borderRadius: '6px',
                            fontSize: '0.75rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                      >
                        {esFacturado ? ( <><span>⬇</span> PDF</> ) : ( <><span>📄</span> FACTURAR</> )}
                      </button>

                      {esFacturado && (
                          <button
                            onClick={() => abrirModalAnular(p)} 
                            title="Anular factura y corregir"
                            style={{
                                background: 'transparent',
                                border: '1px solid rgba(255, 82, 82, 0.4)',
                                color: '#ff5252',
                                padding: '6px 10px', borderRadius: '6px', cursor: 'pointer',
                                fontSize: '0.75rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 82, 82, 0.1)';
                                e.currentTarget.style.borderColor = '#ff5252';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.borderColor = 'rgba(255, 82, 82, 0.4)';
                            }}
                          >
                              ❌ <span style={{fontSize: '0.7rem', opacity: 0.9}}>ANULAR</span>
                          </button>
                      )}
                  </div>
                </td>
                <td style={{ padding: '10px', textAlign: 'center' }}>
                  <button 
                    onClick={() => handleDespachar(p)}
                    disabled={!esFacturado}
                    style={{ 
                        background: 'transparent', 
                        color: esFacturado ? '#ff9800' : '#555', 
                        border: esFacturado ? '1px solid #ff9800' : '1px solid #555', 
                        padding: '6px 12px', cursor: esFacturado ? 'pointer' : 'not-allowed', 
                        borderRadius:'4px', fontSize: '0.8rem', transition: 'all 0.2s'
                    }}
                  >
                    🚚 Despachar
                  </button>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminPedidos;