
CREATE DATABASE IF NOT EXISTS preentrega_db;
USE preentrega_db;

CREATE TABLE IF NOT EXISTS producto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DOUBLE NOT NULL,
    categoria VARCHAR(100),
    imagen_url TEXT,
    stock INT NOT NULL
);

CREATE TABLE IF NOT EXISTS pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(50),
    total DOUBLE
);

CREATE TABLE IF NOT EXISTS linea_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT,
    producto_id INT,
    cantidad INT,
    FOREIGN KEY (pedido_id) REFERENCES pedido(id),
    FOREIGN KEY (producto_id) REFERENCES producto(id)
);
