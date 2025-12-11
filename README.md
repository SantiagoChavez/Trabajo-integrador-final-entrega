TRABAJO INTEGRADOR FINAL - E-COMMERCE FULLSTACK (UTN)
Este proyecto es una aplicación web Fullstack de E-commerce diseñada para una Tienda de Insumos Informáticos. El sistema ofrece una solución integral que abarca desde el catálogo público y carrito de compras para clientes, hasta un panel de administración avanzado con gestión de stock, control de pedidos, facturación PDF y logística.
Desarrollado con: Java Spring Boot, MongoDB y React (Vite).
________________________________________
TECNOLOGÍAS UTILIZADAS
Backend (API REST)
•	Java 17+ & Spring Boot 3.x: Núcleo de la aplicación.
•	Spring Data MongoDB: Persistencia NoSQL flexible y escalable.
•	Maven: Gestión de dependencias.
Frontend (SPA)
•	React 18: Librería de interfaz de usuario.
•	Vite: Entorno de desarrollo de alto rendimiento.
•	React Router v6: Navegación SPA con rutas protegidas y "Future Flags" activadas.
•	jsPDF & AutoTable: Generación de facturas PDF en el cliente.
•	CSS3 Moderno: Diseño "Dark Neon" con efectos de glassmorphism y animaciones.
________________________________________
FUNCIONALIDADES CLAVE
1.	Seguridad y Roles
o	Autenticación: Login y Registro funcional.
o	Roles:
	USER: Compra, carrito persistente, historial de pedidos.
	ADMIN: Acceso exclusivo al panel de gestión (/gestion).
o	Data Initializer: El sistema crea automáticamente usuarios de prueba al arrancar si no existen.
2.	Experiencia de Cliente
o	Catálogo Dinámico: Búsqueda inteligente por nombre, marca o categoría.
o	Stock en Tiempo Real: Validación inmediata al agregar al carrito (no permite comprar más de lo disponible).
o	Carrito Persistente: Los productos se guardan en localStorage.
o	Mis Pedidos: Visualización del estado de las compras (Pendiente, Facturado, Despachado).
3.	Panel de Administración (Backoffice)
o	Gestión de Productos:
	Alta, Baja y Modificación (CRUD).
	Edición "In-line" (directa en la tabla) para cambios rápidos de precio/stock.
	Modal de vista previa de imágenes con zoom.
o	Gestión de Pedidos Avanzada:
	Selección Múltiple: Checkboxes para seleccionar y eliminar varios pedidos a la vez.
	Restauración de Stock: Al eliminar un pedido (individual o masivo), el stock de los productos regresa automáticamente al inventario.
	Facturación: Generación de Facturas PDF profesionales con un clic.
	Flujo de Estado: Ciclo completo de venta (Pendiente -> Facturar -> Despachar).
________________________________________
ESTRUCTURA DEL PROYECTO
Trabajo-entregaFinal/ │ ├── backend/ # Servidor Spring Boot │ └── src/main/java/com/entregaFinal/gestion/ │ ├── controller/ # Endpoints (Auth, Pedidos, Productos) │ ├── model/ # Entidades Mongo (Documentos) │ ├── repository/ # Interfaces de acceso a datos │ ├── service/ # Lógica de negocio (Stock, Validaciones) │ └── Preentrega... # Main Application │ ├── frontend/ # Cliente React │ ├── src/ │ │ ├── components/ # Componentes (AdminPedidos, Carrito, etc.) │ │ ├── context/ # Contexto de Notificaciones Globales │ │ ├── utils/ # Generador de PDF │ │ └── App.jsx # Router y Configuración │ └── public/ # Assets (Imágenes) │ └── README.md # Documentación
________________________________________
INSTALACIÓN Y EJECUCIÓN
Requisitos:
•	Java JDK 17 o superior.
•	Node.js (LTS).
•	MongoDB (Corriendo en puerto 27017).
Paso 1: Backend
1.	Abrir terminal en la carpeta "backend".
2.	Ejecutar: ./mvnw spring-boot:run (El servidor iniciará en http://localhost:8080)
Paso 2: Frontend
1.	Abrir terminal en la carpeta "frontend".
2.	Instalar dependencias (solo la primera vez): npm install
3.	Iniciar servidor de desarrollo: npm run dev (La web abrirá en http://localhost:5176)
________________________________________
USUARIOS DE PRUEBA (AUTOMÁTICOS)
Al iniciar el backend por primera vez, el sistema creará automáticamente estos usuarios para que puedas probar todo:
Rol: Administrador Usuario: admin Contraseña: 1234 Acceso: Panel de Gestión completo
Rol: Cliente Usuario: cliente Contraseña: 1234 Acceso: Catálogo y Compras
________________________________________
ENDPOINTS PRINCIPALES
POST /api/auth/login -> Autenticación JWT (Simulada) GET /api/productos -> Obtener catálogo POST /api/pedidos -> Generar orden de compra DELETE /api/pedidos/{id} -> Eliminar pedido y devolver stock PUT /api/pedidos/{id}/estado -> Cambiar estado (Facturación)
________________________________________
AUTOR
Chavez Santiago Ezequiel Institución: UTN Avellaneda - Tecnicatura Universitaria en Programación
