---
title: "5 · Capstone Go"
description: Integra concurrencia, HTTP, diagnóstico y cancelación en un pequeño servicio de laboratorio.
sidebar:
  order: 6
---

**Objetivo:** construir un servicio local de Go que coordine tareas, registre eventos y responda con límites explícitos.
**Tiempo:** 4–6 h · **Investiga:** `http`, `context`, `sync`, `time`, `httptest`.

## La misión

Implementa un servicio con:

- `GET /healthz` que responde `200` y un JSON liviano;
- `POST /jobs` que acepta un trabajo con `name` y `delay` en ms;
- cola de tareas con límite `workers` configurable;
- timeout por trabajo y cancelación por contexto;
- registro de eventos de nivel `INFO`, `WARN`, `ERROR`;
- uso de `httptest` para probar el servicio sin abrir puertos reales.

## Requisitos de diseño

- el servicio se ata a `127.0.0.1`;
- ningún cuerpo de solicitud pasa del límite;
- el job no se ejecuta si `delay` está fuera de rango;
- el controlador devuelve errores del negocio sin escapar stack traces;
- la cancelación del contexto del servidor debe cerrar la fila y liberar recursos.

## Pruebas mínimas

- tarea válida recibe `202` y registra el evento;
- tarea inválida devuelve `400`;
- timeout en un job devuelve `504` y conserva el registro de error;
- ruta desconocida responde `404`;
- la cola no sobrepasa el número máximo de workers;
- el shutdown del servidor termina sin dejar goroutines bloqueadas.

## Pistas

<details>
<summary>Pista 1</summary>

La lógica de cola y la lógica HTTP deben separarse: una función de fábrica/gestor y un manejador HTTP. El trabajo debe estar coordinado por un `context.Context` con cancelación.
</details>

<details>
<summary>Pista 2</summary>

Suscribe un logger pequeño con un nivel y un canal. Añade una prueba con `go test -race ./...` para detectar carreras de logging o de estado compartido.
</details>

<details>
<summary>Solución</summary>

El servicio robusto tiene tres partes: un manejador HTTP, un gestor de jobs y un logger. Cada una puede probarse de forma aislada antes de integrar el servicio completo.
</details>

## Productos esperados

- `README` con instrucciones de arranque;
- `go test -race ./...` en verde;
- 1 archivo de ejemplo con un caso de ejecución local;
- un resumen sobre qué caso límite te hizo revisar el diseño.

## Autorrevisión

- [ ] El servicio responde con mensajes genéricos y no con stack traces.
- [ ] Las tareas tienen límites explícitos y cancelación cooperativa.
- [ ] La cola de jobs no supera la concurrencia fijada.
- [ ] El servidor cierra ordenadamente y la revisión de logs es útil.
