---
title: Servicio local en Go
sidebar:
  order: 3
---

**Objetivo:** construir un pequeño servicio HTTP local, seguro y testeable.

## Caso de uso

Diseña un servicio que expone:

- `GET /healthz` => `200` y JSON de estado;
- rutas no conocidas => `404`;
- métodos no permitidos => `405`;
- lectura de cuerpo con límite explícito;
- apagado ordenado con `Shutdown`.

## Pregunta antes de leer

¿Es lo mismo iniciar un servidor en `:8080` que escuchar solo en `127.0.0.1`? ¿Qué cambia en seguridad y en pruebas?

```respuesta id="faro-go-servicio-predice" titulo="Mi diseño del servicio"
Escribe la respuesta antes de implementar.
```

## Pilares del servicio

- `http.NewServeMux()`
- `http.HandlerFunc`
- `http.MaxBytesReader` para limitar cuerpo
- `httptest.NewServer` para pruebas
- `http.Server.Shutdown` para cierre limpio

## Cómo probarlo

```bash
go test ./...
```

## Pistas

<details>
<summary>Pista 1</summary>

No uses un puerto real para pruebas. Usa `httptest` para simular tráfico HTTP local sin abrir nada en tu red.

</details>

<details>
<summary>Pista 2</summary>

El `Handler` debe decidir el código de estado según método y ruta. El cierre limpio se prueba con `Shutdown`, no con `kill`.

</details>

<details>
<summary>Solución</summary>

El servicio correcto separa rutas, validación y cierre. El contexto de apagado y los timeouts deben estar declarados para que una petición lenta no convierta el servidor en un recurso inestable.

</details>
