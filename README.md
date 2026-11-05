# Faro

Curso interactivo en español de Python y Go para procesos, sistemas, redes y ciberseguridad defensiva.

Faro es una ruta práctica para entender cómo funcionan los sistemas desde la observación, la prueba y la explicación. El enfoque no es solo "aprender sintaxis", sino entrenar un método: leer el sistema, establecer hipótesis, probar límites y defender la solución con evidencia.

## Qué incluye

- Python para procesos, `/proc`, diagnóstico, ejecución controlada y análisis local.
- Go para concurrencia, servicios HTTP, timeouts, cancelación y pruebas con `-race`.
- retos diseñados para laboratorio local, sin tocar redes ajenas ni sistemas externos.
- pistas escalonadas, preguntas de predicción y autoevaluación por bloques.
- proyecto final para integrar observación, servicio, error handling y diagnóstico.

## Ruta del curso

- Laboratorio y entorno
- Python: procesos y observabilidad
- Python: árboles, hijos y análisis de archivos
- Go: fundamentos, concurrencia y red
- Go: servicios locales y endpoints robustos
- Proyecto final y revisión defensiva

## Inicio rápido

Requisitos:

- Node.js 20+
- npm

```bash
npm install
npm run dev
```

## Construir sitio

```bash
npm run build
```

## Despliegue

Este proyecto está preparado para publicarse con GitHub Pages usando GitHub Actions.

```bash
npm run build
```

Luego, en GitHub: Settings → Pages → Source: GitHub Actions.

## Misión del curso

El objetivo no es que el código sea largo, sino que sea claro, testeable y útil para diagnosticar lo que realmente ocurre en un sistema. Cada sesión busca que puedas responder:

- qué observé;
- qué hipótesis tenía;
- qué probé;
- qué falló;
- qué puedo afirmar con seguridad.

## Licencia

MIT
