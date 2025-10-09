# Trabajo Integrador Final - Backend en Java
Este proyecto es una aplicación web fullstack ecommerce
Consiste en un sistema de gestión de productos y pedidos, utilizando un backend en Spring Boot y un frontend en React con Vite, DB JSON
## Estructura del Proyecto
Trabajo-entregaFinal/
│
├── backend/              # Backend con Spring Boot
│   ├── datos/           # Archivos JSON de almacenamiento
│   │   ├── productos.json
│   │   └── pedidos.json
│   └── src/
├── frontend/            # Frontend con React + Vite
└── start_proyecto.bat   # Script para iniciar backend y frontend

## Tecnologías utilizadas

### Backend
- Java 24
- Spring Boot 3.2.5
- Jackson (para manejo de JSON)
- Maven

### Frontend
- React
- Vite
- Fetch API
- React Router
- HTML, CSS

## Almacenamiento de Datos

El proyecto utiliza **archivos JSON** como sistema de almacenamiento persistente:
- Los datos se guardan en la carpeta `backend/datos/`
- **Ventajas:** 
  - 100% portable (no requiere instalación de base de datos)
  - Fácil de respaldar (solo copiar la carpeta `datos/`)
  - Los datos persisten entre ejecuciones
  - Ideal para desarrollo y prototipos

## Funcionalidades implementadas

### 📦 Productos
- Listar todos los productos
- Agregar nuevos productos
- Eliminar productos existentes
- Actualizar información de productos
- Control de stock automático al generar pedidos

### 🛒 Carrito y Pedidos
- Agregar productos al carrito
- Modificar cantidades en el carrito
- Crear pedidos a partir del carrito
- Validación de stock antes de confirmar pedido
- Visualización del historial de pedidos
- Cálculo automático de totales

### 🧭 Navegación
- Navegación entre secciones con React Router
  - Inicio
  - Productos
  - Categorías (estructura lista para extender)
  - Carrito
  - Pedidos (historial)

## Cómo ejecutar el proyecto

### Opción 1: Ejecución automática (recomendada)

**Doble click en el archivo `start_proyecto.bat`** que iniciará automáticamente:
1. El backend (Spring Boot) en `http://localhost:8080`
2. El frontend (React + Vite) en `http://localhost:5176`
3. Abrirá el navegador automáticamente
> ⚠️ **Importante:** Asegúrate de que las rutas en el `.bat` coincidan con la ubicación de tu proyecto

### Opción 2: Ejecución manual

#### Backend (Spring Boot)
1. Abrir el proyecto en IntelliJ IDEA o IDE compatible
2. Ejecutar la clase `PreentregaJavaGestionApplication.java`
3. La API REST estará disponible en:
   - `http://localhost:8080/api/productos`
   - `http://localhost:8080/api/pedidos`

#### Frontend (React + Vite)
1. Entrar en la carpeta `frontend/`
2. Instalar dependencias:
```bash
   npm install

Ejecutar el servidor de desarrollo:

bash   npm run dev

Acceder a: http://localhost:5176
📝 Nota: El puerto puede variar. Verifica en la consola qué puerto asignó Vite.

Estructura de datos JSON
productos.json
json[
  {
    "id": 1,
    "nombre": "Laptop HP",
    "descripcion": "Laptop potente para trabajo",
    "precio": 45000.0,
    "categoria": "Electrónica",
    "imagenUrl": "https://via.placeholder.com/150",
    "stock": 10
  }
]
pedidos.json
json[
  {
    "id": 1,
    "fecha": "2025-10-07T21:30:00.000+00:00",
    "estado": "PENDIENTE",
    "total": 47500.0,
    "lineas": [
      {
        "id": null,
        "productoId": 1,
        "productoNombre": "Laptop HP",
        "productoPrecio": 45000.0,
        "cantidad": 1
      }
    ]
  }
]
Endpoints de la API
Productos

GET /api/productos - Listar todos los productos
GET /api/productos/{id} - Obtener producto por ID
POST /api/productos - Crear nuevo producto
PUT /api/productos/{id} - Actualizar producto
DELETE /api/productos/{id} - Eliminar producto

Pedidos

GET /api/pedidos - Listar todos los pedidos
POST /api/pedidos - Crear nuevo pedido

Autor
Chavez Santiago Ezequiel
Desarrollado como entrega de trabajo integrador final de TUP de UTN Avellaneda

Changelog
v2.0 - Migración a JSON (Octubre 2025)

✅ Reemplazo de H2 Database por almacenamiento JSON
✅ Eliminación de dependencias JPA
✅ Sistema de persistencia en archivos locales
✅ Mejora en portabilidad del proyecto

v1.0 - Versión inicial

Sistema funcional con H2 en memoria
CRUD completo de productos y pedidos
Frontend React integrado

