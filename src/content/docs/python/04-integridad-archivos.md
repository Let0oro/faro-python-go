---
title: "4 · Integridad de archivos"
description: Crea un manifiesto de hashes reproducible para fixtures de laboratorio, sin modificar los archivos.
sidebar:
  order: 5
---

**Objetivo:** recorrer un árbol de fixtures y calcular SHA-256 de archivos regulares, produciendo un manifiesto ordenado y verificable.
**Tiempo:** 2–3 h · **Investiga:** `hashlib`, rutas relativas, enlaces simbólicos, lectura por bloques y límites.

## La escena

El laboratorio te entrega un conjunto de archivos de ejemplo. Debes guardar sus hashes para poder comparar dos ejecuciones y detectar cambios accidentales. Esto es una comprobación de integridad, no una prueba de quién creó un archivo ni una firma criptográfica.

**Límite:** trabaja solo sobre una carpeta temporal creada por el test. No escanees el sistema de archivos ni uses rutas proporcionadas por terceros.

### Predice

1. ¿Por qué conviene leer un archivo en bloques en vez de cargarlo entero?
2. ¿Qué debería hacer el manifiesto con enlaces simbólicos?
3. Si dos archivos tienen el mismo contenido, ¿sus rutas deben desaparecer del manifiesto?

```respuesta id="faro-py-hash-predice" titulo="Política del manifiesto"
Anota la política para enlaces, archivos vacíos y errores de lectura.
```

## Contrato

Implementa `manifest(root)` que devuelva una lista de objetos ordenada por ruta relativa POSIX. Cada elemento contiene `path`, `size` y `sha256`.

- Incluye solo archivos regulares.
- No sigue enlaces simbólicos; los omite con una advertencia separada o error tipado.
- Calcula SHA-256 leyendo bloques de 64 KiB.
- No modifica el árbol examinado.
- Las rutas del manifiesto son relativas a `root`, no absolutas.
- En caso de error de lectura, informa la ruta relativa sin incluir datos sensibles del sistema.

## Prueba de contrato

```python
import hashlib
from pathlib import Path
from manifest import manifest


def test_manifiesto_reproducible(tmp_path: Path):
    (tmp_path / "z.txt").write_bytes(b"hola")
    (tmp_path / "sub").mkdir()
    (tmp_path / "sub" / "a.bin").write_bytes(b"\x00\x01")

    report = manifest(tmp_path)
    assert [row["path"] for row in report] == ["sub/a.bin", "z.txt"]
    assert report[1] == {
        "path": "z.txt",
        "size": 4,
        "sha256": hashlib.sha256(b"hola").hexdigest(),
    }
```

Amplía con tests para archivo vacío, directorio vacío, árbol anidado, contenido mayor que un bloque, enlace simbólico (si la plataforma lo permite), fallo de lectura simulado, raíz inexistente y llamada repetida. Comprueba que dos manifiestos de un árbol sin cambios son iguales.

## Investigación guiada

<details>
<summary>Pista 1 · Primer paso</summary>

Consulta `Path.rglob`, `Path.is_symlink`, `Path.is_file`, `hashlib.sha256` y `hash.update`. Diseña cómo transformar una ruta en ruta relativa POSIX.
</details>

<details>
<summary>Pista 2 · Límites</summary>

No uses `read_bytes()` para el archivo completo: abre en modo binario y actualiza el objeto hash en un bucle de bloques hasta EOF. Comprueba los enlaces antes de decidir si sigues una ruta.
</details>

<details>
<summary>Pregunta de seguridad</summary>

Una ruta puede cambiar entre comprobarla y abrirla (TOCTOU). Para una herramienta de laboratorio con árbol controlado basta documentar el supuesto y no seguir enlaces. Para un escáner de seguridad de producción se necesita un diseño más cuidadoso basado en descriptores y APIs específicas de la plataforma.
</details>

## Reto extra · Comparar manifiestos

Escribe `compare(before, after)` que devuelva listas separadas de `added`, `removed` y `changed`, ordenadas por ruta. Un archivo renombrado debe aparecer como eliminación más alta: el hash por sí solo no prueba que sea el mismo objeto.

## Autorrevisión

- [ ] El hash se calcula por bloques y es correcto para archivos vacíos y grandes.
- [ ] El manifiesto es determinista y usa rutas relativas.
- [ ] No sigo enlaces ni modifico el árbol.
- [ ] Los errores no filtran rutas absolutas innecesarias.
- [ ] No presento un hash como prueba de autenticidad o autoría.
