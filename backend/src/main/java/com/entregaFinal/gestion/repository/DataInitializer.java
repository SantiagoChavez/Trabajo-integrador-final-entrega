package com.entregaFinal.gestion.repository; // <--- CAMBIO AQUÍ

import com.entregaFinal.gestion.model.Usuario;
// Nota: Ya no hace falta importar UsuarioRepository porque estamos en la misma carpeta
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;

    public DataInitializer(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("🔄 Verificando usuarios iniciales...");

        // 1. Crear ADMIN si no existe
        if (usuarioRepository.findByUsername("admin").isEmpty()) {
            Usuario admin = new Usuario("admin", "1234", "ADMIN");
            usuarioRepository.save(admin);
            System.out.println("✅ USUARIO ADMIN CREADO: admin / 1234");
        } else {
            System.out.println("👌 El usuario admin ya existe.");
        }

        // 2. Crear CLIENTE de prueba si no existe
        if (usuarioRepository.findByUsername("cliente").isEmpty()) {
            Usuario user = new Usuario("cliente", "1234", "USER");
            usuarioRepository.save(user);
            System.out.println("✅ USUARIO CLIENTE CREADO: cliente / 1234");
        }
    }
}