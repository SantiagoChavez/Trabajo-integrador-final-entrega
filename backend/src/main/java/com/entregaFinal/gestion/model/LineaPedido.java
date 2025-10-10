package com.entregaFinal.gestion.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class LineaPedido {

    private Integer id;
    private String productoId;  // ✅ CAMBIAR de Integer a String
    private String productoNombre;
    private Double productoPrecio;
    private Integer cantidad;

    // Constructores
    public LineaPedido() {
    }

    public LineaPedido(Integer id, String productoId, String productoNombre,
                       Double productoPrecio, Integer cantidad) {
        this.id = id;
        this.productoId = productoId;
        this.productoNombre = productoNombre;
        this.productoPrecio = productoPrecio;
        this.cantidad = cantidad;
    }

    // Getters y Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getProductoId() { return productoId; }  // ✅ CAMBIAR retorno a String
    public void setProductoId(String productoId) { this.productoId = productoId; }  // ✅ CAMBIAR parámetro a String

    public String getProductoNombre() { return productoNombre; }
    public void setProductoNombre(String productoNombre) { this.productoNombre = productoNombre; }

    public Double getProductoPrecio() { return productoPrecio; }
    public void setProductoPrecio(Double productoPrecio) { this.productoPrecio = productoPrecio; }

    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }

    // Método útil para calcular el subtotal
    public Double getSubtotal() {
        return productoPrecio * cantidad;
    }
}