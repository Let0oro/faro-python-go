---
title: "4 · HTTP robusto"
description: Diseña handlers Go con límites de cuerpo, validación, timeout y tests con httptest.
sidebar:
  order: 5
---

**Objetivo:** mejorar un endpoint local para manejar límites y errores sin exponer información interna.
**Tiempo:** 3 h · **Investiga:** `net/http`, `MaxBytesReader`, códigos HTTP, `httptest` y timeouts.

## Incidente

Un servicio local de laboratorio recibe una petición JSON para registrar una etiqueta. El primer prototipo decodifica cualquier tamaño, acepta campos desconocidos y devuelve el error interno al cliente. Endurece el handler y prueba sus límites sin abrir un puerto real.

### Predice

1. ¿Qué coste puede tener aceptar un cuerpo arbitrariamente grande?
2. ¿Por qué devolver `err.Error()` al cliente puede filtrar rutas o detalles internos?
3. ¿Es suficiente comprobar que un JSON se decodificó si quedan bytes adicionales después del objeto?

```respuesta id="faro-go-http-predice" titulo="Revisión del handler"
Anota qué límites y respuestas establecerías.
```

## Contrato

Implementa un `POST /labels` que reciba `{"name":"..."}`.

- límite de cuerpo: 4 KiB; exceso devuelve `413`;
- JSON inválido, campos desconocidos o contenido adicional: `400` genérico;
- `name` debe tener entre 1 y 40 caracteres tras recortar espacios;
- `Content-Type` debe ser `application/json`;
- respuesta exitosa: `201` y JSON con el nombre normalizado;
- no devuelve errores internos, stack traces ni rutas;
- servidor de producción escucha en `127.0.0.1:8080` y configura timeouts explícitos.

## Tests con `httptest`

Crea el router con un `http.Handler` y prueba en memoria:

```go
func TestPostLabel(t *testing.T) {
    srv := httptest.NewServer(newMux())
    defer srv.Close()

    req, err := http.NewRequest(http.MethodPost, srv.URL+"/labels", strings.NewReader(`{"name":"  faro  "}`))
    if err != nil { t.Fatal(err) }
    req.Header.Set("Content-Type", "application/json")
    res, err := srv.Client().Do(req)
    if err != nil { t.Fatal(err) }
    defer res.Body.Close()

    if res.StatusCode != http.StatusCreated {
        body, _ := io.ReadAll(res.Body)
        t.Fatalf("status=%d body=%q", res.StatusCode, body)
    }
}
```

Añade una tabla para: JSON malformado, cuerpo vacío, `Content-Type` incorrecto, propiedad desconocida, dos objetos concatenados, nombre vacío, nombre de 40 y 41 caracteres, cuerpo de 4096 y 4097 bytes, método GET y ruta inexistente. Cierra todos los cuerpos de respuesta.

## Investigación y pistas

<details>
<summary>Pista 1 · Parsing</summary>

Investiga `http.MaxBytesReader`, `json.Decoder.DisallowUnknownFields` y `Decoder.Decode` dos veces. La segunda decodificación debe encontrar EOF para demostrar que no hay otro valor JSON detrás.
</details>

<details>
<summary>Pista 2 · Errores</summary>

Valida el método mediante el router o responde `405`. Devuelve mensajes genéricos al cliente y registra detalles internamente solo si no contienen secretos. Distingue error de límite de tamaño para contestar `413`.
</details>

<details>
<summary>Pista 3 · Servidor</summary>

Los tests de handler no verifican configuración del servidor. En el arranque fija `Addr` a loopback, `ReadHeaderTimeout`, `ReadTimeout`, `WriteTimeout` e `IdleTimeout`; usa `signal.NotifyContext` y `Server.Shutdown` con un plazo acotado.
</details>

## Prueba adicional de robustez

Añade un test que envíe una petición con el cuerpo cerrado a mitad de transmisión y confirma que el handler responde con error controlado. Evita basar el resultado en tiempos exactos. Ejecuta `go test -race ./...` aunque el handler todavía no use goroutines: la práctica también debe poder crecer sin introducir carreras.

## Autorrevisión

- [ ] El cuerpo tiene un límite estricto y probado en el límite exacto.
- [ ] El parser rechaza campos desconocidos y bytes sobrantes.
- [ ] Los mensajes externos no revelan detalles internos.
- [ ] La escucha de producción queda confinada a loopback.
- [ ] Los tests usan `httptest` y no dependen de servicios ni Internet.
