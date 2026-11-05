---
title: Anatomía de una lección
 description: Estructura común del campus Faro para practicar, consultar pistas, revisar soluciones y evaluar dominio.
sidebar:
  order: 1
---

# Una lección, cinco estaciones

Cada lección del campus se recorre en el mismo orden. Las páginas de curso pueden variar en tamaño, pero mantén esta secuencia en tus entregas y en las nuevas lecciones.

## 1 · Briefing

Objetivo, tiempo, prerequisitos y contrato observable. Antes de leer, escribe una predicción. Al terminar podrás comparar tu modelo mental inicial con el comportamiento que mediste.

## 2 · Práctica

Primero intenta resolver la misión. Usa fixtures, entradas sintéticas y el entorno de laboratorio permitido. Separa el código de producción de los tests, define sus límites y ejecuta el conjunto público.

Regla recomendada: 10 minutos de intento antes de la pista 1; después, prueba de nuevo antes de abrir otra.

## 3 · Pistas

- **Pista 1 — investigar:** concepto, documentación o herramienta que conviene consultar.
- **Pista 2 — orientar:** invariante o estrategia que acota el diseño.
- **Pista 3 — depurar:** pregunta o caso límite para encontrar el fallo.

Las pistas orientan; no sustituyen el diseño ni las pruebas propias.

## 4 · Solución razonada

Consulta la solución solo después del intento. Una buena solución explica el porqué, sus invariantes, los límites del enfoque y al menos un diseño alternativo. No es una respuesta para copiar: reimplementa después con tus palabras y añade el test que necesitabas.

## 5 · Evaluación

Cierra cada lección con:

- tests de contrato y casos límite;
- comando de ejecución reproducible;
- autoevaluación con la [rúbrica del campus](/guia/evaluacion/);
- una nota breve: hipótesis inicial, fallo encontrado y decisión final.

### Plantilla para una nueva misión

```markdown
## Briefing
Objetivo, tiempo, prerequisitos y contrato.

## Antes de leer: predice
Preguntas + caja de respuesta.

## Práctica
Starter, requisitos, tests públicos y casos extra.

## Pistas
Pista 1 → Pista 2 → Pista 3.

## Solución razonada
Diseño, código de referencia, límites y alternativa.

## Evaluación
Rúbrica, checklist y evidencia que se guarda.
```

## Separación de respuestas

Los tests públicos describen comportamientos esenciales. Los casos extra exploran límites; no deben depender de Internet, sleeps precisos ni el orden del sistema operativo. Las soluciones pueden estar plegadas en `<details>` en la lección, pero el alumno debe poder intentar y probar antes de abrirlas.
