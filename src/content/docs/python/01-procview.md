---
title: Procview
description: Para leer procesos y reaccionar frente a datos incompletos.
sidebar:
  order: 2
---

**Objetivo:** construir una herramienta pequeña para leer un snapshot de procesos y producir un JSON estable.

## Preguntas antes de leer

1. ¿Qué pasa si un proceso desaparece entre listar el PID y leer su `/proc`?
2. ¿Debe fallar todo el informe si un PID no está disponible?
3. ¿Qué información es fiable y qué es solo un instantánea?

```respuesta id="faro-python-procview-predice" titulo="Mis predicciones"
Escribe lo que crees que ocurrirá antes de abrir la pista.
```

## Objetivo del reto

Implementa un script `procview.py` que:

- reciba una lista de PIDs de entrada;
- lea del directorio raíz configurado (por defecto `/proc`);
- devuelva un JSON con procesos y errores;
- ignores procesos huérfanos o no disponibles sin abortar el informe completo;
- ordene la salida por PID para que sea determinista.

## Casos límite

- el proceso desaparece durante la lectura;
- `stat` no tiene el formato esperado;
- `cmdline` está vacío por decisiones del sistema;
- una lista de PIDs incluye repetidos o valores no numéricos.

## Pistas

<details>
<summary>Pista 1</summary>

Revisa cómo se lee `/proc/<pid>/stat` y cómo se extrae el nombre del proceso cuando el nombre contiene espacios.

</details>

<details>
<summary>Pista 2</summary>

Haz una función que reciba la ruta y un PID, y devuelva un registro o error. La CLI solo ordena y serializa el resultado.

</details>

<details>
<summary>Solución</summary>

La forma robusta es separar tres partes: validación del PID, lectura del snapshot y serialización del JSON. El error de un proceso solo debe afectar a ese proceso, no a todo el informe.

</details>

## Cómo probarlo

```bash
python -m pytest -q
```

Y una ejecución tipo:

```bash
python procview.py --root /proc 1 2 3
```

## Revisión

Cuando termines, deberías poder medir si estás leyendo un snapshot o un estado consistente. La clave es que la salida no intente inventar datos que no existen.
