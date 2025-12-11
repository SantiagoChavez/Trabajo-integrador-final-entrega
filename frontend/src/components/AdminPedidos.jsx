import React, { useState, useEffect } from 'react';
import { generarFacturaPDF } from '../utils/facturaPDF'; 

function AdminPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [mensajeAlerta, setMensajeAlerta] = useState(null);
  
  // ESTADO NUEVO PARA SELECCIÓN MÚLTIPLE
  const [seleccionados, setSeleccionados] = useState([]);

  // Modales
  const [pedidoAAnular, setPedidoAAnular] = useState(null);
  const [pedidoAEliminar, setPedidoAEliminar] = useState(null);

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

  // --- LÓGICA DE SELECCIÓN MÚLTIPLE ---
  
  // 1. Seleccionar uno solo
  const handleSeleccionIndividual = (id) => {
    if (seleccionados.includes(id)) {
      setSeleccionados(seleccionados.filter(item => item !== id));
    } else {
      setSeleccionados([...seleccionados, id]);
    }
  };

  // 2. Seleccionar todos
  const handleSeleccionarTodos = () => {
    if (seleccionados.length === pedidos.length) {
      setSeleccionados([]); // Desmarcar todo
    } else {
      setSeleccionados(pedidos.map(p => p.id)); // Marcar todo
    }
  };

  // 3. Eliminar Masivo
  const handleEliminarMasivo = async () => {
    // Usamos confirm nativo para no sobrecargar de modales complejos por ahora
    if (!window.confirm(`⚠️ ¿Estás seguro de eliminar ${seleccionados.length} pedidos?\nEsta acción devolverá el stock y no se puede deshacer.`)) return;

    const promesas = seleccionados.map(id => 
        fetch(`http://localhost:8080/api/pedidos/${id}`, { method: 'DELETE' })
    );

    try {
        await Promise.all(promesas);
        
        // Actualizamos la tabla quitando los eliminados
        setPedidos(prev => prev.filter(p => !seleccionados.includes(p.id)));
        
        mostrarNotificacion(`🗑️ Se eliminaron ${seleccionados.length} pedidos correctamente.`);
        setSeleccionados([]); // Limpiar selección
    } catch (error) {
        console.error("Error borrando:", error);
        mostrarNotificacion("❌ Hubo un error al eliminar algunos pedidos.");
    }
  };


  // --- LÓGICA DE FACTURACIÓN ---
  const handleFacturar = (pedido) => {
    try { generarFacturaPDF(pedido); } 
    catch (error) { mostrarNotificacion("❌ Error al crear el PDF."); return; }

    if (pedido.estado === "FACTURADO") return;

    fetch(`http://localhost:8080/api/pedidos/${pedido.id}/estado?nuevoEstado=FACTURADO`, { method: "PUT" })
    .then(res => { if (!res.ok) throw new Error("Error"); return res.json(); })
    .then(() => {
        setPedidos(prev => prev.map(p => p.id === pedido.id ? { ...p, estado: "FACTURADO" } : p));
    })
    .catch(err => console.error(err));
  };

  const handleDespachar = (pedido) => {
    if (pedido.estado !== "FACTURADO") {
        mostrarNotificacion("⚠️ Debes facturar antes de despachar.");
        return;
    }
    const tracking = "TRK-" + Math.floor(Math.random() * 99999);
    mostrarNotificacion(`🚚 Pedido despachado. Tracking: ${tracking}`);
  };

  // --- LÓGICA DE ANULACIÓN (PENDIENTE <-> FACTURADO) ---
  const abrirModalAnular = (pedido) => setPedidoAAnular(pedido);
  
  const confirmarAnulacion = () => {
      if (!pedidoAAnular) return;
      fetch(`http://localhost:8080/api/pedidos/${pedidoAAnular.id}/estado?nuevoEstado=PENDIENTE`, { method: "PUT" })
      .then(res => { if (!res.ok) throw new Error("Error"); return res.json(); })
      .then(() => {
          setPedidos(prev => prev.map(p => p.id === pedidoAAnular.id ? { ...p, estado: "PENDIENTE" } : p));
          mostrarNotificacion("✅ Factura anulada. Listo para corregir.");
          setPedidoAAnular(null);
      })
      .catch(() => { mostrarNotificacion("❌ Error al conectar."); setPedidoAAnular(null); });
  };

  // --- LÓGICA DE ELIMINACIÓN (BORRAR DEFINITIVAMENTE - UNO SOLO) ---
  const abrirModalEliminar = (pedido) => setPedidoAEliminar(pedido);

  const confirmarEliminacion = () => {
      if (!pedidoAEliminar) return;
      
      fetch(`http://localhost:8080/api/pedidos/${pedidoAEliminar.id}`, { method: "DELETE" })
      .then(res => {
          if (!res.ok) throw new Error("Error al eliminar");
          setPedidos(prev => prev.filter(p => p.id !== pedidoAEliminar.id));
          
          // Si estaba seleccionado en la lista masiva, lo quitamos de ahí también para evitar bugs
          if(seleccionados.includes(pedidoAEliminar.id)) {
              setSeleccionados(prev => prev.filter(id => id !== pedidoAEliminar.id));
          }

          mostrarNotificacion("🗑️ Pedido eliminado y stock restaurado.");
          setPedidoAEliminar(null);
      })
      .catch((err) => {
          console.error(err);
          mostrarNotificacion("❌ Error al eliminar pedido.");
          setPedidoAEliminar(null);
      });
  };

  return (
    <div style={{ padding: '20px', color: '#e0e0e0', background: '#1e1e2f', borderRadius: '8px', border: '1px solid #2d2d44', marginTop: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
      
      {mensajeAlerta && <div className="notificacion-oval">{mensajeAlerta}</div>}

      {/* --- MODAL CONFIRMAR ANULACIÓN --- */}
      {pedidoAAnular && (
          <div className="modal-backdrop">
              <div className="modal-neon">
                  <h3>⚠️ Confirmar Anulación</h3>
                  <p>¿Anular factura del pedido <strong style={{color: 'white'}}> {pedidoAAnular.id.substring(0,8)}</strong>?</p>
                  <div className="modal-botones">
                      <button className="btn-cancelar" onClick={() => setPedidoAAnular(null)}>Cancelar</button>
                      <button className="btn-confirmar-rojo" onClick={confirmarAnulacion}>Sí, Anular</button>
                  </div>
              </div>
          </div>
      )}

      {/* --- MODAL CONFIRMAR ELIMINACIÓN INDIVIDUAL --- */}
      {pedidoAEliminar && (
          <div className="modal-backdrop">
              <div className="modal-neon" style={{borderColor: '#ff4444'}}>
                  <h3 style={{color:'#ff4444'}}>🗑️ Eliminar Definitivamente</h3>
                  <p>
                      ¿Borrar el pedido <strong style={{color: 'white'}}>{pedidoAEliminar.id.substring(0,8)}</strong>?
                      <br/><br/>
                      <span style={{fontSize:'0.9rem', color:'#4caf50'}}>✅ El stock de los productos será devuelto al inventario.</span>
                  </p>
                  <div className="modal-botones">
                      <button className="btn-cancelar" onClick={() => setPedidoAEliminar(null)}>Cancelar</button>
                      <button className="btn-confirmar-rojo" style={{background:'#ff4444', color:'white'}} onClick={confirmarEliminacion}>Sí, Eliminar</button>
                  </div>
              </div>
          </div>
      )}

      <h3 style={{ color: '#a0a0b0', borderBottom: '1px solid #2d2d44', paddingBottom: '10px', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '2px' }}>
        ⚙️ Control de Pedidos
      </h3>

      {/* --- BARRA DE ACCIONES MASIVAS (NUEVO) --- */}
      {seleccionados.length > 0 && (
          <div style={{ 
              backgroundColor: 'rgba(255, 68, 68, 0.1)', 
              border: '1px solid #ff4444', 
              padding: '10px 15px', 
              marginBottom: '15px', 
              borderRadius: '6px', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              animation: 'fadeIn 0.3s ease-in'
          }}>
              <span style={{ color: '#ff4444', fontWeight: 'bold' }}>
                  {seleccionados.length} pedidos seleccionados
              </span>
              <button 
                  onClick={handleEliminarMasivo}
                  style={{ 
                      backgroundColor: '#c92a2a', 
                      color: 'white', 
                      border: 'none', 
                      padding: '8px 15px', 
                      borderRadius: '4px', 
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}
              >
                  🗑️ ELIMINAR SELECCIÓN
              </button>
          </div>
      )}
      
      {pedidos.length === 0 ? <p style={{ textAlign: 'center', color: '#666' }}>Sin pedidos pendientes.</p> : (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#2d2d44', color: '#fff' }}>
              {/* CHECKBOX CABECERA (SELECCIONAR TODO) */}
              <th style={{ padding: '12px', width: '40px', textAlign: 'center' }}>
                <input 
                    type="checkbox" 
                    onChange={handleSeleccionarTodos}
                    checked={pedidos.length > 0 && seleccionados.length === pedidos.length}
                    style={{ cursor: 'pointer', transform: 'scale(1.2)', accentColor: '#00d2ff' }}
                />
              </th>
              <th style={{ padding: '12px', textAlign: 'left' }}>ID / Cliente</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>Estado</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>Ítems</th>
              <th style={{ padding: '12px', textAlign: 'center', color: '#4caf50' }}>Facturación</th>
              <th style={{ padding: '12px', textAlign: 'center', color: '#ff9800' }}>Logística</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((p) => {
              const esFacturado = p.estado === "FACTURADO";
              const estaSeleccionado = seleccionados.includes(p.id);

              return (
              <tr key={p.id} style={{ 
                  borderBottom: '1px solid #2d2d44', 
                  // Si está seleccionado, le damos un fondo sutil azulado
                  backgroundColor: estaSeleccionado ? 'rgba(0, 210, 255, 0.05)' : 'transparent',
                  transition: 'background-color 0.2s'
              }}>
                {/* CHECKBOX INDIVIDUAL */}
                {/* ... (código anterior: columna de Estado) */}
                
                {/* COLUMNA ÍTEMS (MODIFICADA) */}
                <td style={{ padding: '10px', textAlign: 'center', color: '#ccc' }}>
                    <div style={{fontSize: '0.9em', color:'white'}}>
                        {p.lineas ? p.lineas.length : 0} prod.
                    </div>
                    <div style={{fontSize: '0.75em', color:'#888'}}>
                        ({p.lineas ? p.lineas.reduce((acc, item) => acc + item.cantidad, 0) : 0} u.)
                    </div>
                </td>

                {/* ... (código siguiente: columna de Facturación) */}

                <td style={{ padding: '10px', color: '#ccc' }}>
                   <span style={{fontFamily:'monospace', color:'#888'}}>{p.id.substring(0, 8)}...</span>
                   <div style={{fontSize:'0.8rem', color:'#00d2ff', fontWeight:'bold'}}>{p.usuarioId || "Anónimo"}</div>
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
                <td style={{ padding: '10px', textAlign: 'center', color: '#ccc' }}>{p.lineas ? p.lineas.length : 0}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                      {/* BOTÓN FACTURAR / PDF */}
                      <button onClick={() => handleFacturar(p)}
                        style={{ 
                            background: esFacturado ? 'rgba(76, 175, 80, 0.15)' : 'transparent', 
                            color: '#69f0ae',
                            border: esFacturado ? '1px solid rgba(76, 175, 80, 0.3)' : '1px solid #69f0ae',
                            padding: '6px 12px', cursor: 'pointer', borderRadius: '6px',
                            fontSize: '0.75rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px',
                        }}>
                        {esFacturado ? ( <><span>⬇</span> PDF</> ) : ( <><span>📄</span> FACTURAR</> )}
                      </button>

                      {esFacturado ? (
                          /* BOTÓN ANULAR (Solo si está facturado) */
                          <button onClick={() => abrirModalAnular(p)} 
                            title="Anular factura y corregir"
                            style={{ background: 'transparent', border: '1px solid rgba(255, 82, 82, 0.4)', color: '#ff5252', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer' }}>
                              ❌
                          </button>
                       ) : (
                          /* BOTÓN ELIMINAR (Solo si está pendiente) */
                          <button onClick={() => abrirModalEliminar(p)} 
                            title="Eliminar pedido y devolver stock"
                            style={{ background: 'transparent', border: '1px solid #555', color: '#aaa', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', transition:'all 0.2s' }}
                            onMouseOver={(e) => {e.target.style.borderColor='#ff4444'; e.target.style.color='#ff4444'}}
                            onMouseOut={(e) => {e.target.style.borderColor='#555'; e.target.style.color='#aaa'}}
                          >
                              🗑️
                          </button>
                       )}
                  </div>
                </td>
                <td style={{ padding: '10px', textAlign: 'center' }}>
                  <button onClick={() => handleDespachar(p)} disabled={!esFacturado}
                    style={{ 
                        background: 'transparent', color: esFacturado ? '#ff9800' : '#555', 
                        border: esFacturado ? '1px solid #ff9800' : '1px solid #555', 
                        padding: '6px 12px', cursor: esFacturado ? 'pointer' : 'not-allowed', borderRadius:'4px', fontSize: '0.8rem'
                    }}>
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