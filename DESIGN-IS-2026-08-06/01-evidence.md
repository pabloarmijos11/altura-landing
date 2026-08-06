# Evidencia — Auditoría Dieter Rams, Altura

## Copy & Honestidad (para #4 comprensible, #6 honesto)

### Strings visibles al usuario
Ver inventario completo por componente en el informe original del subagente (72 strings
en 9 componentes: site-header, hero, origin, roast, roots, collection, brew, subscribe,
site-footer). Cubre titulares, párrafos, labels, aria-labels y placeholders.

### Inflaciones marcadas
- `hero.html:51` — "perfiles de sabor **inigualables**"
- `origin.html:24` — "una complejidad aromática... que **simplemente no puede replicarse** en tierras bajas"
- `roots.html:11` — "perfiles de sabor **extraordinariamente complejos**"
- `collection.html:7` — "nuestras regiones cafetaleras **más excepcionales**"
- `site-footer.html:7` — "**Elevando el estándar** del café ecuatoriano"

5 superlativos sin respaldo objetivo, repartidos en 5 de las 9 secciones.

### Patrones oscuros
Ninguno encontrado. `subscribe.html:42` ("Sin permanencia. Cancele cuando quiera.") es
explícitamente anti-continuidad-forzada. Sin casillas premarcadas, sin urgencia falsa,
sin confirmshaming.

### Jerga sin glosar
- `roast.html` ("Primer crack" sin explicación)
- `brew.html:34` ("V60" sin explicar qué es)
- `collection.html:36` ("msnm" suelto, solo desarrollado en `origin.html:11`)

### Discrepancias etiqueta → comportamiento
1. **"Ver el carrito"** (`site-header.html:93`) → sin `(click)`, sin estado, sin servicio. No hace nada.
2. **"Añadir al carrito"** (`collection.html:64`) → sin carrito real; `collection.ts:53-69` solo confirma 2s. Comentario propio del código: "No hay carrito ni backend" (`collection.ts:55`).
3. **"Suscribirme"** (`subscribe.html:38`) → `subscribe.ts:12-17` hace `preventDefault()` y no envía nada. Comentario propio: "No hay backend... no para enviar nada".
4. **Enlaces del footer** (11 enlaces: Colección, Suscripciones, Accesorios, Tarjetas regalo, Fincas asociadas, Sostenibilidad, Journal, Envíos, Guías, FAQ, Contacto) → todos `href="#"` literal. Ninguno lleva a contenido real.
5. **Logo "ALTURA"** (`site-header.html:59-65`) → `href="#"` sin comportamiento definido.
6. **"Conozca a nuestros productores"** (`roots.html:19-22`) → enlaza a la colección de productos, no a nada sobre productores. No existe esa sección.

**Nota del subagente:** la ficción de marca (finca "El Mirador", origen ecuatoriano) NO
se cuenta como deshonestidad — el proyecto es explícitamente un tostador ficticio, ya
declarado en `CLAUDE.md`.

---

## Accesibilidad (para #2 útil, #4 comprensible)

### Contraste WCAG (`py -3 scripts/contraste.py`)
24/24 pares en PASS. Ratio mínimo observado: **4,94:1** (chip de cata, modo claro),
umbral 4,5:1. Rango completo: 4,94:1 – 16,75:1 en claro; 5,76:1 – 15,59:1 en oscuro.

### Orden de foco
Sigue el orden del DOM (`app.html`: header → hero → origin → roast → roots →
collection → brew → subscribe → footer): skip-link → nav escritorio → hamburguesa →
logo → toggle tema → carrito → (menú móvil si abierto) → CTAs del hero → (origin/roast
sin controles) → enlace de roots → botones "Añadir al carrito" → tabs de brew (roving
tabindex, solo el activo tiene `tabindex="0"`, `brew.html:27`) → email → "Suscribirme"
→ enlaces del footer.

### Alcanzable por teclado
Las 6 acciones primarias evaluadas son accesibles por teclado: 4 por ser elementos
nativos (`<button>`, `<a>`, `<form>`) y 1 (tabs de brew) con `(keydown)` explícito
implementando ArrowLeft/ArrowRight/Home/End con roving tabindex (`brew.ts:90-115`).

### Landmarks ARIA/semánticos
8: `header`, `nav` (escritorio), `nav` (móvil, condicional), `main#contenido`,
`role="tablist"`, `role="tabpanel"`, `nav` por columna del footer (×3, vía `@for`),
`footer`. Más un `role="status"` (live region, no landmark) en la confirmación de
suscripción.

### Skip-link
Sí — `site-header.html:3-8`, apunta a `main#contenido` (`app.html:9`).

### Gaps señalados por el subagente
- Hamburguesa, toggle de tema y "Añadir al carrito" no tienen `(keydown)` explícito
  (funcionan por ser `<button>` nativo, pero no está verificado con tests — no los hay
  en este proyecto).
- El cambio a "Añadido" en el botón de colección no tiene `aria-live`: un lector de
  pantalla que no esté enfocado en ese botón no se entera del cambio.

---

## Peso & Fricción (para #9 respetuoso con el medioambiente)

### Bundle (fuente: `npm run build`, Angular CLI, 2026-08-06T22:47:51.857Z)
- JS inicial: **163,56 kB raw / 47,40 kB transfer** (`main-7SSNLHDO.js`)
- CSS inicial: **33,92 kB raw / 6,16 kB transfer** (`styles-RWZXBFBM.css`)
- Total: **197,48 kB raw / 53,57 kB transfer**

### Imágenes
`public/images/`: 11 archivos WebP, **2.039.614 bytes ≈ 1,99 MB** en disco. El hero
domina: `hero-2000.webp` 856 KB, `hero-1400.webp` 448 KB, `hero-800.webp` 147 KB (con
`srcset`, el navegador solo baja una). El resto son ligeras (bolsas 4-6 KB, ilustraciones
de método 23-43 KB, origin/roots ~210-264 KB).

### Animaciones activas en reposo
**1 definición** (`.reveal`/`.reveal.is-visible`, `styles.css:151-164`), aplicada a
**10 elementos** vía `appRevealOnScroll`, disparada por `IntersectionObserver` sin
interacción del usuario. Nada más se anima solo — hover, focus y click quedan
excluidos por requerir interacción.

### Notificaciones/badges/modales en carga inicial
**0.** Los cuatro signals que controlan visibilidad condicional (`submitted`,
`menuOpen`, `scrolled`, `addedName`) inician en `false`/`null`.

### prefers-reduced-motion
**Sí** — `styles.css:229-248`. Fuerza scroll instantáneo, reveals visibles sin
transición, y `animation-duration`/`transition-duration` a 0,01ms global.

### Modo oscuro
**Sí, funcional** — `services/theme.ts`: signal + `effect()` que aplica clase `dark` y
persiste en localStorage; estado inicial decidido por script inline en `index.html`
antes del primer pintado (anti-FOUC).

### Gaps señalados por el subagente
- Sin navegador disponible, no se pudo medir Time-to-Interactive real ni confirmar qué
  imagen del `srcset` del hero descarga efectivamente cada dispositivo — cualquier cifra
  ahí sería inferida, y el subagente prefirió no inventarla.
- El peso de imágenes es el peso en disco de los 11 archivos, no lo que realmente baja
  la página en la carga inicial (varias van con `loading="lazy"`).

---

## Estructural (para #2 útil, #4 comprensible, #5 discreto, #10 lo mínimo posible)

### Elementos interactivos: 39
Header 13 (skip-link, 4 nav escritorio, hamburguesa, logo, tema, carrito, 4 nav móvil),
hero 2, origin 0, roast 0, roots 1, collection 3, brew 3, subscribe 2, footer 15
(12 enlaces de columnas + 3 de redes).

### Profundidad del árbol de componentes
**Plana.** `App → sección` (9 hijos directos, ninguno con sub-componentes `app-*`
propios). Nada de anidamiento de componentes; solo la directiva `appRevealOnScroll`
anida DOM dentro de las secciones.

### Patrones repetidos
- **6 formas visuales distintas para "acción primaria"**: rectángulo sólido marca,
  rectángulo sólido on-photo (usado en 2 componentes distintos), rectángulo con borde,
  texto subrayado + flecha (`link-underline`, 3 contextos: nav/CTA inline/pie), botón
  cuadrado solo-icono, tab con borde inferior.
- **Un solo mecanismo de scroll a sección**: enlaces nativos `href="#id"`, consistente.
- **Icono SVG "sol" duplicado**: mismo path exacto en `roast.html:23-26` (paso
  "Secado") y `site-header.html:78-81` (toggle "modo claro") — mismo dibujo, dos
  significados distintos.
- **`.card-editorial`**: un solo punto de uso (`collection.html:13`) — la regla no
  negociable #9 del CLAUDE.md protege un patrón que hoy solo existe una vez.
- **`appRevealOnScroll`**: 10 usos en 4 de 9 componentes; ausente en hero (LCP,
  documentado), brew, subscribe, header, footer.

### Imports/props muertos
Ninguno en TypeScript. Un hallazgo de comportamiento: el **botón de carrito de la
cabecera no tiene `(click)` ni handler alguno** (`site-header.html:89-99`) — coincide
con lo que ya marcó el subagente de copy como discrepancia etiqueta→comportamiento.

### Gap señalado por el subagente
`components/shared/theme-toggle/` no existe como componente separado pese a estar
mencionado en la arquitectura planeada del `CLAUDE.md` — el toggle vive inline en
`site-header.html`. Dato, no evaluación.

---

## Visual — INFERIDO de código fuente (para #3 estético, #8 minucioso)

Sin navegador ni skill `agent-browser` disponibles: todo lo siguiente es lectura de
código, no observación renderizada. Marcado explícitamente como INFERIDO.

### Escala de espaciado
Mezcla la escala por defecto de Tailwind (0,25rem → 6rem, valores sueltos: `gap-1,
gap-2, gap-3, gap-4/mb-4/px-4, gap-6, p-6, p-8/gap-8/mb-8, mb-10, gap-12/mt-12, mb-16,
gap-16, gap-24/mb-24, lg:px-20`) con dos tokens de sección custom
(`--spacing-section: 6rem`, `--spacing-section-sm: 4rem`, `styles.css:91-92`).

**Hallazgo del subagente:** `design-system/altura/MASTER.md` documenta tokens
`--space-*` (4px a 96px) que **no existen en `styles.css`** — los componentes usan la
escala por defecto de Tailwind directamente, no los tokens de espaciado que el
documento fuente de verdad describe. El sistema de espaciado documentado y el
implementado han divergido.

### Escala tipográfica
`text-[10px]`, `text-xs`, `text-sm`, `text-lg`, `text-2xl`, `text-3xl`, `text-4xl`,
`text-5xl`, `text-7xl`. **Huecos**: no aparece `text-base` (el cuerpo usa el tamaño por
defecto del navegador sin clase explícita) ni `text-xl` ni `text-6xl` — salto directo
de `text-5xl` a `text-7xl` en el titular del hero.

### Colores
17 nombres de token / 26 valores hex declarados en `styles.css` (10 redefinidos por
tema × 2 + 6 invariantes de foto/pie). **Cero colores crudos fuera de `styles.css`**
— búsqueda de `#`/`rgb(`/`rgba(` en todo `src/app/**/*.html` sin coincidencias. Regla
no negociable #1 del `CLAUDE.md` ("solo tokens semánticos") se cumple al 100% en el
código auditado. Únicos valores fijos fuera del sistema de tokens son utilidades de
opacidad de Tailwind sobre esos mismos tokens u overlays fijos (`bg-black/45`,
`text-white/90` en el hero — deliberados, documentados en el propio HTML).

### Contraste (medido, no inferido — `py -3 scripts/contraste.py`)
27/27 pares en PASS. Mínimo: **4,94:1** (chip de cata, modo claro; margen de 0,44
sobre el umbral de 4,5:1 — el más ajustado de los 27).

### Checklist de estados
| Estado | Presente | Evidencia |
|---|---|---|
| Empty | **Ausente** | `coffees` en `collection.ts` es un array hardcodeado, nunca vacío; sin markup condicional |
| Loading | **Ausente** | `subscribe.ts:12-17` cambia de estado de forma síncrona, sin intermedio; sin spinner/skeleton en ningún componente |
| Error | **Ausente** | Email solo valida con `required`/`type="email"` nativos; sin mensaje custom ni `aria-invalid` |
| Success | **Presente** | `subscribe.html:9-17` (`role="status"`) y `collection.html:47-67` (botón "Añadido") |
| Focus | **Presente** | Global en `styles.css:141-145`, más específico en el input de suscripción y el skip-link |
| Disabled | **Ausente** | Sin atributo `disabled` en ningún componente — ni el submit ni "Añadir al carrito" tienen variante inhabilitada |

### Gaps señalados por el subagente
- Todo INFERIDO de código fuente, no observación renderizada.
- No se verificaron valores computados reales en pantalla (px efectivos, line-height
  renderizado).
- `contraste.py` valida los hex declarados, no si Tailwind los compiló correctamente
  al DOM.
