# Scope — Auditoría Dieter Rams, Altura

**Qué se audita:** landing de una sola página de "Altura" (tostador ficticio de café
de especialidad ecuatoriano), en la raíz de este repositorio.

- Código fuente en `src/app/components/` (site-header, hero, origin, roast, roots,
  collection, brew, subscribe, site-footer) y `src/app/app.html`, que las apila.
- Tokens y sistema de diseño en `src/styles.css` y `design-system/altura/MASTER.md`.
- Servidor de desarrollo corriendo en `http://localhost:4200`, pero no hay skill de
  navegador (`agent-browser` u otra) disponible en este entorno. La evidencia visual
  se toma leyendo CSS/tokens/componentes y se marca **INFERIDO** donde no se puede
  medir en el navegador real (p. ej. tiempos de red, TTI).

**Usuario primario:** alguien que llega desde redes o búsqueda, no conoce la marca,
y decide en la primera pantalla si sigue leyendo. Café de especialidad es una compra
de decisión, no de impulso.

**Tarea primaria:** entender qué es Altura y por qué su café es distinto (altitud,
origen ecuatoriano), y dejar el correo en el formulario de suscripción o considerar
un café de la colección.

**Restricciones:**
- Sin backend real: el formulario de suscripción y "Añadir al carrito" no persisten
  nada; existen para que el estado de confirmación esté diseñado.
- Stack fijo: Angular 21.2, Tailwind v4, sin GSAP, sin tests.
- Reglas no negociables ya en `CLAUDE.md` (tokens semánticos, modo oscuro con roles
  propios, animar solo opacity/transform, prefers-reduced-motion, sin emojis como
  iconos, contraste ≥4.5:1, Bodoni Moda nunca <24px, tarjetas sin elevación).
- El propósito real del proyecto no es la landing en sí: es una prueba de Google
  Stitch como herramienta de diseño. Eso no cambia el rasero de la auditoría, pero
  explica por qué ciertas decisiones vienen de Stitch y no de un criterio propio.

**Sin referencia de competidores** — no se pidió comparar contra otras marcas de café.
