## Conclusiones

### Conclusiones y recomendaciones

Esta versión del informe corresponde al cierre del proyecto en el **Sprint 4 (entrega TB2 — Trabajo Final)** y consolida los resultados reales obtenidos tras completar la integración de los tres productos de Vigía (Web Services RESTful API, Frontend Web Application y Landing Page) y analizar las **seis entrevistas de validación** (tres por segmento). Las conclusiones se presentan en contraste directo con el *Problem Statement*, los *Assumptions*, los *Hypothesis Statements* y los criterios de éxito del proceso Lean UX (sección 1.2.2), distinguiendo de forma explícita los resultados efectivamente medidos y verificados de los objetivos que solo pueden comprobarse mediante un piloto operativo prolongado.

**Sobre el problema y la propuesta de valor.** Las seis entrevistas de Needfinding registradas en la sección 2.2.2 y su análisis (sección 2.2.3) coinciden en que la información de un mismo despacho se fragmenta entre guías físicas, hojas de cálculo, llamadas y mensajes de WhatsApp, generando pérdidas de visibilidad tras la salida del almacén y demoras o disputas al detectar faltantes en obra. Asimismo, los testimonios de logística y transporte confirmaron que no debe exigirse al conductor registrar eventos manualmente mientras conduce. Esta evidencia respalda directamente el diseño adoptado en Vigía: un modelo de trazabilidad centralizado por despacho que encadena pedidos, pesaje neto con tolerancia, guía de remisión digital inmutable, seguimiento satelital GPS automático, verificación de recepción en obra y gestión de discrepancias con respaldo fotográfico y reporte PDF.

**Contraste con los supuestos, hipótesis y criterios de éxito de Lean UX (sección 1.2.2).**

| Dimensión Lean UX | Resultado verificado en el cierre TB2 (medido) | Alcance pendiente de piloto en campo (no medido aún) |
|---|---|---|
| **Detección temprana de discrepancias en la recepción** | **Verificado técnicamente y validado por usuarios (6/6):** la Web Application y el API comparan cantidades despachadas contra recibidas contra la guía oficial del servidor, exigen fotografía persistente protegida antes de cerrar una recepción discrepante y generan automáticamente un caso vinculado con reporte PDF descargable. | Tasa porcentual real de reducción de mermas no justificadas en obras en ejecución durante varios meses. |
| **Centralización y comprensión del estado de despacho** | **Validado en las seis sesiones grabadas (3 del Segmento 1 y 3 del Segmento 2):** el 100% de los participantes completó las tareas guiadas sin ayuda ni bloqueos de severidad 3 o 4 en la Web Application, destacando la claridad de la comparación visual, los avisos prioritarios y el historial cronológico. | Adopción sostenida semanal y frecuencia real de uso sin asistencia del equipo en una constructora cliente. |
| **Reducción del tiempo de esclarecimiento de responsabilidades** | **Habilitado funcionalmente:** la línea de tiempo consolidada, el historial transaccional auditable y el reporte PDF con identificador y leyenda de fotografía permiten reconstruir cada despacho desde una sola vista. | Reducción cuantitativa en horas o días frente al proceso manual previo de una empresa piloto. |
| **Control de acceso y confianza operativa** | **Verificado mediante 507 comprobaciones HTTP y 34 pruebas automatizadas del frontend:** los límites por rol (`ADMIN`, `WAREHOUSE_MANAGER`, `SITE_MANAGER`) y por obra asignada rechazan accesos no autorizados con `401`/`403`/`404`, y las operaciones críticas de guía, pesaje y cierre de recepción son atómicas e idempotentes. | Auditoría de seguridad externa y pruebas de carga prolongadas en producción con múltiples empresas concurrentes. |

**Resultados de la validación con usuarios y evaluación heurística (secciones 5.3.2 y 5.3.3).** Con la muestra completa de **seis entrevistas grabadas** —Clara Esperanza Laureano, Gianmarco Jiménez y Owen Aguirre (Segmento 1); Enoc Ramos, Angel Barrera y Alessandro Bravo (Segmento 2)— se cumplió el mínimo exigido de tres sesiones por segmento. En la Web Application se identificaron cinco hallazgos menores/superficiales (severidad 1 y 2): etiquetas pendientes de traducción al español, demora sin indicador visual al cargar el mapa, densidad visual en tablas de detalle, refresco oportuno de estados y énfasis de alertas de bajo stock. En el Sprint 4 se resolvieron las traducciones y paridad ES/EN, el indicador de carga del mapa, el desplazamiento contenido de tablas de recepción, la actualización de listas tras cierre y las mejoras de teclado/ARIA en recepción. Adicionalmente, la inspección heurística experta del Landing Page detectó la ausencia de formulario conectado al API (severidad 3), corregida en el Sprint 4 mediante el endpoint público `POST /api/v1/contact-requests` y el formulario accesible de `vigia-website`.

**Sobre el estado real del producto y la reconciliación del Product Backlog.** A diferencia de la versión previa donde el frontend consumía `json-server`, la Frontend Web Application (`vigia-web-application`, desplegada en Firebase Hosting) consume el RESTful API real (`vigia-platform`, basado en ASP.NET Core .NET 10, Entity Framework Core, MySQL 8.4 con cadena completa de migraciones y documentación OpenAPI expuesta mediante Scalar con autenticación Bearer para sus 73 operaciones protegidas). El Landing Page (`vigia-website`, desplegado en GitHub Pages) incorpora el formulario comercial conectado al API (`TS-06`). Conforme a la reconciliación registrada en la sección 5.2.4.1, se completó el flujo comprometido hasta el Sprint 4 junto con el soporte esencial de casos/evidencia/PDF adelantado del Sprint 5, mientras que las historias del **Sprint 6** (incidencias manuales de ruta y sincronización periódica offline en lote: `US-07`, `US-08`, `TS-03`, `US-14`, `TS-07`) y pasarelas de cobro en vivo **no se dan por resueltas** y permanecen en la hoja de ruta posterior al curso.

**Sobre el trabajo en equipo y aprendizajes.** El equipo mantuvo GitFlow, ramas por contexto/funcionalidad, Pull Requests y Conventional Commits en todos los repositorios. Tras la retirada operativa de Elizabeth Noelia Apaza Bocanegra después de AV2 (conservando íntegramente sus aportes históricos de AV1, TB1 y AV2), los cuatro integrantes activos reorganizaron el cierre en el Sprint 4: Fabián Sandoval asumió el doble contexto de *Fleet & Device Registry* y *Transit Traceability* junto con la integración/despliegue, Leonardo López consolidó *Order Management & Dispatch*, informe y Landing Page, Elías Ramos lideró *Discrepancy & Evidence Management*, i18n/accesibilidad base y videos, y Mathias Andree Cárdenas lideró *Site Reception & Verification*, la planificación del Sprint 4, usabilidad/wireflows y la presentación final trabajando de manera independiente y coordinada por contratos. Como principal aprendizaje, verificar contratos de extremo a extremo y permisos negativos (`401`/`403`/`404`) desde la integración evitó que errores de autorización o duplicación llegaran a la versión de cierre.

**Recomendaciones y hoja de ruta posterior a TB2.**

1. Completar la verificación final en las URLs públicas definitivas tras ejecutar el despliegue y respaldo productivo en Azure (cierre de `S4-10`) y conservar la suite de regresión por roles como puerta de calidad ante futuros cambios.
2. Ejecutar un piloto controlado de 4 a 8 semanas con una empresa constructora y un almacén satélite para medir cuantitativamente los criterios de éxito de negocio pendientes (tiempo de cierre de discrepancias y reducción real de mermas).
3. Incorporar en iteraciones posteriores las historias diferidas del Sprint 6: registro de incidencias de ruta (`US-07`) y sincronización periódica offline en lote (`US-08`, `TS-03`, `US-14`, `TS-07`) para frentes de obra con conectividad intermitente.
4. Extender la validación empírica con usuarios reales sobre las tareas `L1–L3` del Landing Page (sección 5.3.1) tras publicar la versión final con el formulario de contacto y los videos actualizados.
5. Integrar en una fase comercial futura la pasarela de pagos recurrentes (`US-17`), reservas de existencias en línea (`US-16`) y la validación fiscal con comprobantes electrónicos de SUNAT.

### Video About-The-Team

El Video About-The-Team presenta, ante cámara, el testimonio de cada integrante del equipo sobre las actividades que realizó en el desarrollo de Vigía, el logro del Student Outcome 5 y las competencias que desarrolló.

**Pauta de secuencias.**

| Inicio (hh:mm:ss) | Sección | Duración |
|---|---|---|
| 00:00:00 | Testimonio de Leonardo López | 00:58 |
| 00:00:58 | Testimonio de Elías Ramos | 01:27 |
| 00:02:25 | Testimonio de Elizabeth Apaza *(el tramo no tiene audio)* | 01:36 |
| 00:04:01 | Testimonio de Mathias Cárdenas | 01:31 |
| 00:05:32 | Testimonio de Fabián Sandoval: aportes, arquitectura y dificultades del proyecto | 05:08 |

**Figura 1.** Captura del Video About-The-Team.

[![Video About-The-Team](../../assets/chapther-5/sprint-3/video-about-the-team.jpg)](https://youtu.be/8jhRrFqgy-8)

| Dato | Valor |
|---|---|
| URL en YouTube (video incrustado en el Landing Page) | [https://youtu.be/8jhRrFqgy-8](https://youtu.be/8jhRrFqgy-8) |
| Duración | 10:40 |
| Nombre del archivo | `upc-pre-202620-1asi0730-8084-trazzalabs-about-the-team-sprint-3.mp4` |
| URL en Microsoft Stream | [Ver video en Microsoft Stream](https://upcedupe-my.sharepoint.com/:v:/g/personal/u20241a649_upc_edu_pe/IQDCR1Ja8nXTR6gqd3JwzGDmAWMXX0hKBqWD4VdRc_LKjF0) *(visible con cuenta UPC)* |

El video está incrustado en la sección del equipo del Landing Page.

**Aspectos por corregir en el video** (revisión del 28/11/2026).

- 🟢 *Audio:* volver a grabar o reemplazar el tramo 00:02:25 – 00:04:01, que no tiene sonido.
- 🟢 *Contenido exigido:* agregar escenas de sesiones de trabajo reales del equipo, narración en voz en off del proceso y una sección de retrospectiva grupal, que no se identificaron en el video publicado.
