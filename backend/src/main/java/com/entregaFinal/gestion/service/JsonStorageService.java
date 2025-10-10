package com.entregaFinal.gestion.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class JsonStorageService<T> {

    private final ObjectMapper objectMapper;
    private final String dataDirectory = "datos/";

    public JsonStorageService() {
        this.objectMapper = new ObjectMapper();
        this.objectMapper.enable(SerializationFeature.INDENT_OUTPUT);

        try {
            Files.createDirectories(Paths.get(dataDirectory));
        } catch (IOException e) {
            throw new RuntimeException("Error creando carpeta de datos", e);
        }
    }

    public List<T> readAll(String fileName, TypeReference<List<T>> typeRef) {
        File file = new File(dataDirectory + fileName);

        if (!file.exists()) {
            return new ArrayList<>();
        }

        try {
            return objectMapper.readValue(file, typeRef);
        } catch (IOException e) {
            throw new RuntimeException("Error leyendo archivo: " + fileName, e);
        }
    }

    public void saveAll(String fileName, List<T> data) {
        File file = new File(dataDirectory + fileName);

        try {
            objectMapper.writeValue(file, data);
        } catch (IOException e) {
            throw new RuntimeException("Error guardando archivo: " + fileName, e);
        }
    }

    public String generateId(List<T> items, java.util.function.Function<T, String> idExtractor) {
        return UUID.randomUUID().toString();
    }
}