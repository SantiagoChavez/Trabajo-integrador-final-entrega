package com.entregaFinal.gestion.service;

import com.entregaFinal.gestion.model.Producto;
import com.entregaFinal.gestion.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    public List<Producto> getAllProductos() {
        return productoRepository.findAll();
    }

    public Optional<Producto> getProductoById(String id) {
        if (id == null) {
            return Optional.empty();
        }
        return productoRepository.findById(id);
    }

    public Producto addProducto(Producto producto) {
        String id = producto.getId();
        if (id != null && productoRepository.existsById(id)) {
            return null; // No se puede agregar un producto con un ID que ya existe
        }
        return productoRepository.save(producto);
    }

    public Producto updateProducto(String id, Producto producto) {
        if (id == null) {
            return null;
        }
        if (productoRepository.existsById(id)) {
            producto.setId(id);
            return productoRepository.save(producto);
        }
        return null;
    }

    public boolean deleteProducto(String id) {
        if (id == null) {
            return false;
        }

        if (productoRepository.existsById(id)) {
            productoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
