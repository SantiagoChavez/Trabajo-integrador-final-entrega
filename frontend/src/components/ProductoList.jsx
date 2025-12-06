import React, { useEffect, useState } from "react";
import "./ProductoList.css";

function ProductoList({ agregarAlCarrito, esAdmin, busqueda }) {
  const [productos, setProductos] = useState([]);
  
  // ESTADOS PARA EDICIÓN
  const [productoEditando, setProductoEditando] = useState(null);
  const [datosEditados, setDatosEditados] = useState({});

  // 1. NUEVO ESTADO PARA LA NOTIFICACIÓN
  const [mensajeAlerta, setMensajeAlerta] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/productos")
      .then((res) => res.ok ? res.json() : [])
      .then((data) => {
        if (Array.isArray(data)) setProductos(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  // Función auxiliar para mostrar el mensaje y borrarlo a los 3 seg
  const mostrarNotificacion = (texto) => {
      setMensajeAlerta(texto);
      setTimeout(() => {
          setMensajeAlerta(null);
      }, 3000); // 3 segundos
  };

  // Lógica de filtrado
  const listaSegura = Array.isArray(productos) ? productos : [];
  const productosVisibles = listaSegura.filter((p) => {
    if (busqueda && !p.nombre.toLowerCase().includes(busqueda.toLowerCase())) return false;
    return true;
  });

  // --- FUNCIONES ADMIN ---
  const handleEliminar = (id) => {
    if(window.confirm("¿Seguro que deseas eliminar este producto?")) {
        fetch(`http://localhost:8080/api/productos/${id}`, {method:"DELETE"})
        .then(() => {
            setProductos(prev => prev.filter(p => p.id !== id));
            // 2. USAMOS LA NUEVA NOTIFICACIÓN
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
        // 2. USAMOS LA NUEVA NOTIFICACIÓN
        mostrarNotificacion("✅ ¡Cambios guardados con éxito!");
    })
    .catch(err => mostrarNotificacion("❌ Error: " + err.message));
  };

  const handleCambioCampo = (e) => {
      setDatosEditados({...datosEditados, [e.target.name]:e.target.value});
  };

  return (
    <div>
      {/* 3. AQUÍ RENDERIZAMOS LA ALERTA SI EXISTE */}
      {mensajeAlerta && (
          <div className="notificacion-oval">
              {mensajeAlerta}
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
                    {p.imagenUrl ? (
                        <img src={p.imagenUrl} alt="min" style={{width:'40px', height:'40px', objectFit:'cover', borderRadius:'4px'}}/>
                    ) : '📷'}
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
                      onClick={() => agregarAlCarrito(p)}
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