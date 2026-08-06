# 01 — Identidad base

**Fecha:** 2026-08-05
**Prompt usado:** Prompt 0 de `stitch/prompts.md` (identidad de marca)
**Devolvió:** `DESIGN.md` — un sistema de diseño, no una pantalla

## Qué esperaba

Que fijara la identidad —paleta, tipografía, tono— sin generar pantallas todavía.
Hizo exactamente eso: el export es un sistema de diseño en YAML + prosa.

## Qué respetó del sistema de diseño

- [x] Marca `#92400E` y acento `#4F6F52`
- [x] Public Sans en cuerpo, etiquetas y botones
- [x] `label-caps` en mayúsculas con `letter-spacing: 0.15em`
- [x] Espaciado generoso: 96px escritorio / 64px tablet / 48px móvil
- [x] Sin emojis; iconos de línea de 1.5pt
- [x] El tono editorial de revista impresa, descrito con precisión

## Qué se desvió

1. **Fondo `#fff8f6`** (rosado cálido) en lugar de `#FDFBF7`.
2. **Cambió Libre Bodoni por Bodoni Moda**, justificándolo por el renderizado digital.
3. **Inyectó una paleta Material Design 3 completa** (`surface-container-*`,
   `on-surface`, `inverse-primary`, `*-fixed`…). Sesgo de la herramienta: Stitch es de
   Google y arrastra sus tokens por defecto aunque el prompt no los pida.
4. **Añadió `tertiary: #00446d`, un azul** que no pertenece a la marca.
5. **Se contradice internamente**: el frontmatter declara fondo `#fff8f6` y borde
   `#dcc1b6`; la prosa, más abajo, dice `#FDFBF7` y `#E8DCCB`. Los valores legibles
   por máquina y los que lee un humano no coinciden — hay que revisar ambos.

## Qué aportó que no teníamos

Lo más valioso del export. Cuatro cosas que mejoran nuestro sistema:

1. **"The Metadata Block"** — componente para origen, proceso y altitud, con
   `label-caps` y separadores verticales finos.
2. **Chips de notas de cata** — el verde de acento al 10% de opacidad con texto verde
   oscuro, en forma de píldora.
3. **Sombras de 40px de desenfoque al 4%** — "luz sobre un papel, no una ventana
   digital". Más sutiles que las nuestras y más coherentes con lo editorial.
4. **Fotografía a 0px de radio** frente a tarjetas redondeadas: distingue la imagen
   impresa del elemento de interfaz.

Y una corrección directa a nuestro MASTER: **hover por cambio de fondo en vez de
elevación**. Una tarjeta que flota es lenguaje de aplicación; el papel no levita.

## Conclusión de esta iteración

Stitch ejecutó el sistema con fidelidad alta, aportó cuatro componentes que mejoran el
original y filtró el sesgo de Material Design de su propia casa. El prompt detallado
funcionó: la desviación se concentró justo donde el prompt no llegaba a especificar.
