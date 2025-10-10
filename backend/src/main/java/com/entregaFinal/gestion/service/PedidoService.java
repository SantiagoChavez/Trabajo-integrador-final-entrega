package com.entregaFinal.gestion.service;

import com.entregaFinal.gestion.model.Pedido;
import com.entregaFinal.gestion.model.LineaPedido;
import com.entregaFinal.gestion.model.Producto;
import com.entregaFinal.gestion.repository.PedidoRepository;
import com.entregaFinal.gestion.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ProductoRepository productoRepository;

    public Pedido createPedido(Pedido pedido) {
        double total = 0;
        List<LineaPedido> lineasActualizadas = new ArrayList<>();

        for (LineaPedido linea : pedido.getLineas()) {
            String productoId = linea.getProductoId();
            var productoOptional = productoRepository.findById(productoId);

            if (productoOptional.isPresent()) {
                Producto producto = productoOptional.get();

                linea.setProductoNombre(producto.getNombre());
                linea.setProductoPrecio(producto.getPrecio());

                total += linea.getSubtotal();

                lineasActualizadas.add(linea);
            } else {
                throw new RuntimeException("Producto con ID " + productoId + " no encontrado");
            }
        }

        pedido.setLineas(lineasActualizadas);
        pedido.setTotal(total);
        pedido.setEstado("PENDIENTE");

        return pedidoRepository.save(pedido);
    }

    public List<Pedido> getAllPedidos() {
        return pedidoRepository.findAll();
    }
}