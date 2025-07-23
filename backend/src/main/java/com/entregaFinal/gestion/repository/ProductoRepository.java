package com.entregaFinal.gestion.repository;

import com.entregaFinal.gestion.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Integer> {
}
