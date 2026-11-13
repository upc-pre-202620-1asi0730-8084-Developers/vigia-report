## Conclusiones

### Conclusiones y recomendaciones

Esta versión del informe corresponde a la entrega AV2 y documenta el avance del proyecto hasta el Sprint 3. En este punto el equipo cuenta con el Landing Page, la Frontend Web Application y la primera versión de los Web Services en desarrollo. Las conclusiones se presentan en contraste con el Problem Statement, los assumptions, los Hypothesis Statements y los criterios de éxito del proceso Lean UX (sección 1.2.2).

**Sobre el problema y la propuesta de valor.** Las entrevistas de Needfinding analizadas en la sección 2.2.3 coinciden en que la información de un mismo despacho se dispersa entre guías de remisión, hojas de cálculo, mensajes, llamadas y registros físicos, y que esa dispersión obliga a reconstruir lo ocurrido cuando aparece una diferencia entre lo despachado y lo recibido. Esta coincidencia respalda el problema planteado en la sección 1.2 y la propuesta de Vigía de mantener la trazabilidad de los materiales desde el almacén hasta la obra. La brecha identificada, la continuidad del registro de custodia entre el despacho y la recepción, se refleja en el diseño del RESTful API, donde los Bounded Contexts de pedidos y despachos, tránsito, recepción y discrepancias comparten referencias al mismo despacho.

**Sobre los criterios de éxito de Lean UX.** El primer criterio de éxito, detectar las discrepancias durante la recepción y no en la conciliación posterior, ya cuenta con soporte técnico: el API permite reportar una discrepancia al verificar la recepción y abrir un caso con su línea de tiempo. El segundo, reducir el tiempo de esclarecimiento de responsabilidades, y el tercero, el registro sostenido de eventos por parte de los usuarios, solo pueden medirse con usuarios reales. 🟢 *Completar con los resultados de las sesiones de validación (sección 5.3): qué hipótesis se confirmaron, cuáles se refutaron y qué assumptions del comportamiento de cada segmento se verificaron.*

**Sobre el producto.** Se mantienen desplegados el Landing Page y la primera versión de la Frontend Web Application, que cubre los roles de Supervisor, Responsable de Almacén y Responsable de Obra, con interfaz en inglés y español y organización por Bounded Context conforme al diseño de la sección 4.6. En el Sprint 3 se implementó la primera versión del RESTful API en `vigia-platform`, con endpoints de pedidos, despachos, vehículos y dispositivos GPS, geocercas, discrepancias, recepciones y rutas de tránsito, documentados con OpenAPI. El despliegue del API y la conexión de la Web Application con él, en reemplazo del servidor simulado, quedaron como las tasks pendientes de mayor prioridad (sección 5.2.3.3).

**Sobre el trabajo en equipo.** Los cinco integrantes registran commits en el informe y en el repositorio de Web Services, y el trabajo se integró mediante GitFlow y Pull Requests, como se evidencia en las secciones 5.1.2, 5.2.2.8 y 5.2.3.8. En el Sprint 3 cada integrante lideró un Bounded Context, lo que permitió avanzar en paralelo, aunque la carga fue desigual.

**Aprendizajes y mejora continua.** El atraso del backend se repitió entre el Sprint 1 y el Sprint 2 y obligó a reprogramar las Technical Stories TS-01 y TS-06. Para corregirlo, en el Sprint 3 el API se dividió por Bounded Context y se registró el estado real de cada task. Entre las correcciones de este informe se incluyen la alineación de los Story Points del Sprint 2 con el Product Backlog, el registro de las tasks reprogramadas y la reestructuración de las secciones del Capítulo V según el enunciado.

**Recomendaciones y Roadmap.**

1. Desplegar el RESTful API con su documentación OpenAPI y reemplazar el servidor simulado de la Web Application (tasks T-04, T-07, T-09, T-12 y T-20 del Sprint Backlog 3).
2. Implementar la autenticación (TS-01), el registro de pesaje (TS-02) y el endpoint de contacto del Landing Page (TS-06).
3. Corregir los problemas detectados en las evaluaciones de heurísticas (sección 5.3.3), priorizando los de severidad 3 y 4.
4. Implementar en los siguientes Sprints las funciones de sincronización periódica con conectividad intermitente (US-07, US-08, US-14 y TS-07).
5. Ampliar la muestra de entrevistas de validación y medir los criterios de éxito con usuarios reales durante un piloto con una empresa constructora.
6. Estandarizar los mensajes de commit según Conventional Commits y completar las entradas pendientes de la bibliografía.

### Video About-The-Team

El Video About-The-Team resume el proceso de trabajo del equipo durante el desarrollo de Vigía. Incluye escenas de sesiones reales de trabajo, narración en voz en off del proceso y el testimonio ante cámara de cada integrante, que describe las actividades que realizó, el logro del Student Outcome 5 y las competencias que desarrolló.

**Pauta de secuencias.**

| Inicio (hh:mm:ss) | Sección | Contenido |
|---|---|---|
| 00:00:00 | Presentación | Presentación del equipo Trazza Labs y del producto Vigía |
| 00:00:30 | Proceso de trabajo | Escenas de las sesiones de trabajo, GitFlow y Sprints, con voz en off |
| 00:02:00 | Retrospectiva del grupo | Aciertos y oportunidades de mejora del equipo |
| 00:07:00 | Testimonios | Un minuto por integrante: Lopez, Ramos, Sandoval, Cárdenas y Apaza |

🟢 **Pendiente:** grabar y publicar el video. Completar los tiempos reales de cada sección, la duración total, el screenshot representativo, la URL de Microsoft Stream y la URL de YouTube (que se incrusta en el Landing Page). Nombre del archivo: `upc-pre-202620-1asi0730-8084-trazzalabs-about-the-team-sprint-3.mp4`.
