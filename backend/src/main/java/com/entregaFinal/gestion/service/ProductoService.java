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
        return productoRepository.findById(id);
    }

    public Producto addProducto(Producto producto) {
        return productoRepository.save(producto);
    }

    public Producto updateProducto(String id, Producto productoActualizado) {
        return productoRepository.findById(id).map(productoExistente -> {
            // Actualizamos campo por campo solo si el dato que llega no es null
            
            if(productoActualizado.getNombre() != null) 
                productoExistente.setNombre(productoActualizado.getNombre());
            
            if(productoActualizado.getDescripcion() != null) 
                productoExistente.setDescripcion(productoActualizado.getDescripcion());
            
            if(productoActualizado.getPrecio() != null) 
                productoExistente.setPrecio(productoActualizado.getPrecio());
            
            if(productoActualizado.getCategoria() != null) 
                productoExistente.setCategoria(productoActualizado.getCategoria());
            
            if(productoActualizado.getStock() != null) 
                productoExistente.setStock(productoActualizado.getStock());
            
            // Agregado para soportar la edición de imagen que hicimos en el Frontend
            if(productoActualizado.getImagenUrl() != null) 
                productoExistente.setImagenUrl(productoActualizado.getImagenUrl());

            return productoRepository.save(productoExistente);
        }).orElse(null);
    }

    public boolean deleteProducto(String id) {
        if (productoRepository.existsById(id)) {
            productoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}