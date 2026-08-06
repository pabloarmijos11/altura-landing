# Design System Master File — Altura

> **LOGIC:** When building a specific page, first check `design-system/altura/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Altura — tostador de café de especialidad de origen ecuatoriano
**Generated:** 2026-08-05 (ui-ux-pro-max 2.11.0)
**Category:** Bakery/Cafe
**Design Dials:** Variance 6/10 (Balanced / Modern) | Motion 7/10 (Standard) | Density 3/10 (Spacious)

---

## Overrides manuales sobre lo generado

Cuatro decisiones sobrescriben la salida automática de la skill. Se documentan aquí
porque el matching de la base de datos es por palabras clave, no por criterio de
diseño, y sin esta nota el próximo que regenere el archivo revertiría los cambios.

| Qué generó la skill | Qué usamos | Por qué |
|---|---|---|
| Tipografía Fredoka / Nunito | **Libre Bodoni / Public Sans** | Fredoka está catalogada para "children's apps, gaming". Café de especialidad es un producto premium y editorial: pide un serif de alto contraste. |
| Background `#FEF3C7` | **`#FDFBF7`** | Un amarillo saturado como lienzo de página entera compite con la fotografía de producto y fatiga en scroll largo. El crema saturado se reserva como sección de acento. |
| Patrón "Horizontal Scroll Journey" | **Scroll-Triggered Storytelling** | El scroll horizontal en móvil es hostil y rompe el gesto natural. La narrativa por capítulos verticales da lo mismo sin pelearse con el usuario. |
| Motion vía GSAP | **IntersectionObserver + transiciones CSS** | ~50 KB de librería para reveals y stagger que se resuelven con una directiva de 30 líneas. Reevaluar solo si el capítulo del tueste exige coreografía compleja. |

## Cambios de la iteración 01 con Stitch

Ver `stitch/exports/01-identidad-base/NOTAS.md` para el análisis completo.

**Aceptado de Stitch:** Bodoni Moda en lugar de Libre Bodoni; sombras muy difusas de
baja opacidad; hover de tarjeta por cambio de fondo en vez de elevación; fotografía sin
radio; el Metadata Block; los chips de notas de cata.

**Rechazado:** la paleta Material Design 3 completa que inyectó por su cuenta
(`surface-container-*`, `inverse-primary`, `*-fixed`) y el `tertiary: #00446d` azul,
ajeno a la marca. Es el sesgo de la herramienta —Stitch es de Google— asomando por
debajo del prompt. También se mantuvo nuestro fondo `#FDFBF7` frente a su `#FFF8F6`,
cuyo tinte rosado choca con el marrón de tueste en superficies grandes.

**Aviso:** el `DESIGN.md` que devuelve Stitch **se contradice a sí mismo** — el
frontmatter YAML y la prosa declaran valores distintos para el fondo y los bordes. Si
se vuelve a leer ese archivo, verificar ambos bloques antes de copiar un hex.

---

## Global Rules

### Color Palette — Light

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Background | `#FDFBF7` | `--color-background` |
| Surface (cards) | `#FFFFFF` | `--color-surface` |
| Surface alt (secciones de acento) | `#FDF6E9` | `--color-surface-alt` |
| Ink (texto principal) | `#2A1A10` | `--color-ink` |
| Ink muted (texto secundario) | `#6B5545` | `--color-ink-muted` |
| Primary (tueste) | `#92400E` | `--color-primary` |
| Primary hover | `#7C3508` | `--color-primary-hover` |
| On primary | `#FFFFFF` | `--color-on-primary` |
| Accent (finca / grano verde) | `#4F6F52` | `--color-accent` |
| Border | `#E8DCCB` | `--color-border` |
| Ring (foco) | `#92400E` | `--color-ring` |
| Destructive | `#DC2626` | `--color-destructive` |

### Color Palette — Dark

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Background | `#17110D` | `--color-background` |
| Surface (cards) | `#211913` | `--color-surface` |
| Surface alt | `#2B211A` | `--color-surface-alt` |
| Ink | `#F2E9DF` | `--color-ink` |
| Ink muted | `#B8A695` | `--color-ink-muted` |
| Primary | `#D98A4E` | `--color-primary` |
| Primary hover | `#E59B62` | `--color-primary-hover` |
| On primary | `#1A120C` | `--color-on-primary` |
| Accent | `#8FB393` | `--color-accent` |
| Border | `#3A2C22` | `--color-border` |
| Ring | `#D98A4E` | `--color-ring` |

**Reglas de color no negociables:**

1. **El modo oscuro no reutiliza los hex del claro.** `#92400E` sobre `#17110D` da ~2:1
   de contraste: ilegible. Por eso primary sube a `#D98A4E`. Un token de marca es un
   rol, no un color fijo.
2. **Fondo oscuro cálido, nunca `#000000`.** El negro puro con tipografía crema produce
   halación (el texto "vibra"). `#17110D` es marrón muy oscuro y sostiene la identidad.
3. **Nunca un hex crudo en un componente.** Solo tokens semánticos. Es la única forma de
   que dos temas no se conviertan en dos hojas de estilo paralelas.

### Typography

- **Heading Font:** Bodoni Moda — variable, ejes `opsz 6..96` y `wght 400..900`
- **Body Font:** Public Sans — 300/400/500/600/700
- **Mood:** magazine, editorial, publishing, refined, journalism, print
- **Par de origen:** "Magazine Style" (`--domain typography`), con Libre Bodoni
  sustituida por Bodoni Moda a propuesta de Stitch (iteración 01).

Bodoni Moda tiene **eje de tamaño óptico**: adelgaza los remates en titulares grandes
y los engorda en tamaños pequeños, que es justo donde un Bodoni suele romperse en
pantalla. Libre Bodoni no lo tiene.

```html
<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Public+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

**Escala tipográfica:**

| Rol | Tamaño | Fuente | Notas |
|---|---|---|---|
| Hero | `clamp(2.5rem, 7vw, 5rem)` | Libre Bodoni 700 | `leading-[0.95]`, `tracking-tight` |
| Section H2 | `clamp(1.75rem, 4vw, 3rem)` | Libre Bodoni 600 | |
| Body | `1.0625rem` (17px) | Public Sans 400 | `leading-relaxed` (1.6) |
| Label / eyebrow | `0.75rem` | Public Sans 600 | `uppercase`, `tracking-[0.15em]` |

Bodoni tiene trazos finos extremos: **nunca por debajo de 24px**, o los remates
desaparecen en pantallas normales. Para texto pequeño, siempre Public Sans.

### Spacing Variables

*Density: 3/10 — Spacious*

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `24px` / `1.5rem` | Standard padding |
| `--space-lg` | `32px` / `2rem` | Section padding |
| `--space-xl` | `48px` / `3rem` | Large gaps |
| `--space-2xl` | `64px` / `4rem` | Section margins |
| `--space-3xl` | `96px` / `6rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 2px 8px rgba(42,26,16,0.03)` | Separación mínima |
| `--shadow-md` | `0 8px 24px rgba(42,26,16,0.04)` | Tarjetas, botones |
| `--shadow-lg` | `0 16px 40px rgba(42,26,16,0.06)` | Elementos destacados |
| `--shadow-xl` | `0 24px 60px rgba(42,26,16,0.08)` | Imágenes de hero |

Muy difusas y de opacidad baja (criterio de Stitch, iteración 01): deben leerse como
**luz cayendo sobre un papel**, no como una ventana digital flotando sobre el fondo.

Las sombras usan marrón translúcido, no negro: sobre fondos cálidos el negro puro
apaga la sección y la vuelve gris. En modo oscuro las sombras casi no se ven —
ahí la separación se consigue con `--color-surface` y `--color-border`, no con sombra.

---

## Component Specs

Los valores van como tokens en `@theme`; el CSS de abajo es la especificación, no el
código final (en el proyecto se escribe con utilidades de Tailwind).

### Buttons

```css
.btn-primary {
  background: var(--color-primary);
  color: var(--color-on-primary);
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: background-color 200ms ease, transform 200ms ease;
  cursor: pointer;
}
.btn-primary:hover { background: var(--color-primary-hover); transform: translateY(-1px); }
.btn-primary:focus-visible { outline: 2px solid var(--color-ring); outline-offset: 2px; }

.btn-secondary {
  background: transparent;
  color: var(--color-primary);
  border: 1.5px solid var(--color-primary);
  /* resto igual que primary */
}
```

Sobre imágenes o fondos de color, los botones llevan `--color-surface` sólido +
`--shadow-sm`: deben distinguirse **en reposo**, no solo al enfocarlos.
(Regla heredada de `prueba-landingpage`; ver el vault.)

### Cards

```css
.card-editorial {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: var(--space-md);
  transition: background-color 200ms ease, border-color 200ms ease;
}
.card-editorial:hover { background: var(--color-surface-alt); }
```

**La tarjeta no se eleva al pasar el ratón: cambia de fondo.** Una tarjeta que flota es
lenguaje de aplicación; en una página que imita papel impreso, nada levita. Corrige la
regla original de este documento (propuesta de Stitch en la iteración 01, aceptada).

### Chips de notas de cata

```css
.chip-tasting {
  border-radius: 9999px;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-accent);
  background: color-mix(in srgb, var(--color-accent) 10%, transparent);
}
```

### Metadata Block

Aporte de Stitch. Bloque estructurado para los datos de un café —origen, proceso,
altitud, varietal— con las etiquetas en `label-caps` y separadores verticales de 1px
entre columnas. Es el componente que le da el aire de ficha técnica de catación.

### Fotografía

**Radio 0.** Las imágenes van a canto vivo; solo los elementos de interfaz se redondean.
Es lo que separa una página de revista de un panel de control.

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 16px; /* menos de 16px provoca zoom automático en iOS */
  transition: border-color 200ms ease;
}
.input:focus-visible {
  border-color: var(--color-primary);
  outline: none;
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 20%, transparent);
}
```

---

## Style Guidelines

**Style:** Soft UI Evolution
**Key Effects:** sombras suaves con clara separación, transiciones 200-300ms, foco visible, WCAG AA/AAA

### Page Pattern — Scroll-Triggered Storytelling

- **CTA:** mini-CTA al final de cada capítulo + CTA final
- **Estrategia de color:** revelado progresivo; cada capítulo con su fondo (`background`
  → `surface-alt` → `background`) para marcar el cambio de escena sin romper la paleta
- **Efecto:** la narrativa multiplica el tiempo en página; en móvil, animaciones simplificadas

**Section Order:**

1. Hero — nombre, claim, imagen a sangre, CTA sobre el pliegue
2. Capítulo 1 — El origen (altitud, fincas)
3. Capítulo 2 — El tueste (timeline, pieza fuerte de motion)
4. La colección — 3 cafés en grid con stagger
5. Capítulo 3 — Tu método (V60 / prensa / espresso, tabs)
6. CTA — suscripción mensual
7. Footer

---

## Motion

**Preset base:** Stagger List (Standard) — trigger scroll | 300-450ms | `cubic-bezier(0.34, 1.3, 0.64, 1)`

Implementación con `IntersectionObserver` en una directiva reutilizable, no GSAP:

```css
.reveal { opacity: 0; transform: translateY(16px) scale(0.98); }
.reveal.is-visible {
  opacity: 1; transform: none;
  transition: opacity 400ms ease, transform 400ms cubic-bezier(0.34, 1.3, 0.64, 1);
}
```

- ✅ Stagger por índice: `transition-delay: calc(var(--i) * 60ms)`
- ✅ Animar solo `opacity` y `transform` (compuestas por la GPU, no disparan layout)
- ❌ Nunca animar `width`, `height`, `top` o `margin`
- ❌ El overshoot (`back.out`) no va en tablas ni datos: ahí se lee como descuido
- ⚡ Desconectar el observer tras la primera revelación; no re-animar al volver a subir

**`prefers-reduced-motion` desde el inicio, no como parche:**

```css
@media (prefers-reduced-motion: reduce) {
  .reveal, .reveal.is-visible { opacity: 1; transform: none; transition: none; }
}
```

---

## Anti-Patterns (Do NOT Use)

- ❌ **Fotos de comida pobres** — en una marca de alimentación, una foto mediocre hunde la página entera
- ❌ **Emojis como iconos** — usar SVG (Heroicons / Lucide)
- ❌ **Falta de `cursor-pointer`** en elementos clicables
- ❌ **Hovers que desplazan el layout** — `transform`, nunca cambios de tamaño de caja
- ❌ **Texto de bajo contraste** — mínimo 4.5:1
- ❌ **Cambios de estado instantáneos** — siempre transición de 150-300ms
- ❌ **Estados de foco invisibles**
- ❌ **Hex crudos en componentes** — solo tokens semánticos
- ❌ **Bodoni por debajo de 24px**

---

## Pre-Delivery Checklist

- [ ] Sin emojis como iconos; set de iconos consistente
- [ ] `cursor-pointer` en todo lo clicable
- [ ] Hovers con transición de 150-300ms
- [ ] Contraste de texto ≥ 4.5:1 **en ambos temas**
- [ ] Foco visible en navegación por teclado
- [ ] `prefers-reduced-motion` respetado
- [ ] Responsive verificado en 375px, 768px, 1024px, 1440px
- [ ] Sin scroll horizontal en móvil
- [ ] Sin contenido oculto tras la barra fija
- [ ] Imágenes con `width`/`height` o `aspect-ratio` (evita CLS)
- [ ] Imágenes en WebP y con `loading="lazy"` salvo la del hero
