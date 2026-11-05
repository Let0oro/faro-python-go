---
title: Roadmap
description: Ruta sugerida de aprendizaje desde Python hasta servicios y seguridad en Go.
sidebar:
  order: 2
---

## Ruta sugerida

| Bloque | Duración | Objetivo |
| --- | --- | --- |
| Laboratorio y entorno | 1–2 días | Preparar Python, Go y un flujo de pruebas reproducible |
| Python: procesos | 1 semana | Leer `/proc`, extraer metadata y manejar errores |
| Python: árboles y salud | 1 semana | Construir jerarquías y detectar estados raros |
| Go: fundamentos | 3–4 días | Tipos, control de flujo, errores y tests |
| Go: concurrencia y red | 1 semana | Goroutines, channels, HTTP, timeout y `-race` |
| Seguridad defensiva | 1 semana | Validación, errores útiles y aislamiento del entorno |
| Proyecto final | 1–2 semanas | Servicio local con pruebas, logs y seguimiento de estado |

## Objetivos de dominio

### Python

- leer información del sistema de forma estable y segura;
- crear snapshots bastante buenos para diagnosticar procesos;
- detectar datos incompletos o inconsistentes;
- explicar qué puedes concluir y qué no.

### Go

- construir servicios pequeños con un contrato claro;
- manejar concurrencia y cancelación de manera cooperativa;
- aplicar límites y timeouts de red;
- validar y documentar errores antes de desplegar.

### Seguridad defensiva

- no confiar ciegamente en la entrada;
- aislar el entorno de pruebas;
- nunca revelar secretos ni datos del sistema en errores;
- diseñar programas que fallen de forma explícita y controlada.

## Recomendación de ritmo

Para una semana laboral:

- 2–3 horas de lectura activa;
- 2–3 horas de práctica de código;
- 1 hora de pruebas y documentación;
- 30–60 minutos de revisión y autoexplicación.

Si empiezas desde cero, prioriza el laboratorio y los niveles básicos antes de acelerar.