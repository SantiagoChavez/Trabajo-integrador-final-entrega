package com.entregaFinal.gestion.service;

import com.entregaFinal.gestion.model.Pedido;
import com.entregaFinal.gestion.model.LineaPedido;
import com.entregaFinal.gestion.repository.PedidoRepository;
import com.entregaFinal.gestion.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ProductoRepository productoRepository;

    public Pedido createPedido(Pedido pedido) {
        double total = 0;

        for (LineaPedido linea : pedido.getLineas()) {
            Integer productoId = linea.getProducto().getId();
            var productoOptional = productoRepository.findById(productoId);

            if (productoOptional.isPresent()) {
                var productoCompleto = productoOptional.get();
                linea.setProducto(productoCompleto);  // seteamos el producto completo
                total += productoCompleto.getPrecio() * linea.getCantidad();
            } else {
                throw new RuntimeException("Producto con ID " + productoId + " no encontrado");
            }

            linea.setPedido(pedido); // Asociamos el pedido a cada línea
        }

        pedido.setTotal(total);
        return pedidoRepository.save(pedido);
    }
    public List<Pedido> getAllPedidos() {
        return pedidoRepository.findAll();
    }

}

