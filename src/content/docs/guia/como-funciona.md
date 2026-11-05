---
title: Cómo funciona Faro
description: El formato del curso, las pistas y la manera de trabajar con pruebas de laboratorio.
sidebar:
  order: 1
---

## El método

Faro combina tres cosas:

1. **Observación**: entiendes qué se está ejecutando y qué evidencia tienes.
2. **Implementación**: construyes una solución mínima y te prueba en el mismo entorno.
3. **Reflexión**: explicas qué hace tu programa, qué casos de borde falla y qué no puedes afirmar.

Cada nivel incluye:

- objetivo y tiempo estimado;
- preguntas de predicción antes de leer;
- pruebas públicas;
- casos límite;
- pista 1, pista 2 y solución de referencia;
- mini checklist para autorrevisión.

## Pistas graduadas

<details>
<summary>Pista 1</summary>

Te dice dónde buscar, sin resolverlo por completo.

</details>

<details>
<summary>Pista 2</summary>

Te acerca a la estructura: un diseño, un tipo, una función o un patrón concreto.

</details>

<details>
<summary>Solución</summary>

Te da la referencia, pero no sustituye tu intento. La mejor práctica es volver a implementarlo con tus propias palabras.

</details>

## Cómo trabajar cada reto

- No abras la solución inmediatamente.
- Intenta el problema durante 10–15 minutos.
- Combina lectura, pruebas y pequeña experimentación local.
- Si falla, haz una prueba nueva antes de cambiar la solución.
- Si no sabes qué probar, documenta el caso límite y conviértelo en un test.

## Normas del laboratorio

- Trabaja siempre en un entorno local o virtual.
- Usa solo `localhost`, fixtures o servicios que tú inicies.
- No probes redes ajenas ni sistemas de terceros.
- No guardes secretos, tokens ni datos sensibles en el repositorio.

## Qué se evalúa

No basta con que el programa “funcione” en una ejecución feliz. Se revisan:

- manejo de errores;
- pruebas de límites;
- validación de entradas;
- limpieza de recursos;
- determinismo y reproducibilidad;
- claridad en la explicación.
