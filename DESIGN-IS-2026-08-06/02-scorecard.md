# Marcador — Auditoría Dieter Rams, Altura

Puntuación propia (no delegada), aplicando los anclajes tal cual y la regla de
desempate: ante la duda, la puntuación más baja.

```
1. Buen diseño es innovador — Score: 1/3
   Evidencia: patrón de landing editorial de una página (héroe, historia de origen,
   pasos, grid de producto, tabs, CTA de suscripción, pie) — 01-evidence.md §Estructural.
   Justificación: hay refinamientos reales (tarjetas sin elevación, sombras cálidas
   difusas, Metadata Block) pero son mejoras sobre un género ya establecido, no un
   patrón nuevo. Imita con variación menor.

2. Buen diseño hace útil un producto — Score: 1/3
   Evidencia: 15 de 39 elementos interactivos (carrito de cabecera + 15 enlaces del
   pie) no hacen nada — 01-evidence.md §Estructural y §Copy & Honestidad.
   Justificación: el carrito no solo es decorativo, no da ninguna señal al pulsarlo
   (ni siquiera una confirmación falsa) — es una acción señuelo real, y hay más de
   un tercio de la superficie interactiva de la página en ese estado.

3. Buen diseño es estético — Score: 3/3
   Evidencia: cero colores crudos fuera de tokens (grep sin coincidencias), 27/27
   pares de contraste en PASS — 01-evidence.md §Visual.
   Justificación: el sistema visual renderizado es coherente en sí mismo. La deriva
   entre los tokens de espaciado que documenta MASTER.md y los que usa styles.css es
   un problema de honestidad de la documentación, no un defecto visible en la página.

4. Buen diseño hace comprensible un producto — Score: 1/3
   Evidencia: jerga sin glosar ("primer crack", "V60") — 01-evidence.md §Copy;
   el icono de carrito etiquetado "Ver el carrito" sin ningún comportamiento asociado.
   Justificación: jerga presente más un control cuya etiqueta promete algo que no
   hace — cumple dos señales de la banda 1 a la vez.

5. Buen diseño es discreto — Score: 3/3
   Evidencia: cabecera transparente-sobre-héroe que se vuelve sólida al bajar,
   tarjetas sin elevación, sombras de baja opacidad — 01-evidence.md §Estructural,
   §Visual.
   Justificación: nada de lo evaluado compite con el contenido; el cromo cede el
   paso a la fotografía y al texto de forma consistente.

6. Buen diseño es honesto — Score: 1/3
   Evidencia: 5 superlativos sin respaldo objetivo ("inigualables", "simplemente no
   puede replicarse", "extraordinariamente complejos", "más excepcionales",
   "elevando el estándar") — 01-evidence.md §Copy & Honestidad.
   Justificación: dos o más inflaciones ya sitúan la puntuación en la banda 1 según
   el ancla; no hay patrón oscuro clásico (el formulario de suscripción es
   explícitamente anti-continuidad-forzada), lo que evita el 0.

7. Buen diseño perdura — Score: 2/3
   Evidencia: serif de alto contraste + paleta térrea + layouts asimétricos tipo
   revista, sin glassmorphism ni gradientes de moda — 01-evidence.md §Visual.
   Justificación: dirección sobria sin marcadores de tendencia obvios, pero la
   puntuación se infiere de código sin verlo renderizado — desempate a la baja.

8. Buen diseño es minucioso hasta el último detalle — Score: 0/3
   Evidencia: de 6 estados evaluados (vacío, carga, error, éxito, foco,
   deshabilitado), 4 están ausentes — 01-evidence.md §Visual.
   Justificación: el ancla es mecánica — "4+ estados ausentes" es 0 por definición,
   sin margen de interpretación.

9. Buen diseño respeta el medioambiente — Score: 3/3
   Evidencia: 47,40 kB de JS transferido, 6,16 kB de CSS, modo oscuro funcional,
   prefers-reduced-motion respetado, sin animación en bucle — 01-evidence.md
   §Peso & Fricción.
   Justificación: cumple las cuatro condiciones del ancla máximo sin ninguna
   salvedad.

10. Buen diseño es la menor cantidad de diseño posible — Score: 0/3
    Evidencia: 15 de 39 elementos interactivos son decorativos sin función (carrito
    + pie de página), más 6 formas visuales distintas para el mismo tipo de acción
    primaria, más un icono SVG reutilizado con dos significados distintos —
    01-evidence.md §Estructural.
    Justificación: supera ampliamente la banda "3-5 elementos removibles"; el ancla
    no deja escalón intermedio entre esa banda y "dominado por decoración o
    affordances duplicadas".
```

**Total: 15/30**
