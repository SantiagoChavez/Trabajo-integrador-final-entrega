package com.entregaFinal.gestion.controller;

import com.entregaFinal.gestion.model.Pedido;
import com.entregaFinal.gestion.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Pedido createPedido(@RequestBody Pedido pedido) {
        System.out.println("===== PEDIDO RECIBIDO =====");
        System.out.println("Estado: " + pedido.getEstado());
        System.out.println("Fecha: " + pedido.getFecha());
        System.out.println("Total: " + pedido.getTotal());
        if (pedido.getLineas() != null) {
            for (int i = 0; i < pedido.getLineas().size(); i++) {
                System.out.println("Línea " + (i + 1));
                System.out.println(" - Producto ID: " + pedido.getLineas().get(i).getProductoId());
                System.out.println(" - Cantidad: " + pedido.getLineas().get(i).getCantidad());
            }
        } else {
            System.out.println("No hay líneas de pedido.");
        }
        return pedidoService.createPedido(pedido);
    }

    @GetMapping
    public List<Pedido> getAllPedidos() {
        return pedidoService.getAllPedidos();
    }
}