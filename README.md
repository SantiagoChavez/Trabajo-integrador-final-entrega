\# Trabajo Integrador Final - Talento Tech



Este proyecto es una aplicación web fullstack desarrollada como entrega final del curso \*\*Talento Tech\*\*. Consiste en un sistema de gestión de productos y pedidos, con un backend en Spring Boot y un frontend en React.



---



\##  Estructura del Proyecto



Trabajo-entregaFinal/

├── backend/ # Backend con Spring Boot

└── frontend/ # Frontend con React + Vite



yaml

Copiar

Editar



---



\##  Tecnologías utilizadas



\### Backend

\- Java 17+

\- Spring Boot

\- Spring Data JPA

\- H2 Database

\- Maven



\### Frontend

\- React

\- Vite

\- Axios

\- HTML + CSS



---



\##  Cómo ejecutar el proyecto



\### 1. Clonar el repositorio



```bash

git clone git@github.com:SantiagoChavez/Trabajo-integrador-final-entrega.git

cd Trabajo-integrador-final-entrega

2\. Ejecutar el backend

bash

Copiar

Editar

cd backend

mvn clean install

mvn spring-boot:run

La API se ejecutará en: http://localhost:8080



3\. Ejecutar el frontend

bash

Copiar

Editar

cd ../frontend

npm install

npm run dev

La app se abrirá en: http://localhost:5173



&nbsp;Endpoints disponibles

GET /api/productos - Lista de productos



POST /api/productos - Crear nuevo producto



POST /api/pedidos - Crear nuevo pedido



etc.



&nbsp;Podés modificar los endpoints según la configuración de tus controladores.



&nbsp;Autor

Santiago Chavez - GitHub





