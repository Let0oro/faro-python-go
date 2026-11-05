---
title: Evaluación y progreso
 description: Rúbrica, niveles de dominio y evidencias para superar cada módulo de Faro.
sidebar:
  order: 5
---

# Evaluación del campus

La evaluación premia la corrección demostrable y la comprensión. No se puntúa por usar más dependencias o escribir más código. Cada entrega incluye una solución propia, pruebas que la ejercitan y una explicación de las decisiones.

## Rúbrica común

| Dimensión | Peso | Evidencia esperada |
|---|---:|---|
| Contrato y comportamiento | 30% | Casos normales y salidas con formato/documentación acordados |
| Casos límite y errores | 25% | Entradas inválidas, fallo parcial, límites exactos y mensajes controlados |
| Recursos y concurrencia | 20% | Cierre de archivos/sockets, cancelación, `-race` donde corresponda |
| Seguridad y aislamiento | 15% | Datos sintéticos, privilegio mínimo, loopback y sin secretos en logs |
| Claridad y reproducibilidad | 10% | Código legible, README y ejecución de tests desde entorno limpio |

## Niveles de dominio

- **En práctica (0–59):** funciona en el caso feliz; faltan pruebas o manejo de errores.
- **Operativo (60–79):** cumple el contrato y cubre los casos límite principales.
- **Sólido (80–94):** pruebas deterministas, errores claros, recursos limpios y decisiones explicadas.
- **Transferible (95–100):** además identifica límites, riesgos y qué evidencia adicional necesitaría.

**Aprobado:** 80 puntos o más y los controles obligatorios de seguridad pasan. Un test de seguridad fallido requiere corregir y volver a presentar, con independencia de la puntuación numérica.

## Controles obligatorios

- Ninguna prueba se dirige a equipos de terceros.
- No se suben secretos, credenciales ni datos de personas.
- No se usan `shell=True`, comandos concatenados ni rutas fuera de fixtures en los retos de procesos.
- Los servicios de práctica escuchan en loopback y tienen límites/timeouts documentados.
- El programa termina y libera recursos que creó.

## Expediente de entrega

Para cada módulo, guarda en tu repositorio de trabajo:

```text
entregas/<modulo>/
├── README.md          # objetivo, requisitos y cómo reproducir
├── decisiones.md      # hipótesis, límites y decisiones
├── src/               # solución
└── tests/             # pruebas propias y salida resumida
```

Incluye el comando exacto de tests (`python -m pytest -q`, `go test ./...` o `go test -race ./...`) y un breve comentario: qué caso te hizo cambiar de diseño. No adjuntes volcados o logs personales.

## Autoevaluación antes de entregar

1. ¿Puedo explicar el contrato sin mirar la solución de referencia?
2. ¿Mis tests fallarían si elimino la validación importante?
3. ¿Qué ocurre ante el error, el timeout y la entrada vacía?
4. ¿Qué recursos podrían quedar abiertos o goroutines pendientes?
5. ¿Qué no demuestra mi prueba, aunque pase?
