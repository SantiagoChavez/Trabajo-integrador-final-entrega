package com.entregaFinal.gestion.repository;

import com.entregaFinal.gestion.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<Pedido, Integer> {
}
