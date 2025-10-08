package com.entregaFinal.gestion.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.entregaFinal.gestion.model.Producto;
import com.entregaFinal.gestion.service.JsonStorageService;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class ProductoRepository {

    private final JsonStorageService<Producto> jsonStorage;
    private static final String FILE_NAME = "productos.json";

    public ProductoRepository(JsonStorageService<Producto> jsonStorage) {
        this.jsonStorage = jsonStorage;
    }

    public List<Producto> findAll() {
        return jsonStorage.readAll(FILE_NAME, new TypeReference<List<Producto>>() {});
    }

    public Optional<Producto> findById(Integer id) {
        return findAll().stream()
                .filter(p -> p.getId().equals(id))
                .findFirst();
    }

    public Producto save(Producto producto) {
        List<Producto> productos = findAll();

        if (producto.getId() == null) {
            Integer nuevoId = jsonStorage.generateId(productos, Producto::getId);
            producto.setId(nuevoId);
            productos.add(producto);
        } else {
            productos.removeIf(p -> p.getId().equals(producto.getId()));
            productos.add(producto);
        }

        jsonStorage.saveAll(FILE_NAME, productos);
        return producto;
    }

    public void deleteById(Integer id) {
        List<Producto> productos = findAll();
        productos.removeIf(p -> p.getId().equals(id));
        jsonStorage.saveAll(FILE_NAME, productos);
    }

    public boolean existsById(Integer id) {
        return findById(id).isPresent();
    }
}