---
title: Red y concurrencia
description: Goroutines, channels, context y límites en Go.
sidebar:
  order: 2
---

**Objetivo:** dominar los mecanismos básicos de concurrencia y red con la librería estándar.

## Predicción

1. ¿Qué pasa si dos goroutines modifican el mismo contador sin protección?
2. ¿Qué ocurre si una goroutine espera en un channel que nunca se cerrará?
3. ¿Qué ventaja tiene un `context` con timeout frente a un sleep sin control?

```respuesta id="faro-go-red-predice" titulo="Mis hipótesis concurrentes"
Escribe lo que crees antes de seguir.
```

## Conceptos clave

- `go` lanza una goroutine;
- `channels` comunican datos;
- `sync.Mutex` protege estado compartido;
- `context.Context` transmite cancelación y plazos;
- `go test -race` detecta data races.

## Mini ejercicio

```go
package practicas

import (
    "context"
    "errors"
    "time"
)

func primeraRespuesta(ctx context.Context, replicas []func(context.Context) (string, error)) (string, error) {
    return "", errors.New("TODO")
}
```

### Requisitos

- devolver la primera respuesta válida;
- cancelar las demás cuando una llega;
- retornar error si todas fallan;
- respetar `ctx.Done()`.

## Casos límite

- todas fallan;
- una replica tarda demasiado;
- una replica nunca responde;
- el contexto se cancela antes del resultado.

## Cómo probarlo

```bash
go test -race ./...
```

## Pistas

<details>
<summary>Pista 1</summary>

Usa `context.WithCancel` para propagar la cancelación y un channel buffered para no bloquear envío de resultados.

</details>

<details>
<summary>Pista 2</summary>

Si cada replica devuelve su resultado por canal y la función ordena la recepción, puedes cancelar todas las demás al primer éxito.

</details>

<details>
<summary>Solución</summary>

La clave es separar dos cosas: controlar el tiempo de vida del contexto y recoger resultados de forma no bloqueante. Solo una respuesta válida debe cerrar el proceso de decisión.

</details>
