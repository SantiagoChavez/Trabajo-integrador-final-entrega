# Trabajo Integrador Final - E-commerce Fullstack (UTN)

Este proyecto es una aplicación web **Fullstack de E-commerce** para una Tienda de Insumos Informáticos.
Consiste en un sistema completo de gestión de productos, control de stock y pedidos, integrando un backend robusto en **Spring Boot** con base de datos **MongoDB** y un frontend moderno en **React**.

## 📂 Estructura del Proyecto

```text
Trabajo-entregaFinal/
│
├── backend/             # API REST con Spring Boot & MongoDB
│   └── src/main/java/com/entregaFinal/gestion/
│       ├── controller/  # Controladores (Auth, Productos, Pedidos)
│       ├── model/       # Modelos de datos (Usuario, Producto, Pedido)
│       ├── repository/  # Interfaces MongoRepository
│       └── service/     # Lógica de negocio y transacciones
│
├── frontend/            # Cliente SPA con React + Vite
│   ├── public/          # Assets estáticos (logo.jpg, etc.)
│   └── src/
│       ├── components/  # Componentes (Navbar, Carrito, Gestión, etc.)
│       └── App.jsx      # Rutas y lógica de seguridad
│
└── start_proyecto.bat   # Script de arranque automático (Mongo + Back + Front)

¡Por supuesto! Aquí tienes el código Markdown puro y listo para copiar.
Solo tienes que copiar todo lo que está dentro del bloque de abajo y pegarlo reemplazando todo el contenido de tu archivo README.md.
Markdown
# Trabajo Integrador Final - E-commerce Fullstack (UTN)

Este proyecto es una aplicación web **Fullstack de E-commerce** para una Tienda de Insumos Informáticos.
Consiste en un sistema completo de gestión de productos, control de stock y pedidos, integrando un backend robusto en **Spring Boot** con base de datos **MongoDB** y un frontend moderno en **React**.

## 📂 Estructura del Proyecto

```text
Trabajo-entregaFinal/
│
├── backend/             # API REST con Spring Boot & MongoDB
│   └── src/main/java/com/entregaFinal/gestion/
│       ├── controller/  # Controladores (Auth, Productos, Pedidos)
│       ├── model/       # Modelos de datos (Usuario, Producto, Pedido)
│       ├── repository/  # Interfaces MongoRepository
│       └── service/     # Lógica de negocio y transacciones
│
├── frontend/            # Cliente SPA con React + Vite
│   ├── public/          # Assets estáticos (logo.jpg, etc.)
│   └── src/
│       ├── components/  # Componentes (Navbar, Carrito, Gestión, etc.)
│       └── App.jsx      # Rutas y lógica de seguridad
│
└── start_proyecto.bat   # Script de arranque automático (Mongo + Back + Front)
🚀 Tecnologías Utilizadas
Backend
•	Java: 17 / 21+
•	Spring Boot: 3.2.5
•	Spring Data MongoDB: Para la persistencia de datos NoSQL.
•	Maven: Gestión de dependencias.
Frontend
•	React: Librería de UI.
•	Vite: Entorno de desarrollo rápido.
•	React Router DOM: Manejo de rutas y protección de vistas (Rutas Privadas).
•	CSS3: Estilos personalizados y diseño responsivo.
•	React Icons: Iconografía.
Base de Datos
•	MongoDB: Base de datos NoSQL orientada a documentos (Reemplaza al antiguo sistema JSON para mayor escalabilidad).
________________________________________
✨ Funcionalidades Implementadas
🔐 Autenticación y Roles
El sistema cuenta con un login funcional que diferencia entre dos tipos de usuarios:
1.	Cliente (USER): Acceso a catálogo y compras.
2.	Operador (ADMIN): Acceso al panel de gestión logística.
🛒 Experiencia de Cliente
•	Catálogo Público: Visualización de productos con stock en tiempo real.
•	Filtros: Navegación por categorías dinámicas.
•	Carrito de Compras:
o	Persistencia de estado durante la sesión.
o	Cálculo automático de totales.
o	Validación de stock al intentar agregar más unidades de las disponibles.
•	Confirmación de Pedido: Genera una orden y descuenta stock automáticamente.
⚙️ Panel de Gestión (Backoffice)
•	Ruta Protegida: Accesible solo para usuarios con rol ADMIN (/gestion).
•	CRUD de Productos:
o	Alta: Formulario para crear nuevos insumos.
o	Modificación: Edición de precios, nombres y corrección de stock (Edición "in-line").
o	Baja: Eliminación lógica/física de productos.
•	Control Visual: Alertas de stock bajo o agotado en la tabla de gestión.
________________________________________
🛠️ Instalación y Ejecución
Requisitos Previos
•	Tener instalado Java JDK.
•	Tener instalado Node.js.
•	Tener instalado MongoDB Community Server y asegurase de que corre en el puerto 27017.
Opción 1: Ejecución Automática (Windows)
Ejecutar el archivo start_proyecto.bat. Este script se encargará de:
1.	Levantar el servicio de MongoDB (mongod).
2.	Iniciar el Backend Spring Boot (puerto 8080).
3.	Iniciar el Frontend Vite (puerto 5176).
4.	Abrir el navegador automáticamente.
Opción 2: Ejecución Manual
1. Base de Datos:
Asegúrate de tener MongoDB corriendo localmente.
2. Backend:
Bash
cd backend
./mvnw spring-boot:run
3. Frontend:
Bash
cd frontend
npm install
npm run dev
________________________________________
⚠️ Configuración Inicial (Primer Uso)
Como la base de datos inicia vacía, es necesario crear el primer usuario Administrador manualmente.
1.	Iniciar el proyecto.
2.	Abrir la consola del navegador (F12) o Postman.
3.	Ejecutar el siguiente fetch para crear al Admin:
JavaScript
fetch('http://localhost:8080/api/auth/registro', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
      username: "admin", 
      password: "123", 
      rol: "ADMIN" 
  })
}).then(res => res.json()).then(console.log);
4.	(Opcional) Crear un cliente de prueba:
JavaScript
fetch('http://localhost:8080/api/auth/registro', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
      username: "cliente", 
      password: "123", 
      rol: "USER" 
  })
}).then(res => res.json()).then(console.log);
________________________________________
📡 Endpoints Principales de la API
Método	Endpoint	Descripción
POST	/api/auth/login	Iniciar sesión y obtener rol
POST	/api/auth/registro	Registrar nuevo usuario
GET	/api/productos	Listar todos los productos
POST	/api/productos	Crear producto (Admin)
PUT	/api/productos/{id}	Modificar producto (Admin)
DELETE	/api/productos/{id}	Eliminar producto (Admin)
POST	/api/pedidos	Crear pedido y descontar stock
________________________________________
📝 Changelog
v3.0 - Final Release (Noviembre 2025)
✅ Implementación de MongoDB real (reemplaza JSON).
✅ Sistema de Login y Roles (Admin/User).
✅ Panel de Gestión separado del catálogo.
✅ Lógica de descuento de stock transaccional.
✅ Rediseño de UI: Home profesional, Logo dinámico, Navbar con contador.
v2.0 - Prototipo JSON
•	Persistencia en archivos planos.
v1.0 - Versión H2
•	Base de datos en memoria.
________________________________________
Autor: Chavez Santiago Ezequiel
Institución: UTN Avellaneda - Tecnicatura Universitaria en Programación
