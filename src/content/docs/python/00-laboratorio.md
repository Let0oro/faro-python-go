---
title: Preparar el laboratorio
sidebar:
  order: 1
---

**Objetivo:** tener un entorno reproducible para correr pruebas de Python y Go sin tocar sistemas externos.
**Tiempo estimado:** 45–90 minutos

## Requisitos

- Python 3.11+
- Go 1.22+
- Git
- editor de texto o IDE
- entorno virtual para Python

## Comandos mínimos

```bash
python3 --version
go version
git --version
```

```bash
mkdir -p ~/faro/labs
cd ~/faro/labs
python3 -m venv .venv
. .venv/bin/activate
python -m pip install pytest
```

## Regla de seguridad

Los ejercicios de esta ruta se ejecutan en tu equipo o en una VM propia. Los servicios locales deben escuchar en `127.0.0.1` o `localhost`, nunca contra una red ajena.

## Mini reto

Crea un script `check_env.py` que:

- compruebe que `python` y `go` están disponibles;
- imprima versiones;
- falle con un código de salida distinto de cero si falta alguno;
- no escriba archivos fuera del directorio de trabajo.

## Qué debes poder hacer al terminar

- activar un entorno virtual sin errores;
- ejecutar `pytest` sobre un reto local;
- ejecutar `go test` sobre un ejercicio concreto;
- explicar qué hace cada comando y por qué es local.
