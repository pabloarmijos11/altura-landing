# Veredicto — Auditoría Dieter Rams, Altura

**Total: 15/30.** Regla aplicada: total < 20 → **REDESIGN**, independientemente de si
algún principio de carga estructural (#2, #4, #6) llegó a 0 — en este caso no llegaron
a 0 (los dos ceros son #8 minucioso y #10 lo mínimo posible), pero el umbral del total
ya fuerza el veredicto por sí solo.

## Veredicto en una frase

La página tiene un sistema de tokens limpio, accesibilidad cuidada y un peso de
página respetable, pero pierde honestidad y utilidad frente al usuario porque más de
un tercio de sus elementos interactivos (carrito, enlaces del pie) no hacen nada,
faltan cuatro de seis estados de interfaz básicos, y el copy se apoya en cinco
superlativos sin respaldo — por eso el veredicto es REDESIGN, no un simple pulido.

**Aclaración importante para no malinterpretar la etiqueta:** esto NO es un rediseño
de identidad visual. La paleta, la tipografía, el sistema de tokens, el modo oscuro y
la accesibilidad puntuaron alto (3/3 en estético, discreto, medioambiental) y se
conservan íntegros. El REDESIGN aquí es de la **capa de interacción y contenido**:
qué controles existen, qué hacen quienes existen, y qué dice el copy — no de cómo se
ve la marca.

## Las 5 jugadas de mayor apalancamiento

1. **#10 (lo mínimo posible) / #2 (útil):** el botón de carrito en la cabecera
   (`site-header.html:89-99`) no tiene ningún `(click)` ni handler — es el único
   control de las 39 evaluadas que no da ninguna señal, ni siquiera falsa, al
   pulsarlo. Evidencia: `01-evidence.md` §Estructural, hallazgo "botón carrito sin
   handler".

2. **#2 (útil) / #6 (honesto):** 15 enlaces del pie de página (`site-footer.html:22,
   44`) apuntan todos a `href="#"` literal — prometen 15 destinos que no existen.
   Evidencia: `01-evidence.md` §Copy & Honestidad, "Discrepancias etiqueta→
   comportamiento" #4.

3. **#8 (minucioso):** faltan 4 de 6 estados de interfaz — vacío, carga, error y
   deshabilitado están ausentes en toda la página; el único formulario real (email
   de suscripción) no valida ni muestra error más allá del `required` nativo del
   navegador. Evidencia: `01-evidence.md` §Visual, tabla de checklist de estados.

4. **#6 (honesto):** 5 superlativos sin respaldo objetivo repartidos en 5 de las 9
   secciones — "inigualables" (`hero.html:51`), "simplemente no puede replicarse"
   (`origin.html:24`), "extraordinariamente complejos" (`roots.html:11`), "más
   excepcionales" (`collection.html:7`), "elevando el estándar" (`site-footer.html:7`).
   Evidencia: `01-evidence.md` §Copy & Honestidad, "Inflaciones marcadas".

5. **#4 (comprensible) / #10 (lo mínimo posible):** 6 formas visuales distintas para
   la misma affordance de "acción primaria" (rectángulo sólido marca, rectángulo
   sólido on-photo, rectángulo con borde, texto subrayado + flecha, botón cuadrado
   solo-icono, tab con borde inferior) más un icono SVG de "sol" reutilizado con dos
   significados distintos (paso de tueste vs. modo claro). Evidencia:
   `01-evidence.md` §Estructural, "Patrones repetidos".
