import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ProductoList.css";

// OJO AQUÍ: Asegúrate de que estas llaves { } encierren a agregarAlCarrito
function ProductoList({ agregarAlCarrito, esAdmin }) {
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  const [datosEditados, setDatosEditados] = useState({});

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoriaFiltrada = queryParams.get("categoria");

  useEffect(() => {
    // CHIVATO 1: Ver si la función llegó
    console.log("--> ProductoList cargado. ¿Tengo función agregar?:", !!agregarAlCarrito);
    
    fetch("http://localhost:8080/api/productos")
      .then((res) => res.ok ? res.json() : [])
      .then((data) => {
        if (Array.isArray(data)) setProductos(data);
      })
      .catch((error) => console.error("Error:", error));
  }, [agregarAlCarrito]);

  const listaSegura = Array.isArray(productos) ? productos : [];
  const productosVisibles = categoriaFiltrada
    ? listaSegura.filter((p) => p.categoria === categoriaFiltrada)
    : listaSegura;

  // Funciones de Admin (simplificadas para no ocupar espacio visual aquí)
  const handleEliminar = (id) => {
    if(window.confirm("¿Borrar?")) fetch(`http://localhost:8080/api/productos/${id}`, {method:"DELETE"}).then(()=>window.location.reload());
  };
  const handleEditar = (p) => { setProductoEditando(p.id); setDatosEditados({...p}); };
  const handleCancelar = () => setProductoEditando(null);
  const handleGuardar = () => {
    fetch(`http://localhost:8080/api/productos/${productoEditando}`, {
      method: "PUT", headers:{"Content-Type":"application/json"}, body:JSON.stringify(datosEditados)
    }).then(()=>window.location.reload());
  };
  const handleCambioCampo = (e) => setDatosEditados({...datosEditados, [e.target.name]:e.target.value});

  return (
    <div>
      <h2>{esAdmin ? "🛠️ Gestión" : (categoriaFiltrada ? `Categoría: ${categoriaFiltrada}` : "Catálogo de Productos")}</h2>
      
      {productosVisibles.length === 0 ? <p>No hay productos.</p> : (
        <table className="tabla-productos">
          <thead>
            <tr>
              <th>Info</th><th>Producto</th><th>Precio</th><th>Cat</th><th>Stock</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosVisibles.map((p) => (
              <tr key={p.id}>
                <td>ID: {p.id ? p.id.substring(0,5) : 'N/A'}...</td>
                <td>
                  {esAdmin && productoEditando === p.id ? 
                    <input name="nombre" value={datosEditados.nombre} onChange={handleCambioCampo}/> : 
                    <strong>{p.nombre}</strong>
                  }
                </td>
                <td>${p.precio}</td>
                <td>{p.categoria}</td>
                <td>
                   <span style={{color: p.stock === 0 ? 'red' : 'green', fontWeight:'bold'}}>
                       {p.stock}
                   </span>
                </td>
                <td>
                  {esAdmin ? (
                    productoEditando === p.id ? 
                    <><button onClick={handleGuardar}>💾</button><button onClick={handleCancelar}>✖</button></> :
                    <><button onClick={()=>handleEditar(p)}>✏️</button><button className="btn-eliminar" onClick={()=>handleEliminar(p.id)}>🗑️</button></>
                  ) : (
                    // --- AQUÍ ESTÁ EL BOTÓN IMPORTANTE ---
                    <button
                      onClick={() => {
                        // CHIVATO 2: Al hacer clic
                        console.log("--> Click en producto:", p.nombre);
                        if (typeof agregarAlCarrito === 'function') {
                            agregarAlCarrito(p);
                        } else {
                            alert("ERROR CRÍTICO: La función 'agregarAlCarrito' no existe o no llegó al componente.");
                            console.error("agregarAlCarrito es:", agregarAlCarrito);
                        }
                      }}
                      disabled={p.stock === 0}
                      style={{ 
                        backgroundColor: p.stock === 0 ? "#ccc" : "#008CBA", 
                        color: "white", 
                        width: "100%",
                        cursor: p.stock === 0 ? "not-allowed" : "pointer"
                      }}
                    >
                      {p.stock === 0 ? "Sin Stock" : "🛒 Al Carrito"}
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