import os

# Extensiones de archivos que queremos leer (ajusta según tu proyecto)
extensiones_validas = [
    ".py",
    ".js",
    "jsx",
    ".ts",
    ".tsx",
    ".html",
    ".css",
    ".json",
    ".java",
    ".c",
    ".cpp",
    ".h",
]
# Carpetas a ignorar
carpetas_ignoradas = [
    "node_modules",
    ".git",
    "__pycache__",
    "dist",
    "build",
    "venv",
    "env",
]

nombre_salida = "PROYECTO_COMPLETO.txt"

with open(nombre_salida, "w", encoding="utf-8") as outfile:
    for root, dirs, files in os.walk("."):
        # Filtrar carpetas ignoradas
        dirs[:] = [d for d in dirs if d not in carpetas_ignoradas]

        for file in files:
            if any(file.endswith(ext) for ext in extensiones_validas):
                ruta_completa = os.path.join(root, file)
                # Escribir separador y nombre del archivo
                outfile.write(f"\n{'=' * 50}\n")
                outfile.write(f"ARCHIVO: {ruta_completa}\n")
                outfile.write(f"{'=' * 50}\n")

                # Escribir contenido
                try:
                    with open(ruta_completa, "r", encoding="utf-8") as infile:
                        outfile.write(infile.read())
                except Exception as e:
                    outfile.write(f"[Error leyendo archivo: {e}]\n")

print(f"¡Listo! Sube el archivo '{nombre_salida}' al chat.")
