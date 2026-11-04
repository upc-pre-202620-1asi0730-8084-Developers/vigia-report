## Conclusiones

### Conclusiones y recomendaciones

Esta versión del informe corresponde a la entrega TB1 y documenta el avance del proyecto hasta el Sprint 2. Las conclusiones que se presentan son parciales: las entrevistas de validación (sección 5.3) y los Web Services se completarán en las siguientes entregas, por lo que los Problem Statements, los assumptions y los Hypothesis Statements del proceso Lean UX aún no pueden contrastarse con resultados de validación.

**Sobre el problema y la propuesta de valor.** Las cuatro entrevistas reales analizadas en la sección 2.2.3 coinciden en que la información de un mismo despacho se dispersa entre guías de remisión, hojas de cálculo, mensajes, llamadas y registros físicos, y que esa dispersión obliga a reconstruir lo ocurrido cuando aparece una diferencia entre lo despachado y lo recibido. Esta coincidencia respalda el problema planteado en la sección 1.2 y la propuesta de Vigía de mantener la trazabilidad de los materiales desde el almacén hasta la obra. Dado que la muestra es de dos entrevistas por segmento, la evidencia se considera preliminar y debe ampliarse a un mínimo de tres entrevistas por segmento.

**Sobre el producto.** Se publicó la segunda versión del Landing Page y la primera versión de la Frontend Web Application, ambas accesibles en línea y con la Web Application enlazada desde el Landing Page. La Web Application cubre los roles de Supervisor, Responsable de Almacén y Responsable de Obra, con interfaz en inglés y español, y se organiza por Bounded Context conforme al diseño de la sección 4.6.

**Sobre el trabajo en equipo.** Los cinco integrantes registran commits en el informe y en los repositorios de implementación, y el trabajo se integró mediante GitFlow y Pull Requests, como se evidencia en las secciones 5.1.2 y 5.2.2.8.

**Recomendaciones para las siguientes entregas.**

1. Implementar y documentar con OpenAPI (Swagger) la primera versión del RESTful API en el repositorio `vigia-platform` y reemplazar el servidor simulado de la Web Application.
2. Completar las entrevistas de cada segmento, grabarlas y recalcular los análisis y artefactos de Needfinding (secciones 2.2 a 2.3) con la muestra real.
3. Realizar las entrevistas de validación con el Landing Page y la Web Application, y evaluarlas con el formato de heurísticas del Anexo D del enunciado (sección 5.3).
4. Producir y publicar los videos About-the-Product y About-the-Team, e incrustarlos en el Landing Page.
5. Corregir las entradas pendientes de la bibliografía (sección Bibliografía) y estandarizar los mensajes de commit según Conventional Commits.
