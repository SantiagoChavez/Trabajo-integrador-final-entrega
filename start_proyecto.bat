@echo off
title Arranque del Proyecto Fullstack

echo -------------------------------
echo Iniciando Backend (Spring Boot)...
echo -------------------------------
start cmd /k "cd /d C:\TalentoTech\Trabajo-entregaFinal\backend && mvn spring-boot:run"

timeout /t 10 /nobreak > nul

echo -------------------------------
echo Iniciando Frontend (React/Vite)...
echo -------------------------------
start cmd /k "cd /d C:\TalentoTech\Trabajo-entregaFinal\frontend && npm run dev"

timeout /t 10 /nobreak > nul

echo -------------------------------
echo Abriendo navegador en el frontend...
echo -------------------------------
start http://localhost:5176

echo Listo! Backend y Frontend arrancados.
pause
