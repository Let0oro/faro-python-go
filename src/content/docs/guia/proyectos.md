---
title: Proyectos del campus
description: Entregas progresivas para construir un portfolio de herramientas de sistemas en Python y Go.
sidebar:
  order: 3
---

# Proyectos del campus

Los proyectos reúnen varias lecciones en una entrega verificable. Cada uno se puede realizar en una carpeta independiente; usa Git y datos sintéticos, y documenta cómo ejecutar las pruebas.

## Proyecto 1 · Faro de procesos

**Lenguaje:** Python · **Niveles:** Procview y árbol de procesos · **Tamaño:** 4–6 horas

Construye una CLI que lea snapshots desde fixtures o desde `/proc` de tu propia máquina y genere JSON con procesos disponibles y errores por PID.

**Entregables**
- parser separado de lectura y CLI;
- fixtures de procesos con nombres que contienen espacios y datos incompletos;
- tests para PID inválido, proceso desaparecido y orden determinista;
- README que explique los límites de un snapshot.

**Criterio de aceptación:** un dato no disponible no hace desaparecer del informe los datos válidos ni provoca un traceback sin controlar.

## Proyecto 2 · Archivista de laboratorio

**Lenguaje:** Python · **Niveles:** procesos hijos, integridad de archivos y diagnóstico de logs · **Tamaño:** 6–8 horas

Crea una herramienta que genere un manifiesto SHA-256 de una carpeta de fixtures y un resumen de sus logs sintéticos. No sigue enlaces simbólicos, no modifica archivos y produce resultados deterministas.

**Entregables**
- hash calculado por bloques;
- resumen de logs con líneas inválidas contabilizadas;
- tests con archivo vacío, fixture grande, enlace simbólico y log malformado;
- salida JSON o Markdown y explicación de qué demuestra un hash y qué no.

**Criterio de aceptación:** dos ejecuciones sin cambios producen el mismo manifiesto, y el análisis no lee fuera del directorio de fixtures.

## Proyecto 3 · Servicio de trabajos local

**Lenguaje:** Go · **Niveles:** pool de trabajadores, servicio local y HTTP robusto · **Tamaño:** 8–12 horas

Implementa un servicio para procesar trabajos sintéticos en memoria. Limita la concurrencia, valida las peticiones, permite cancelación cooperativa y escucha solo en `127.0.0.1`.

**Entregables**
- handler comprobado con `httptest`;
- límites de tamaño y tiempos documentados;
- pruebas con `go test -race ./...`;
- apagado ordenado y logs que no expongan datos sensibles.

**Criterio de aceptación:** el máximo de trabajos en vuelo nunca supera el límite y la cancelación no deja goroutines del servicio bloqueadas.

## Proyecto 4 · Caja negra local

**Lenguajes:** Python y Go · **Niveles:** todos · **Tamaño:** 1–2 semanas

Integra un recolector local de eventos sintéticos, un proceso de análisis Python y un servicio Go para exponer un estado resumido. Define un formato de intercambio pequeño, versionado y con tamaño máximo.

**Entregables**
- contrato de mensajes y ejemplos de fixtures;
- lector Python, servidor Go y pruebas unitarias/de integración;
- timeouts, errores explícitos y cierre limpio;
- guía de reproducción desde un checkout vacío;
- informe de revisión con limitaciones, riesgos y decisiones.

**Criterio de aceptación:** todo funciona sin Internet, sin privilegios de administrador y sin conexiones a hosts distintos de loopback.

## Presentación de cada proyecto

Usa la [rúbrica de evaluación](/guia/evaluacion/) y adjunta tres evidencias: salida de tests, una ejecución reproducible y una nota breve de decisiones. No subas logs reales, tokens, dumps privados ni capturas con datos personales.
