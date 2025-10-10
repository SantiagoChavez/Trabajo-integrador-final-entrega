package com.entregaFinal.gestion.repository;

import com.entregaFinal.gestion.model.Producto;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoRepository extends MongoRepository<Producto, String> {
    // Spring Data Mongo se encarga de:
    // findAll(), findById(String id), save(Producto producto), deleteById(String id), existsById(String id)

    // Si querés, podés agregar consultas personalizadas:
    // List<Producto> findByCategoria(String categoria);
}
