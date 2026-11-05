---
title: Roadmap
description: Ruta sugerida de aprendizaje desde Python hasta servicios y seguridad en Go.
sidebar:
  order: 2
---

## Ruta sugerida

| Bloque | Duración | Objetivo | Lecciones |
| --- | --- | --- | --- |
| Laboratorio y entorno | 1–2 días | Preparar Python, Go y un flujo de pruebas reproducible | [Laboratorio](/faro-python-go/python/00-laboratorio/) |
| Python: procesos | 1 semana | Leer snapshots, modelar procesos y ejecutar hijos con límites | [Procview](/faro-python-go/python/01-procview/), [Árbol](/faro-python-go/python/02-arbol-de-procesos/), [Procesos hijos](/faro-python-go/python/03-procesos-hijos/) |
| Python: integridad y diagnóstico | 1 semana | Manifiestos reproducibles, logs y análisis local | [Integridad de archivos](/faro-python-go/python/04-integridad-archivos/), [Diagnóstico de logs](/faro-python-go/python/05-diagnostico-logs/) |
| Go: fundamentos | 3–4 días | Tipos, control de flujo, errores y tests | [Primeros pasos](/faro-python-go/go/00-primeros-pasos/) |
| Go: concurrencia | 1 semana | Goroutines, channels, contexto y contrapresión | [Red y concurrencia](/faro-python-go/go/01-red-y-concurrencia/), [Pool](/faro-python-go/go/03-pool-trabajadores/) |
| Go: HTTP local | 1 semana | Handlers, límites, timeouts y apagado | [Servicio local](/faro-python-go/go/02-servicio-local/), [HTTP robusto](/faro-python-go/go/04-http-robusto/) |
| Proyecto final | 1–2 semanas | Servicio local, diagnóstico y prueba final | [Capstone final](/faro-python-go/guia/capstone/), [Capstone Go](/faro-python-go/go/05-capstone/) |

## Objetivos de dominio

### Python

- leer información del sistema de forma estable y segura;
- crear snapshots diagnósticos sin afirmar más de lo que muestran;
- manejar procesos hijos con argumentos explícitos y timeout;
- producir manifiestos reproducibles sin seguir enlaces inadvertidamente;
- resumir y analizar logs locales para detectar patrones.

### Go

- construir servicios con contratos y límites explícitos;
- manejar concurrencia y cancelación de manera cooperativa;
- probar handlers sin abrir puertos de producción;
- configurar timeouts y apagado ordenado;
- integrar lógica, cola de jobs y observabilidad en una app local completa.

### Seguridad defensiva

- no confiar ciegamente en la entrada;
- aislar el entorno de pruebas;
- no revelar secretos ni detalles internos en errores;
- mantener las prácticas de red en `localhost` o servicios propios.

## Recomendación de ritmo

Para una semana laboral: 2–3 horas de lectura activa, 2–3 horas de práctica, una hora de pruebas y documentación y 30–60 minutos de revisión. No avances por número de páginas: avanza cuando puedas explicar qué caso límite probaste y por qué.
