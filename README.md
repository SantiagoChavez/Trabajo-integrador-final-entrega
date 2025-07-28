\# Trabajo Integrador Final - Backend en Java



Este proyecto es una aplicación web fullstack desarrollada como entrega final del curso \*\*Backend en Java\*\*.  

Consiste en un sistema de gestión de productos y pedidos, utilizando un backend en Spring Boot y un frontend en React con Vite.



---



\## Estructura del Proyecto



```

Trabajo-entregaFinal/

│

├── backend/      # Backend con Spring Boot

└── frontend/     # Frontend con React + Vite

```



---



\## Tecnologías utilizadas



\### Backend

\- Java 24

\- Spring Boot

\- Spring Data JPA

\- H2 Database

\- Maven



\### Frontend

\- React

\- Vite

\- Fetch API

\- HTML, CSS



---



\## Funcionalidades implementadas



\### 📦 Productos

\- Listar todos los productos

\- Agregar nuevos productos

\- Eliminar productos existentes

\- Control de stock automático al generar pedidos



\### 🛒 Carrito y Pedidos

\- Agregar productos al carrito

\- Crear pedidos a partir del carrito

\- Validación de stock antes de confirmar pedido

\- Visualización del historial de pedidos

\- Cálculo automático de totales



\### 🧭 Navegación

\- Navegación entre secciones con React Router

&nbsp; - Inicio

&nbsp; - Productos

&nbsp; - Categorías (estructura lista para extender)

&nbsp; - Carrito

&nbsp; - Pedidos (historial)



---



\## Cómo ejecutar el proyecto



\### Backend (Spring Boot)



1\. Abrir el proyecto en IntelliJ IDEA o IDE compatible

2\. Ejecutar la clase `PreentregaJavaGestionApplication.java`

3\. La API REST estará disponible en:  

&nbsp;  `http://localhost:8080/api/productos`  

&nbsp;  `http://localhost:8080/api/pedidos`



\### Frontend (React + Vite)



1\. Entrar en la carpeta `frontend/`

2\. Instalar dependencias:

&nbsp;  ```bash

&nbsp;  npm install

&nbsp;  ```

3\. Ejecutar el servidor de desarrollo:

&nbsp;  ```bash

&nbsp;  npm run dev

&nbsp;  ```

4\. Acceder a: `http://localhost:5176



---



\## Base de Datos



Se utiliza una base en memoria H2, que se reinicia en cada ejecución.  

Podés acceder a la consola de H2 en:  

`http://localhost:8080/h2-console`  

(JDBC URL: `jdbc:h2:mem:testdb`)



---





\## Autor

Chavez Santiago Ezequiel



Desarrollado como entrega final del curso Backend en java

