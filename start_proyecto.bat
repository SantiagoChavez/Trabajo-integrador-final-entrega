@echo off
title Arranque del Proyecto Fullstack

echo -------------------------------
echo Iniciando ejecutable de MongoDB...
echo -------------------------------

:: ¡¡IMPORTANTE!!
:: Ajusta estas dos rutas (paths) a las de tu computadora.
set MONGO_PATH="C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe"
set DB_PATH="C:\data\db"

:: Asegúrate que la carpeta en DB_PATH (ej: C:\data\db) exista
start "MongoDB Server" %MONGO_PATH% --dbpath %DB_PATH%
timeout /t 2 /nobreak > nul

echo -------------------------------
echo Iniciando Backend (Spring Boot)...
echo -------------------------------
:: MODIFICADO: Se agrega > nul 2>&1 para descartar la salida
start /B "Backend" cmd /c "cd /d C:\TalentoTech\Trabajo-entregaFinal\backend && mvn spring-boot:run > nul 2>&1"

timeout /t 5 /nobreak > nul

echo -------------------------------
echo Iniciando Frontend (React/Vite)...
echo -------------------------------
:: MODIFICADO: Se agrega > nul 2>&1 para descartar la salida
start /B "Frontend" cmd /c "cd /d C:\TalentoTech\Trabajo-entregaFinal\frontend && npm run dev > nul 2>&1"

timeout /t 3 /nobreak > nul

echo -------------------------------
echo Abriendo navegador en el frontend...
echo -------------------------------
start http://localhost:5176

echo Listo! MongoDB, Backend y Frontend arrancados.