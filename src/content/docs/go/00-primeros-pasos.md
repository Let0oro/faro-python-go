---
title: Primeros pasos en Go
sidebar:
  order: 1
---

**Objetivo:** aprender lo mínimo para resolver ejercicios de sistemas y servicios con Go.

## Qué vas a usar

- tipos primitivos y structs;
- slices, maps y errores;
- funciones y punteros;
- concurrencia básica;
- testing con `go test`.

## Recomendación de estudio

Prueba estas pequeñas ideas en Go:

```go
package main

import "fmt"

func main() {
    nums := []int{1, 2, 3}
    m := map[string]int{"a": 1}
    fmt.Println(nums, m)
}
```

### Casos que conviene dominar

- `for range` con slices y maps;
- `errors.New` y `fmt.Errorf("%w")`;
- `struct` con campos visibles o privados;
- conversión entre tipados y prueba de límites.

## Pista de investigación

Empieza por:

- Tour of Go;
- Effective Go;
- Go by Example.

## Mini reto

Escribe una función `suma` que reciba un slice y devuelva el total. Luego escribe tests:

- slice vacío;
- slice con un valor;
- slice con múltiples valores;
- valores negativos.

```bash
go test ./...
```

## Revisión

Si puedes convertir una idea de sistema a una pequeña función y testear sus casos límite, ya tienes una base sólida para la siguiente etapa.
