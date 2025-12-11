package com.entregaFinal.gestion.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.*;

@Document(collection = "pedidos")
public class Pedido {

    @Id
    private String id;
    
    // 1. AGREGAMOS EL CAMPO QUE FALTABA
    private String usuarioId; 
    
    private Date fecha = new Date();
    private String estado;
    private Double total;
    private List<LineaPedido> lineas;

    public Pedido() {
        this.lineas = new ArrayList<>();
    }

    // 2. ACTUALIZAMOS EL CONSTRUCTOR
    public Pedido(String id, String usuarioId, Date fecha, String estado, Double total, List<LineaPedido> lineas) {
        this.id = id;
        this.usuarioId = usuarioId; // <--- Asignamos
        this.fecha = fecha;
        this.estado = estado;
        this.total = total;
        this.lineas = lineas != null ? lineas : new ArrayList<>();
    }

    // Getters y Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    // 3. GETTER Y SETTER PARA EL NUEVO CAMPO
    public String getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(String usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public List<LineaPedido> getLineas() {
        return lineas;
    }

    public void setLineas(List<LineaPedido> lineas) {
        this.lineas = lineas;
    }
}