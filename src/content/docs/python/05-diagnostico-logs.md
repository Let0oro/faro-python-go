---
title: "5 · Diagnóstico de logs"
description: Construye un visor local de eventos y reordena trazas sin asumir que el sistema es perfecto.
sidebar:
  order: 6
---

**Objetivo:** analizar un conjunto de líneas de log locales y resumir errores, tiempos y contadores de forma fiable.
**Tiempo:** 2–3 h · **Investiga:** `csv`, `re`, `datetime`, agregación y orden determinista.

## Caso de uso

Tu equipo genera un log sintético con varias líneas de eventos: inicio, éxito, fallo, timeout y cancelación. Debes producir un resumen por nivel, contar eventos y mostrar el último error evidente. Todo se hace sobre una carpeta temporal de pruebas, nunca sobre un sistema operativo real.

### Predice

1. ¿Cuándo una línea de log se considera útil para diagnóstico y cuándo es ruido?
2. ¿Qué diferencia hay entre “leer el último evento” y “mostrar el último evento válido”?
3. Si el log está incompleto, ¿debería el programa inventar campos o marcarlos como ausentes?

```respuesta id="faro-py-log-predice" titulo="Mi hipótesis de diagnóstico"
Escribe qué campos te interesan antes de leer la pista.
```

## Contrato

Implementa `leer_log(path)` que:

- lea una línea por línea;
- detecta niveles `INFO`, `WARN`, `ERROR`, `CRITICAL` y `DEBUG`;
- extrae timestamp ISO, nivel, mensaje y un identificador opcional de evento;
- devuelve un resumen con `total`, `por_nivel`, `ultimos_errores` y `eventos_sin_ts`;
- ignora líneas vacías y no rompe el análisis si una línea es irregular.

La salida debe ser reproducible: ordena por timestamp si existe, y por línea si no.

## Pruebas mínimas

```python
from log_viewer import leer_log


def test_resume_basico(tmp_path):
    p = tmp_path / "lab.log"
    p.write_text(
        "2026-11-05T10:00:00Z INFO boot\n"
        "2026-11-05T10:00:01Z ERROR timeout\n"
        "2026-11-05T10:00:02Z ERROR retry\n",
        encoding="utf-8",
    )
    resumen = leer_log(p)
    assert resumen["total"] == 3
    assert resumen["por_nivel"]["ERROR"] == 2
    assert resumen["ultimos_errores"][:2] == ["timeout", "retry"]
```

Añade casos para línea sin timestamp, mensajes con espacios, orden desordenado, log vacío y un nivel desconocido. Usa `tmp_path` y evita depender del entorno del evaluador.

## Pistas

<details>
<summary>Pista 1 · Parsing</summary>

Usa `str.split(maxsplit=3)` para separar el timestamp, el nivel y el resto. Si no hay un formato reconocible, deja la línea en un contador de inválidas y sigue.
</details>

<details>
<summary>Pista 2 · Agregación</summary>

Crear un diccionario `por_nivel` y un contenedor de errores es suficiente para un resumen. El “último error” se puede obtener ordenando los eventos por timestamp antes de tomar los mensajes relevantes.
</details>

<details>
<summary>Solución</summary>

La clave es distinguir dos cosas: decodificar una línea concreta y resumir un conjunto. Un analizador debe ser tolerante con líneas defectuosas sin ocultar la estructura del log.
</details>

## Reto extra

Añade `filtrar_por_nivel(log, level)` y `resumir_por_hora(log)` para obtener un resumen por hora local de la sesión. Esto te prepara para diagnosticar un servicio con cuellos de botella o ráfagas.

## Autorrevisión

- [ ] El parseo no rompe el archivo por una línea mala.
- [ ] El resumen es determinista.
- [ ] Las líneas sin timestamp no se tratan como si fueran válidas.
- [ ] La salida permite diagnosticar tendencias y errores recientes.
