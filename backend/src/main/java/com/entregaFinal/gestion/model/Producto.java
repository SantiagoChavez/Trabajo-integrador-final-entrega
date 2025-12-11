package com.entregaFinal.gestion.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "productos")
public class Producto {

    @Id
    private String id;
    
    private String nombre;
    private String marca;  // <--- 1. NUEVO CAMPO
    private String descripcion;
    private Double precio;
    private String categoria;
    private String imagenUrl;
    private Integer stock;

    public Producto() {}

    // 2. ACTUALIZAR CONSTRUCTOR
    public Producto(String nombre, String marca, String descripcion, Double precio,
                    String categoria, String imagenUrl, Integer stock) {
        this.nombre = nombre;
        this.marca = marca; // <--- ASIGNAR
        this.descripcion = descripcion;
        this.precio = precio;
        this.categoria = categoria;
        this.imagenUrl = imagenUrl;
        this.stock = stock;
    }
    // Getters y Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getMarca() { return marca; }
    public void setMarca(String marca) { this.marca = marca; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public Double getPrecio() { return precio; }
    public void setPrecio(Double precio) { this.precio = precio; }

    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }

    public String getImagenUrl() { return imagenUrl; }
    public void setImagenUrl(String imagenUrl) { this.imagenUrl = imagenUrl; }

    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }
}
