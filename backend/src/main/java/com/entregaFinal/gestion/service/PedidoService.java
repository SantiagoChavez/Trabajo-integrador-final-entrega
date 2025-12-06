package com.entregaFinal.gestion.service;

import com.entregaFinal.gestion.exception.StockInsuficienteException; // Asegúrate de importar tu excepción
import com.entregaFinal.gestion.model.Pedido;
import com.entregaFinal.gestion.model.LineaPedido;
import com.entregaFinal.gestion.model.Producto;
import com.entregaFinal.gestion.repository.PedidoRepository;
import com.entregaFinal.gestion.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // Importante para bases de datos, aunque en Mongo funciona distinto, es buena práctica

import java.util.ArrayList;
import java.util.List;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;
    @Autowired
    private ProductoRepository productoRepository;

    // @Transactional // Descomentar si usaras SQL relacional, en Mongo se maneja diferente pero el concepto aplica
    public Pedido createPedido(Pedido pedido) {
        double total = 0;
        List<LineaPedido> lineasActualizadas = new ArrayList<>();

        for (LineaPedido linea : pedido.getLineas()) {
            String productoId = linea.getProductoId();
            // Buscamos el producto
            Producto producto = productoRepository.findById(productoId)
                    .orElseThrow(() -> new RuntimeException("Producto con ID " + productoId + " no encontrado"));

            // 1. Validar Stock en el Backend (Seguridad)
            if (producto.getStock() < linea.getCantidad()) {
                throw new StockInsuficienteException("No hay stock suficiente para: " + producto.getNombre());
            }

            // 2. Actualizar datos de la línea (Precio y Nombre actuales)
            linea.setProductoNombre(producto.getNombre());
            linea.setProductoPrecio(producto.getPrecio());
            
            // 3. RESTAR STOCK Y GUARDAR EL PRODUCTO
            producto.setStock(producto.getStock() - linea.getCantidad());
            productoRepository.save(producto); // <--- ¡ESTO FALTABA!

            // Calcular subtotal
            total += linea.getSubtotal();
            lineasActualizadas.add(linea);
        }

        pedido.setLineas(lineasActualizadas);
        pedido.setTotal(total);
        pedido.setEstado("PENDIENTE");
        return pedidoRepository.save(pedido);
    }

    public List<Pedido> getAllPedidos() {
        return pedidoRepository.findAll();
    }

    // Método para cambiar el estado (FACTURADO, DESPACHADO, etc.)
    public Pedido updateEstado(String id, String nuevoEstado) {
        return pedidoRepository.findById(id).map(pedido -> {
            pedido.setEstado(nuevoEstado);
            return pedidoRepository.save(pedido);
        }).orElseThrow(() -> new RuntimeException("Pedido no encontrado"));
    }
}