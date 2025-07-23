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
            total += linea.getProducto().getPrecio() * linea.getCantidad();
        }
        pedido.setTotal(total);
        return pedidoRepository.save(pedido);
    }

    public List<Pedido> getAllPedidos() {
        return pedidoRepository.findAll();
    }
}
