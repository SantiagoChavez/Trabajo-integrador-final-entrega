package com.entregaFinal.gestion.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.entregaFinal.gestion.model.Pedido;
import com.entregaFinal.gestion.service.JsonStorageService;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class PedidoRepository {

    private final JsonStorageService<Pedido> jsonStorage;
    private static final String FILE_NAME = "pedidos.json";

    public PedidoRepository(JsonStorageService<Pedido> jsonStorage) {
        this.jsonStorage = jsonStorage;
    }

    public List<Pedido> findAll() {
        return jsonStorage.readAll(FILE_NAME, new TypeReference<List<Pedido>>() {});
    }

    public Optional<Pedido> findById(Integer id) {
        return findAll().stream()
                .filter(p -> p.getId().equals(id))
                .findFirst();
    }

    public Pedido save(Pedido pedido) {
        List<Pedido> pedidos = findAll();

        if (pedido.getId() == null) {
            Integer nuevoId = jsonStorage.generateId(pedidos, Pedido::getId);
            pedido.setId(nuevoId);
            pedidos.add(pedido);
        } else {
            pedidos.removeIf(p -> p.getId().equals(pedido.getId()));
            pedidos.add(pedido);
        }

        jsonStorage.saveAll(FILE_NAME, pedidos);
        return pedido;
    }

    public void deleteById(Integer id) {
        List<Pedido> pedidos = findAll();
        pedidos.removeIf(p -> p.getId().equals(id));
        jsonStorage.saveAll(FILE_NAME, pedidos);
    }

    public boolean existsById(Integer id) {
        return findById(id).isPresent();
    }
}