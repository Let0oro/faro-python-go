---
title: "Capstone final"
description: Proyecto integrado de laboratorio con servicio local, diagnóstico y revisión final.
sidebar:
  order: 1
---

## Proyecto final: caja negra local

La última misión es un servicio pequeño que se ejecuta en tu máquina con pruebas locales. Debe:

- escuchar en `127.0.0.1` o `localhost`;
- ofrecer una API pequeña con rutas de estado y gestión;
- registrar eventos con un nivel claro;
- responder con errores controlados y sin filtrar internos;
- permitir una comprobación de salud, una petición breve y una cancelación ordenada.

## Requisitos mínimos

1. **Servicio HTTP** con endpoints `GET /healthz` y `POST /task`.
2. **Límites** de cuerpo y contenido JSON validado.
3. **Procesos** o tareas con timeout y con manejo de errores `context`.
4. **Observabilidad**: registro simple por nivel y resumen de logs.
5. **Documentación**: README, flujo de ejecución y pruebas que puedas explicar.

## Entregables

- código fuente + README;
- tests propios para el servicio;
- un resumen de 1–2 páginas con:
  - qué hace el sistema;
  - qué errores maneja;
  - qué no verifica;
  - qué prueba ran y por qué está bien.

## Rúbrica

- Correctitud: 40%
- Manejo de errores y timeouts: 25%
- Seguridad local y aislamiento: 20%
- Claridad de código y documentación: 15%

## Qué debe demostrar tu proyecto

- saber separar servicio, lógica y diagnóstico;
- poder explicar qué parte es observación y qué parte es inferencia;
- mantener el entorno local y no tocar sistemas ajenos;
- presentar evidencia de pruebas reales y casos límite.

> Si puedes soportar que el programa falle de forma útil y documentada, ya estás entrenando pensamiento defensivo, no solo solución rápida.
