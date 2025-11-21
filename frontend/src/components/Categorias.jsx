import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTags, FaArrowRight } from 'react-icons/fa'; // ✅ Importación corregida (FaTags)
import './Categorias.css';

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    // Obtenemos los productos para extraer sus categorías únicas
    fetch('http://localhost:8080/api/productos')
      .then(res => res.json())
      .then(data => {
        // Extraemos las categorías únicas usando Set
        // Si un producto no tiene categoría, le ponemos "General"
        const uniqueCats = [...new Set(data.map(p => p.categoria || 'General'))];
        setCategorias(uniqueCats);
      })
      .catch(err => console.error("Error cargando categorías:", err));
  }, []);

  return (
    <div className="categorias-container">
      <h2>Explora nuestro Catálogo</h2>
      <p>Encuentra justo lo que necesitas para tu setup</p>
      
      <div className="categorias-grid">
        {categorias.map((cat, index) => (
          <Link to={`/productos?categoria=${cat}`} key={index} className="categoria-card">
            <div className="icon-container">
              <FaTags /> {/* ✅ Componente corregido */}
            </div>
            <h3>{cat}</h3>
            <span className="ver-mas">
              Ver productos <FaArrowRight />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categorias;