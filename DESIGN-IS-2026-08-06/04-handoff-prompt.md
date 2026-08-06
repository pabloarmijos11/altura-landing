# Prompt de traspaso para /make-plan

````
/make-plan Redesign la capa de interacción y contenido de la landing "Altura" (tostador ficticio de café ecuatoriano, Angular 21 + Tailwind v4, repo en C:\Users\ASUS\Documents\PERSONAL\PROYECTOS\prueba-stich). El diseño actual falló la auditoría en 15/30 con brechas críticas en los principios #8 (minucioso) y #10 (lo mínimo posible).

Veredicto (citado del audit):
> La página tiene un sistema de tokens limpio, accesibilidad cuidada y un peso de página respetable, pero pierde honestidad y utilidad frente al usuario porque más de un tercio de sus elementos interactivos (carrito, enlaces del pie) no hacen nada, faltan cuatro de seis estados de interfaz básicos, y el copy se apoya en cinco superlativos sin respaldo — por eso el veredicto es REDESIGN, no un simple pulido.

Por qué redesign y no refine: el total (15/30) queda muy por debajo del umbral de 20 que exige la regla de decisión, y dos principios (#8 minucioso, #10 lo mínimo posible) llegaron a 0/3 de forma mecánica (4+ estados de interfaz ausentes; más de un tercio de los elementos interactivos son decorativos).

Aclaración de alcance: esto NO es un rediseño de identidad visual. Los principios #3 (estético), #5 (discreto) y #9 (medioambiental) puntuaron 3/3 y se conservan íntegros. El trabajo es sobre qué controles existen, qué hacen los que existen, y qué dice el copy — no sobre cómo se ve la marca.

Preservar del diseño actual:
- Sistema de tokens semánticos completo en src/styles.css (--alt-bg, --alt-surface, --alt-ink, --alt-brand, --alt-accent, --alt-border y sus pares en modo oscuro) — 0 colores crudos fuera de este sistema en toda la app.
- Modo oscuro funcional (src/app/services/theme.ts) con anti-FOUC en index.html.
- Tipografía de marca: Bodoni Moda (font-display) + Public Sans (font-sans), definidas en styles.css:87-88.
- Los 24-27 pares de contraste WCAG ya verificados y en PASS (scripts/contraste.py), mínimo 4.94:1.
- Regla .card-editorial de hover-por-fondo, no por elevación (styles.css:169-180).
- Sombras difusas de baja opacidad en tono marrón, no negro puro (styles.css:94-101).
- Directiva RevealOnScroll (src/app/directives/reveal-on-scroll.ts) y su gating con prefers-reduced-motion (styles.css:229-248).
- Andamiaje de accesibilidad: skip-link (site-header.html:3-8), tabs WAI-ARIA con roving tabindex en brew.ts:90-115, landmarks ARIA existentes.
- Peso de bundle actual (47,40 kB JS transfer / 6,16 kB CSS transfer) — no debe crecer sin justificación.

Descartar:
- El botón de carrito de la cabecera sin ningún handler. Evidencia: site-header.html:89-99. Causó el fallo en el principio #10 y contribuyó a #2 y #6.
- Los 15 enlaces del pie de página con href="#" literal (12 en 3 columnas + 3 de redes). Evidencia: site-footer.html:22,44. Causó el fallo en el principio #2 y #6.
- Las 6 formas visuales distintas para la misma affordance de "acción primaria" (rectángulo sólido marca, rectángulo sólido on-photo, rectángulo con borde, texto subrayado+flecha, botón cuadrado solo-icono, tab con borde inferior). Evidencia: hero.html:56, hero.html:66/subscribe.html:36, collection.html:51, site-header.html:28/roots.html:21/site-footer.html:46, site-header.html:42,72,91, brew.html:29. Causó el fallo en el principio #4 y #10.
- El icono SVG de "sol" reutilizado con dos significados distintos (paso de tueste "Secado" y toggle de modo claro). Evidencia: roast.html:23-26, site-header.html:78-81. Causó el fallo en el principio #4.
- Los 5 superlativos sin respaldo objetivo en el copy. Evidencia: hero.html:51, origin.html:24, roots.html:11, collection.html:7, site-footer.html:7. Causó el fallo en el principio #6.
- La ausencia total de 4 de 6 estados de interfaz (vacío, carga, error, deshabilitado) en toda la app, especialmente en el único formulario real (email de suscripción, subscribe.html:24-32, que solo valida con required/type="email" nativos). Causó el fallo mecánico en el principio #8.

Las 3-5 jugadas de mayor apalancamiento del audit (verbatim):
1. #10 (lo mínimo posible) / #2 (útil): el botón de carrito en la cabecera (site-header.html:89-99) no tiene ningún (click) ni handler — es el único control de las 39 evaluadas que no da ninguna señal, ni siquiera falsa, al pulsarlo.
2. #2 (útil) / #6 (honesto): 15 enlaces del pie de página (site-footer.html:22,44) apuntan todos a href="#" literal — prometen 15 destinos que no existen.
3. #8 (minucioso): faltan 4 de 6 estados de interfaz — vacío, carga, error y deshabilitado están ausentes en toda la página; el único formulario real no valida ni muestra error más allá del required nativo del navegador.
4. #6 (honesto): 5 superlativos sin respaldo objetivo repartidos en 5 de las 9 secciones — "inigualables" (hero.html:51), "simplemente no puede replicarse" (origin.html:24), "extraordinariamente complejos" (roots.html:11), "más excepcionales" (collection.html:7), "elevando el estándar" (site-footer.html:7).
5. #4 (comprensible) / #10 (lo mínimo posible): 6 formas visuales distintas para la misma affordance de "acción primaria" más un icono SVG de "sol" reutilizado con dos significados distintos (paso de tueste vs. modo claro).

Principios de rediseño en orden de prioridad:
1. #6 Honesto — cada control interactivo debe dar una señal verdadera al pulsarlo (aunque sea "esto es una demo de diseño, no hace nada real"), y cada afirmación de marketing debe poder sostenerse o reescribirse en términos concretos y verificables.
2. #10 Lo mínimo posible — decidir, elemento por elemento, si el carrito y los 15 enlaces muertos del pie se implementan de verdad (aunque sea de forma mínima), se reducen a lo que sí existe, o se retiran. Consolidar las 6 variantes de botón en 2-3 formas canónicas.
3. #8 Minucioso — diseñar explícitamente los 4 estados ausentes, priorizando el formulario de suscripción (único flujo real de la página): qué se ve en error de email inválido, qué se ve mientras "envía" (aunque sea instantáneo), y si el botón de suscribir debe deshabilitarse con el campo vacío.

Deliverables para el plan:
- Arquitectura de información nueva para cabecera y pie de página: qué enlaces y controles son reales, cuáles se implementan mínimamente, cuáles se retiran.
- Flujo primario nuevo (bajo-fi, etiquetado) para el formulario de suscripción con los 4 estados diseñados, comparado lado a lado con el actual.
- Vocabulario de botones consolidado (de 6 formas a 2-3), documentado como los overrides existentes de design-system/altura/MASTER.md.
- Pase de copy: reemplazar los 5 superlativos señalados por afirmaciones concretas y verificables, o eliminarlos.
- Checklist de estados (vacío, carga, error, éxito, foco, deshabilitado) aplicado a cada componente con interacción real.
- Ruta de migración: no aplica (no hay usuarios en producción todavía — proyecto de prueba de diseño, sin lanzamiento previo).
- Criterio de cierre: los 39 elementos interactivos dan una señal honesta al usuario, y el checklist de 6 estados queda en 0 ausencias para subscribe/collection (los dos flujos con interacción real).

Anti-patrones a evitar (específicos de este REDESIGN):
- No tocar el sistema de tokens de color/tipografía/espaciado ni el modo oscuro — ya puntuaron 3/3 y están fuera de este pase.
- No añadir un servicio de carrito real ni backend — el proyecto es explícitamente una demo de diseño sin backend (ver CLAUDE.md); "honesto" aquí significa que la ausencia de backend se comunique, no que se simule uno.
- No agregar los 4 estados de interfaz como un parche visual desconectado del resto — deben usar los mismos tokens y el mismo lenguaje de motion (opacity/transform, prefers-reduced-motion) ya establecidos.
- No rediseñar la identidad visual (paleta, tipografía, layout de secciones) bajo la etiqueta de "redesign" — el scope de este pase es interacción y contenido, no estética.
````
