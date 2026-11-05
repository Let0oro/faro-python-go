---
title: Árbol de procesos
description: Diseñar un árbol a partir de procesos con padres ausentes y ciclos sintéticos.
sidebar:
  order: 3
---

**Objetivo:** construir un árbol de procesos a partir de registros incompletos y detectar advertencias sin caer en bucles.

## Predicción

1. ¿Qué hacemos con un proceso cuyo padre no aparece en el snapshot?
2. ¿Cómo manejamos un PID duplicado en dos registros distintos?
3. ¿Debemos abortar todo el árbol si encontramos un ciclo?

```respuesta id="faro-python-arbol-predice" titulo="Mi árbol de hipótesis"
Escribe tu política antes de implementar.
```

## Contrato

La función `build_tree(records)` debe:

- aceptar una lista de registros `{pid, ppid, name}`;
- devolver `roots`, `warnings` y nodos con `children`;
- añadir un nodo raíz artificial cuando el padre no existe;
- ignorar ciclos de forma segura y registrarlos como advertencia;
- mantener un orden determinista.

## Casos límite

- entrada vacía;
- PID inválido;
- registros duplicados;
- padres faltantes;
- ciclo de dos nodos;
- senarios donde el nombre del proceso contiene espacios.

## Pistas

<details>
<summary>Pista 1</summary>

Primero crea un mapa `pid -> nodo`. Luego enlaza el padre e hijo en una segunda pasada para no perder trazabilidad.

</details>

<details>
<summary>Pista 2</summary>

Usa un conjunto de visitados para detectar un ciclo durante la exploración del árbol. Si aparece, genera una advertencia y no te quedes recorriendo infinitamente.

</details>

<details>
<summary>Solución</summary>

La solución fuerte separa el modelo de datos, la construcción del grafo y la resolución de raíces. La validación debe impedir que un PID no entero se convierta en un nodo del árbol.

</details>

## Cómo probarlo

```bash
python -m pytest -q
```

## Revisión

Si puedes explicar qué es un proceso raíz, qué es un huérfano y qué es una advertencia de inconsistencia, ya estás enfocando bien la parte de observabilidad del sistema.
