package com.entregaFinal.gestion.model;

public class LineaPedido {

    private Integer id;
    private Integer productoId;  // Solo guardamos el ID del producto
    private String productoNombre;  // Para mostrar en el pedido
    private Double productoPrecio;  // Precio al momento de la compra
    private Integer cantidad;

    // Constructores
    public LineaPedido() {
    }

    public LineaPedido(Integer id, Integer productoId, String productoNombre,
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

    public Integer getProductoId() { return productoId; }
    public void setProductoId(Integer productoId) { this.productoId = productoId; }

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