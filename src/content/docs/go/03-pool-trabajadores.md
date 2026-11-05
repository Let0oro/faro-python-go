---
title: "3 · Pool de trabajadores"
description: Procesamiento concurrente en Go con límite de concurrencia, cancelación y pruebas de carreras.
sidebar:
  order: 4
---

**Objetivo:** implementar una cola acotada de tareas con goroutines y preservar el resultado por índice.
**Tiempo:** 3–4 h · **Prerequisito:** Go básico · **Investiga:** `sync.WaitGroup`, channels, `context`, `atomic` y contrapresión.

## Misión

Tienes un lote finito de mediciones sintéticas que transformar. Ejecuta una función de trabajo con un máximo de `N` trabajadores, conserva el orden original y devuelve el error asociado a cada elemento. Una cancelación debe parar la admisión de nuevas tareas y esperar a los trabajadores ya iniciados.

No se puede forzar de forma segura la terminación de una goroutine. El contrato exige que el callback respete `ctx.Done()`; documenta ese requisito.

### Predice

1. ¿Quién cierra el canal de trabajos?
2. ¿Se puede escribir concurrentemente en distintas posiciones de un slice compartido?
3. ¿Qué protección hace falta si dos workers actualizan un contador compartido?

```respuesta id="faro-go-pool-predice" titulo="Diseño de concurrencia"
Escribe las invariantes antes de implementar.
```

## Implementación

Crea `pool.go`:

```go
package pool

import (
    "context"
    "errors"
)

type Result struct {
    Index int
    Value int
    Err   error
}

// MapBounded ejecuta fn para cada elemento con un máximo de workers activos.
// Conserva el orden y devuelve error si se cancela ctx.
func MapBounded(
    ctx context.Context,
    input []int,
    workers int,
    fn func(context.Context, int) (int, error),
) ([]Result, error) {
    if workers < 1 {
        return nil, errors.New("workers debe ser al menos 1")
    }
    // TODO: define la cola, inicia los workers y espera su salida.
    return nil, errors.New("TODO")
}
```

## Tests públicos

En `pool_test.go`:

```go
package pool

import (
    "context"
    "reflect"
    "testing"
)

func TestMapBoundedPreservaOrden(t *testing.T) {
    got, err := MapBounded(context.Background(), []int{4, 1, 3}, 2,
        func(_ context.Context, n int) (int, error) { return n * 2, nil })
    if err != nil { t.Fatal(err) }
    want := []Result{{Index: 0, Value: 8}, {Index: 1, Value: 2}, {Index: 2, Value: 6}}
    if !reflect.DeepEqual(got, want) { t.Fatalf("got %#v, want %#v", got, want) }
}

func TestMapBoundedEmpty(t *testing.T) {
    got, err := MapBounded(context.Background(), nil, 2,
        func(_ context.Context, n int) (int, error) { return n, nil })
    if err != nil || len(got) != 0 { t.Fatalf("got %#v, err %v", got, err) }
}
```

Añade tests extra: `workers=0`; error del callback en el índice correcto; contexto ya cancelado; 10.000 elementos; callback cooperativo bloqueado hasta cancelación; contador del máximo de callbacks simultáneos medido con `sync/atomic`. Ejecuta:

```bash
go test -race ./...
```

## Pistas

<details>
<summary>Pista 1 · Arquitectura</summary>

Envía trabajos que incluyan el índice original. El productor es el único dueño del cierre del canal. Preasigna `results := make([]Result, len(input))`; cada tarea escribe únicamente en su índice.
</details>

<details>
<summary>Pista 2 · Cancelación</summary>

El productor usa `select` entre enviar y `ctx.Done()`. Los workers hacen `select` entre recibir y cancelar. Usa `WaitGroup` para que no quede ninguna goroutine del pool después del retorno.
</details>

<details>
<summary>Pista 3 · Semántica</summary>

Decide si una cancelación retorna resultados parciales o `nil`. En este ejercicio, la regla es devolver `nil, ctx.Err()` al cancelar; los errores normales del callback se quedan en su `Result` y no cancelan el resto.
</details>

## Evaluación

Se revisa el máximo de concurrencia, el orden, la ausencia de carreras, el comportamiento de entrada vacía, la cancelación y que no se cierre un canal desde un consumidor. Un test basado en sleeps como mecanismo de sincronización es frágil; usa canales de coordinación.

## Autorrevisión

- [ ] El número de callbacks simultáneos nunca excede `workers`.
- [ ] El productor es responsable del cierre de trabajos.
- [ ] Cada índice se escribe una vez y el orden de salida es estable.
- [ ] La cancelación espera el fin de los workers cooperativos.
- [ ] `go test -race ./...` pasa.
