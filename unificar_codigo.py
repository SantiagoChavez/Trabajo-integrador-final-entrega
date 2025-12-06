import os

# Extensiones de archivos que queremos leer
extensiones_validas = [
    ".py",
    ".js",
    ".jsx",  # Agregado el punto
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
    ".vscode",  # Agregado por si acaso
    "__pycache__",
    "dist",
    "build",
    "venv",
    "env",
]

# Archivos específicos a ignorar (para que no se lea a sí mismo ni basura)
archivos_ignorados_especificos = [
    "unificar_codigo.py",  # Tu script
    "package-lock.json",  # Archivo gigante innecesario
    "PROYECTO_COMPLETO.txt",  # El archivo de salida (por seguridad)
]

nombre_salida = "PROYECTO_COMPLETO.txt"

# Obtenemos el nombre de este script automáticamente para ignorarlo
nombre_script_actual = os.path.basename(__file__)
archivos_ignorados_especificos.append(nombre_script_actual)

with open(nombre_salida, "w", encoding="utf-8") as outfile:
    for root, dirs, files in os.walk("."):
        # Filtrar carpetas ignoradas
        dirs[:] = [d for d in dirs if d not in carpetas_ignoradas]

        for file in files:
            # 1. Verificar si el archivo está en la lista negra específica
            if file in archivos_ignorados_especificos:
                continue

            # 2. Verificar extensión
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

print(f"¡Listo! Archivo generado: {nombre_salida}")
