import React, { useEffect, useState } from "react";
import "./ProductoList.css";
// 1. IMPORTAMOS EL HOOK DEL CONTEXTO
import { useNotification } from "../context/NotificationContext";

function ProductoList({ agregarAlCarrito, esAdmin, busqueda }) {
  const [productos, setProductos] = useState([]);
  
  // 2. OBTENEMOS LA FUNCIÓN GLOBAL PARA MOSTRAR MENSAJES
  const { mostrarNotificacion } = useNotification();

  // ESTADOS PARA EDICIÓN
  const [productoEditando, setProductoEditando] = useState(null);
  const [datosEditados, setDatosEditados] = useState({});

  // (El estado local de mensajeAlerta LO BORRAMOS, ya no se usa)

  // ESTADOS PARA EL MODAL DE IMAGEN 
  const [imagenModal, setImagenModal] = useState(null);  
  const [zoom, setZoom] = useState(1); 

  useEffect(() => {
    fetch("http://localhost:8080/api/productos")
      .then((res) => res.ok ? res.json() : [])
      .then((data) => {
        if (Array.isArray(data)) setProductos(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  // --- FUNCIONES DEL MODAL DE IMAGEN ---
  const abrirModal = (url) => {
      if (url) {
          setImagenModal(url);
          setZoom(1); 
      }
  };

  const cerrarModal = () => {
      setImagenModal(null);
  };

  // Lógica de filtrado
  const listaSegura = Array.isArray(productos) ? productos : [];
  const productosVisibles = listaSegura.filter((p) => {
    if (busqueda && !p.nombre.toLowerCase().includes(busqueda.toLowerCase())) return false;
    return true;
  });

  // --- NUEVA FUNCIÓN PARA AGREGAR AL CARRITO CON NOTIFICACIÓN ---
  const handleAgregar = (p) => {
    // 1. Ejecutamos la lógica del carrito (que viene de App.jsx)
    agregarAlCarrito(p);
    // 2. Disparamos la notificación global bonita
    mostrarNotificacion(`✅ ${p.nombre} agregado al carrito`);
  };

  // --- FUNCIONES ADMIN ---
  const handleEliminar = (id) => {
    if(window.confirm("¿Seguro que deseas eliminar este producto?")) {
        fetch(`http://localhost:8080/api/productos/${id}`, {method:"DELETE"})
        .then(() => {
            setProductos(prev => prev.filter(p => p.id !== id));
            // Usamos la notificación global
            mostrarNotificacion("🗑️ Producto eliminado correctamente");
        })
        .catch(err => mostrarNotificacion("❌ Error al eliminar"));
    }
  };

  const handleEditar = (p) => { 
      setProductoEditando(p.id); 
      setDatosEditados({...p}); 
  };

  const handleCancelar = () => setProductoEditando(null);

  const handleGuardar = () => {
    const payload = {
        ...datosEditados,
        precio: parseFloat(datosEditados.precio),
        stock: parseInt(datosEditados.stock)
    };

    fetch(`http://localhost:8080/api/productos/${productoEditando}`, {
      method: "PUT", 
      headers:{"Content-Type":"application/json"}, 
      body:JSON.stringify(payload)
    })
    .then(res => {
        if(!res.ok) throw new Error("Error en la respuesta");
        return res.json();
    })
    .then((productoActualizado) => {
        setProductos(prev => prev.map(p => 
            p.id === productoEditando ? productoActualizado : p
        ));
        setProductoEditando(null);
        mostrarNotificacion("✅ ¡Cambios guardados con éxito!");
    })
    .catch(err => mostrarNotificacion("❌ Error: " + err.message));
  };

  const handleCambioCampo = (e) => {
      setDatosEditados({...datosEditados, [e.target.name]:e.target.value});
  };

  return (
    <div>
      {/* YA NO RENDERIZAMOS 'mensajeAlerta' AQUÍ, LO HACE EL CONTEXTO EN APP.JSX */}

      {/* --- MODAL DE IMAGEN CON ZOOM --- */}
      {imagenModal && (
        <div className="modal-imagen-backdrop" onClick={cerrarModal}>
            <div 
                className="modal-imagen-contenido" 
                onClick={(e) => e.stopPropagation()} 
                onWheel={(e) => {
                    e.stopPropagation(); 
                    const delta = e.deltaY * -0.001; 
                    const nuevoZoom = Math.min(Math.max(zoom + delta, 0.5), 5); 
                    setZoom(nuevoZoom);
                }}
            >
                <span className="cerrar-modal" onClick={cerrarModal}>&times;</span>
                <img 
                    src={imagenModal} 
                    alt="Producto grande" 
                    style={{ 
                        transform: `scale(${zoom})`, 
                        transition: 'transform 0.1s ease-out', 
                        cursor: 'zoom-in' 
                    }}
                />
            </div>
        </div>
      )}
      {!esAdmin && (
          <h2 style={{color:'#fff'}}>
             {busqueda ? `Resultados para: "${busqueda}"` : "Catálogo Completo"}
          </h2>
      )}
      
      {productosVisibles.length === 0 ? (
        <p style={{ marginTop: '20px', color: '#999' }}>No se encontraron productos.</p>
      ) : (
        <table className="tabla-productos">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cat</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosVisibles.map((p) => (
              <tr key={p.id}>
                <td>
                    {esAdmin && productoEditando === p.id ? (
                        <input 
                            type="text" 
                            name="imagenUrl" 
                            value={datosEditados.imagenUrl || ''} 
                            onChange={handleCambioCampo}
                            placeholder="/img/..."
                            style={{width:'80px', fontSize:'0.8rem'}}
                        />
                    ) : (
                        p.imagenUrl ? (
                            <img 
                                src={p.imagenUrl} 
                                alt="min" 
                                onError={(e) => e.target.src = 'https://via.placeholder.com/40?text=X'}
                                onClick={() => abrirModal(p.imagenUrl)} 
                                style={{
                                    width:'40px', 
                                    height:'40px', 
                                    objectFit:'cover', 
                                    borderRadius:'4px',
                                    cursor: 'pointer' 
                                }}
                            />
                        ) : '📷'
                    )}
                </td>
                <td>
                  {esAdmin && productoEditando === p.id ? 
                    <input type="text" name="nombre" value={datosEditados.nombre} onChange={handleCambioCampo}/> : 
                    <strong>{p.nombre}</strong>
                  }
                </td>
                <td>
                   {esAdmin && productoEditando === p.id ? 
                    <input type="number" name="precio" value={datosEditados.precio} onChange={handleCambioCampo} style={{width:'80px'}}/> : 
                    `$${p.precio}`
                  }
                </td>
                <td>
                   {esAdmin && productoEditando === p.id ? 
                    <input type="text" name="categoria" value={datosEditados.categoria} onChange={handleCambioCampo} style={{width:'100px'}}/> : 
                    p.categoria
                  }
                </td>
                <td>
                   {esAdmin && productoEditando === p.id ? 
                     <input type="number" name="stock" value={datosEditados.stock} onChange={handleCambioCampo} style={{width:'60px'}}/> : 
                     <span style={{color: p.stock === 0 ? '#ff6b6b' : '#69db7c', fontWeight:'bold'}}>
                       {p.stock}
                     </span>
                   }
                </td>
                <td>
                  {esAdmin ? (
                    productoEditando === p.id ? 
                    <>
                        <button onClick={handleGuardar} style={{backgroundColor:'#4dabf7', color:'white'}}>💾</button>
                        <button onClick={handleCancelar} style={{backgroundColor:'#e0e0e0', color:'#333'}}>✖</button>
                    </> 
                    :
                    <>
                        <button onClick={()=>handleEditar(p)} style={{backgroundColor:'#333', border:'1px solid #555', color:'white'}}>✏️</button>
                        <button className="btn-eliminar" onClick={()=>handleEliminar(p.id)}>🗑️</button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleAgregar(p)} // <--- AQUÍ LLAMAMOS A LA NUEVA FUNCIÓN
                      disabled={p.stock === 0}
                      style={{ 
                        backgroundColor: p.stock === 0 ? "#444" : "#007bff", 
                        color: "white", 
                        width: "100%",
                        opacity: p.stock === 0 ? 0.6 : 1,
                        cursor: p.stock === 0 ? "not-allowed" : "pointer"
                      }}
                    >
                      {p.stock === 0 ? "Sin Stock" : "🛒 Agregar"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductoList;