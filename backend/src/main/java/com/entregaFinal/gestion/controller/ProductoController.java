package com.entregaFinal.gestion.controller;

import com.entregaFinal.gestion.model.Producto;
import com.entregaFinal.gestion.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    @GetMapping
    public List<Producto> getAllProductos() {
        return productoService.getAllProductos();
    }

    @GetMapping("/{id}")
    public Optional<Producto> getProductoById(@PathVariable Integer id) {
        return productoService.getProductoById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Producto addProducto(@RequestBody Producto producto) {
        return productoService.addProducto(producto);
    }

    @PutMapping("/{id}")
    public Producto updateProducto(@PathVariable Integer id, @RequestBody Producto producto) {
        return productoService.updateProducto(id, producto);
    }

    @DeleteMapping("/{id}")
    public boolean deleteProducto(@PathVariable Integer id) {
        return productoService.deleteProducto(id);
    }
}
