---
title: Retos del campus
description: Misiones cortas para investigar, implementar y verificar en un laboratorio propio.
sidebar:
  order: 4
---

# Retos del campus

Resuelve los retos en orden o úsalos como estaciones de práctica. Cada reto tiene un objetivo observable; antes de empezar, escribe qué esperas que ocurra. Pistas y solución: consulta las de la lección relacionada solo después de intentarlo.

## Estación Python · procesos y archivos

### Reto P1 · Snapshot incompleto

Usa fixtures para simular tres procesos: uno completo, otro sin `cmdline` y uno que desaparece durante la lectura. Produce JSON determinista y conserva los dos resultados útiles.

**Investiga:** `/proc/<pid>/stat`, parsing cuidadoso y errores por registro.
**Prueba de aceptación:** nombre con espacios; PID duplicado; raíz de fixtures inexistente; el JSON se puede parsear aun con un error individual.
**Lección:** [Procview](/python/01-procview/).

### Reto P2 · Familia circular

Crea datos sintéticos con padre ausente, PID duplicado y un ciclo. El analizador debe advertir de la inconsistencia sin quedarse recorriendo para siempre.

**Investiga:** grafos dirigidos, estados de visita y orden estable.
**Prueba de aceptación:** una cadena de miles de nodos se procesa sin depender de recursión profunda.
**Lección:** [Árbol de procesos](/python/02-arbol-de-procesos/).

### Reto P3 · Hijo con plazo

Ejecuta `sys.executable` con argumentos separados y un límite temporal corto. Comprueba salida normal, código de error y timeout sin invocar un shell.

**Investiga:** `subprocess.run`, `TimeoutExpired`, stdout/stderr.
**Prueba de aceptación:** el test no depende de programas instalados por el usuario ni de Internet.
**Lección:** [Procesos hijos seguros](/python/03-procesos-hijos/).

### Reto P4 · Huella reproducible

Calcula un manifiesto para una carpeta temporal con archivos vacíos, anidados y mayores que un bloque de lectura.

**Investiga:** SHA-256 por bloques, rutas relativas y enlaces simbólicos.
**Prueba de aceptación:** manifiestos idénticos para el mismo árbol; ningún archivo cambia.
**Lección:** [Integridad de archivos](/python/04-integridad-archivos/).

## Estación Go · concurrencia y HTTP

### Reto G1 · Límite de workers

Procesa 1.000 valores sintéticos; mide el máximo de callbacks concurrentes con un contador atómico y conserva el orden original.

**Investiga:** canales, `WaitGroup`, propiedad del cierre y `sync/atomic`.
**Prueba de aceptación:** máximo observado ≤ límite, ningún índice repetido y `go test -race ./...` pasa.
**Lección:** [Pool de trabajadores](/go/03-pool-trabajadores/).

### Reto G2 · JSON bajo límite

Implementa el contrato HTTP de la lección: acepta el cuerpo en el límite, rechaza un byte más, propiedad inesperada y JSON concatenado.

**Investiga:** `http.MaxBytesReader`, decoder estricto y códigos HTTP.
**Prueba de aceptación:** pruebas con `httptest`; mensajes externos no incluyen errores internos.
**Lección:** [HTTP robusto](/go/04-http-robusto/).

### Reto G3 · Apagado a mitad de trabajo

Inicia el worker con una tarea sintética cancelable. Solicita el apagado y verifica que el trabajo termina o se cancela dentro del plazo documentado.

**Investiga:** `context`, `Server.Shutdown` y ownership de goroutines.
**Prueba de aceptación:** no hay listener público, sleeps no deterministas ni goroutines propias pendientes al terminar.
**Lección:** [Capstone Go](/go/05-capstone/).

## Reglas de la estación

- Solo fixtures, loopback y servicios que tú inicies.
- No se requieren permisos elevados, escaneo de red ni datos reales.
- Si un reto no especifica una política, escríbela antes de codificar y añade pruebas que la hagan explícita.
