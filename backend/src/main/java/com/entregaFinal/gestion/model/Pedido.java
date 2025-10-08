package com.entregaFinal.gestion.model;

import java.util.*;

public class Pedido {

    private Integer id;
    private Date fecha = new Date();
    private String estado;
    private Double total;
    private List<LineaPedido> lineas;

    // Constructores
    public Pedido() {
        this.lineas = new ArrayList<>();
    }

    public Pedido(Integer id, Date fecha, String estado, Double total, List<LineaPedido> lineas) {
        this.id = id;
        this.fecha = fecha;
        this.estado = estado;
        this.total = total;
        this.lineas = lineas != null ? lineas : new ArrayList<>();
    }

    // Getters y Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Date getFecha() { return fecha; }
    public void setFecha(Date fecha) { this.fecha = fecha; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public Double getTotal() { return total; }
    public void setTotal(Double total) { this.total = total; }

    public List<LineaPedido> getLineas() { return lineas; }
    public void setLineas(List<LineaPedido> lineas) { this.lineas = lineas; }
}