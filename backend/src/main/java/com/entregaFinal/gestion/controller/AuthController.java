package com.entregaFinal.gestion.controller;

import com.entregaFinal.gestion.model.Usuario;
import com.entregaFinal.gestion.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Endpoint para Login
    @PostMapping("/login")
    public Usuario login(@RequestBody Map<String, String> credenciales) {
        String username = credenciales.get("username");
        String password = credenciales.get("password");

        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (usuario.getPassword().equals(password)) {
            return usuario; // Login exitoso, devolvemos el usuario con su rol
        } else {
            throw new RuntimeException("Contraseña incorrecta");
        }
    }

    // Endpoint para registrarse (Para que puedas crear usuarios)
    @PostMapping("/registro")
    public Usuario registrar(@RequestBody Usuario usuario) {
        if (usuarioRepository.findByUsername(usuario.getUsername()).isPresent()) {
            throw new RuntimeException("El usuario ya existe");
        }
        // Por defecto rol USER si no se especifica
        if (usuario.getRol() == null) {
            usuario.setRol("USER");
        }
        return usuarioRepository.save(usuario);
    }
}