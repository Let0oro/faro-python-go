---
title: "3 · Procesos hijos seguros"
description: Invoca procesos locales de forma segura, con timeout y control explícito de salida.
sidebar:
  order: 4
---

**Objetivo:** construir una función Python reutilizable para ejecutar una herramienta local conocida, sin shell, con tiempo máximo y errores diferenciados.
**Tiempo:** 2–3 h · **Investiga:** `subprocess.run`, argumentos, `PATH`, timeout y códigos de salida.

## Briefing: informe de versión

Una herramienta interna del laboratorio debe consultar la versión de un ejecutable que ya está instalado. La entrada del usuario puede seleccionar una opción (`--short` o `--verbose`), pero nunca debe convertirse en una orden de shell. El programa debe terminar aunque el proceso hijo se quede esperando.

### Predice antes de experimentar

1. ¿Qué cambia entre `subprocess.run([program, arg])` y una cadena con `shell=True`?
2. Si el hijo expira, ¿qué excepción se genera y qué ocurre con el proceso?
3. ¿Por qué no deberías confiar en el texto de salida como si fuera un formato estructurado?

```respuesta id="faro-py-child-predice" titulo="Predicciones sobre procesos hijos"
Explica tus hipótesis y el límite de tiempo que elegirías.
```

## Contrato del ejercicio

Implementa `consultar_version(programa, opcion, timeout=2.0) -> str`.

- `programa` debe ser el nombre de un ejecutable permitido por una lista local fija (en las pruebas, `python` se sustituye por `sys.executable`).
- `opcion` solo admite `--version` o `--help`.
- Invoca con una lista de argumentos, `shell=False` (el valor por defecto).
- Captura stdout y stderr, usa texto UTF-8 con reemplazo para bytes inválidos y aplica timeout.
- Si el código de salida no es cero, devuelve un error que incluya el código pero no volcará un traceback del proceso.
- No registres variables de entorno ni argumentos que puedan contener secretos.

No permitas que quien llama decida una ruta ejecutable arbitraria ni una cadena de shell. En producción, utiliza la ruta validada de un ejecutable de confianza.

## Pruebas iniciales

Guarda la función en `runner.py` y los casos en `test_runner.py`:

```python
import sys
from runner import ejecutar


def test_usa_argumentos_y_captura_salida():
    salida = ejecutar(
        sys.executable,
        ["-c", "print('faro-ok')"],
        timeout=2,
    )
    assert salida.strip() == "faro-ok"


def test_no_ejecuta_si_expira():
    import pytest
    from subprocess import TimeoutExpired

    with pytest.raises(TimeoutExpired):
        ejecutar(
            sys.executable,
            ["-c", "import time; time.sleep(5)"],
            timeout=0.05,
        )
```

Diseña `ejecutar` como una envoltura pequeña de `subprocess.run` que recibe el binario y argv por separado. Estas pruebas usan `sys.executable`, por lo que no invocan servicios externos.

## Pruebas adicionales obligatorias

- código de salida no cero;
- salida vacía y salida con Unicode;
- timeout justo antes de terminar;
- ejecutable ausente;
- opción no permitida;
- una cadena con caracteres de shell como argumento debe ser un argumento literal y nunca ejecutar una segunda orden;
- captura de stdout y stderr por separado.

Ejecuta `python -m pytest -q`. Evita pruebas frágiles basadas en dormir muchos segundos: para el timeout usa un margen bajo y comprueba la excepción, no el milisegundo exacto.

<details>
<summary>Pista 1 · Investiga</summary>

Consulta `subprocess.run`, `CompletedProcess`, `TimeoutExpired` y `shutil.which`. Observa cómo se entrega argv al proceso y qué stream contiene cada salida.
</details>

<details>
<summary>Pista 2 · Estructura</summary>

Mantén la política en una función (lista permitida y opciones aceptadas) y la ejecución en otra. No uses `shell=True`; configura `capture_output=True`, `text=True`, `encoding='utf-8'`, `errors='replace'` y `timeout`.
</details>

<details>
<summary>Revisión de seguridad</summary>

Una lista de argumentos evita que el shell interprete metacaracteres, pero no convierte un ejecutable arbitrario en confiable. Valida el binario y las opciones, y no ejecutes comandos solo porque una entrada “parece segura”. Usa fixtures o `sys.executable` en tests en lugar de depender de programas instalados en la máquina.
</details>

## Reto extra

Implementa `ejecutar_json` que limite la salida a 64 KiB antes de parsearla y que rechace JSON malformado con un error claro. Piensa qué estrategia evita acumular salida ilimitada en memoria: documenta el límite y el mecanismo que usarías antes de implementarlo.

## Autorrevisión

- [ ] No construyo una orden concatenando strings ni activo un shell.
- [ ] El proceso tiene un timeout y manejo de salida no cero.
- [ ] La lista de ejecutables y opciones es explícita.
- [ ] Las pruebas no dependen de Internet ni de herramientas externas.
- [ ] Puedo explicar que validar argv y validar la identidad del ejecutable son controles distintos.
