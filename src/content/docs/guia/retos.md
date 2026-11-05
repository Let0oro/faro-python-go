---
title: Retos y estilo
description: Cómo se trabaja con retos, pistas y pruebas de laboratorio en Faro.
sidebar:
  order: 3
---

## El formato

Faro combina la exploración guiada de un laboratorio con proyectos prácticos y evaluación por pruebas. Cada reto te pide observar, formular una hipótesis, implementar una solución y defenderla con evidencias.

1. **Predice** qué debería ocurrir antes de leer.
2. **Investiga** los conceptos y herramientas sugeridos.
3. **Implementa** en un entorno local controlado.
4. **Prueba** casos normales, límites y errores.
5. **Explica** tus decisiones y las limitaciones de lo observado.

## Pistas graduadas

<details>
<summary>Pista 1 · Orientación</summary>

Sugiere documentación o conceptos que conviene investigar sin dar la solución.
</details>

<details>
<summary>Pista 2 · Estructura</summary>

Propone invariantes, una API o una estrategia de pruebas para acotar el problema.
</details>

<details>
<summary>Solución de referencia</summary>

Úsala para comparar después de intentar el reto. Vuelve a implementar sin copiar y añade una prueba para el caso que te bloqueó.
</details>

## Cómo probar

- Python: `python -m pytest -q`.
- Go: `go test ./...`; para concurrencia: `go test -race ./...`.
- Red: únicamente `localhost`, fixtures o servicios propios.
- Seguridad: no incluyas secretos ni datos reales en los tests o logs.

## Criterios de dominio

Un reto está superado cuando pasan los tests, se manejan los casos límite, se liberan los recursos y puedes explicar qué garantiza tu solución y qué no. Si solo pasa el caso feliz, todavía falta trabajo.

> Los ejercicios son defensivos y para laboratorios autorizados: no pruebes redes ni sistemas de terceros.