# Prompts para Google Stitch — Altura

Todos los prompts de abajo derivan de `design-system/altura/MASTER.md`. No le pedimos a
Stitch que invente la dirección visual: ya está decidida. Le pedimos que la ejecute.

## Cómo usarlos

1. Entra en [stitch.withgoogle.com](https://stitch.withgoogle.com) y crea un proyecto **Web**.
2. Pega el **Prompt 0** primero. Establece la identidad y sirve de contexto para todo lo demás.
3. Luego pide sección por sección (prompts 1 a 7), en orden.
4. Itera por chat sobre lo que salga (ver *Refinamientos*).
5. Guarda capturas en `stitch/exports/` con nombre `NN-seccion.png`.

**Dos decisiones sobre el idioma de los prompts:**

- Las **instrucciones van en inglés** porque el modelo rinde mejor y la herramienta está
  pensada en ese idioma.
- Los **textos de la página se piden en español**, porque el castellano ocupa alrededor
  de un 20% más de espacio que el inglés. Un diseño maquetado con copy en inglés se
  descuadra al traducirlo: los titulares saltan de línea y los botones se desbordan.

---

## Prompt 0 — Identidad de marca

```
A landing page for "Altura", a specialty coffee roaster from Ecuador. The brand sources
single-origin beans grown at high altitude in Loja, Zamora-Chinchipe and Intag.

Visual direction: editorial and premium, like a print magazine spread — not a startup
SaaS page. Generous whitespace, large expressive typography, full-bleed photography.
Calm and warm, never playful or cute.

Typography:
- Headings: Libre Bodoni, high contrast serif, tight leading, large sizes only
- Body and UI: Public Sans
- Small labels: Public Sans, uppercase, wide letter-spacing

Color palette (light mode):
- Background #FDFBF7 (warm off-white)
- Card surface #FFFFFF
- Accent surface #FDF6E9
- Primary text #2A1A10
- Secondary text #6B5545
- Brand / buttons #92400E (roast brown)
- Secondary accent #4F6F52 (deep green, for small details only)
- Borders #E8DCCB

All copy in Spanish. Generous vertical spacing between sections (64-96px).
Soft shadows, 8-12px border radius. No emojis anywhere — use line icons only.
```

---

## Prompt maestro — la página completa

**Este es el que hay que usar después del Prompt 0.** Genera la landing entera de una
sola vez.

Los prompts 1 a 7 que vienen después ya no sirven para generar: pasan a ser
**instrucciones de corrección** sobre la página que salga de aquí. Se usan solo en las
secciones que hayan salido mal, pegándolos con un "replace the X section with:" delante.

El motivo es de diseño, no de ahorro: el ritmo entre secciones —cuánto respira una
respecto a la siguiente, cómo alterna el fondo, cómo escala la tipografía a lo largo
del scroll— solo se puede resolver viendo la página completa. Siete secciones
generadas por separado salen correctas por su cuenta y descoordinadas en conjunto.

```
Now generate the complete landing page for Altura, applying the design system above.
Seven sections stacked vertically, in this order:

1. HERO — full viewport height, full-bleed photo of coffee cherries or a high-altitude
   farm with a warm dark overlay. Content left-aligned, max-width 640px: uppercase label
   "TOSTADO EN LOJA, ECUADOR", a huge two-line serif headline "El café crece mejor donde
   el aire es delgado", one short paragraph, and two buttons — solid brown "Ver la
   colección" and outlined "Conocer el origen". Buttons must be clearly visible against
   the photo at rest, not only on hover.

2. EL ORIGEN — off-white background. Asymmetric two-column editorial layout: text left
   (40%), tall vertical farm photograph right (60%). Label "CAPÍTULO 01", serif heading
   "1.800 metros sobre el nivel del mar", two paragraphs, and a metadata block with three
   stats: 1.800 m / ALTITUD MEDIA, 3 / FINCAS, 180 días / MADURACIÓN.

3. EL TUESTE — accent surface background to mark a change of scene. Horizontal timeline
   with four steps: Secado, Primer crack, Desarrollo, Enfriado. Each with a thin line
   icon, a serif step number, a short title, one sentence, and a temperature label
   (160°C, 196°C, 210°C, 25°C). Connected by a thin line with a dot at each node.
   On mobile it stacks vertically with the line running down the left.

4. LA COLECCIÓN — off-white background. Three product cards in a grid: square photo of a
   coffee bag, uppercase origin label, serif name, three tasting notes as pill chips,
   altitude, and price.
   · Vilcabamba — panela, naranja, cacao — 1.750 m — $14
   · Palanda — jazmín, durazno, miel — 1.900 m — $16
   · Intag — chocolate negro, nuez, ciruela — 1.600 m — $15
   Cards change background colour on hover. They do NOT lift or move.

5. TU MÉTODO — accent surface. Three tabs: V60, Prensa francesa, Espresso. The active
   tab shows a large line illustration of the device on the left and, on the right, four
   parameters in a two-column grid (Dosis, Agua, Temperatura, Tiempo) plus three numbered
   steps. Active tab marked with a solid underline.

6. SUSCRIPCIÓN — full-width brand brown background, cream text. Centred: serif headline
   "Un café nuevo cada mes", one supporting sentence, an email field with a solid white
   background and a solid cream button "Suscribirme". Below: "Sin permanencia. Cancela
   cuando quieras."

7. FOOTER — very dark warm brown. Four columns: the Altura wordmark with a one-line
   description, then link columns "Tienda", "Nosotros" and "Ayuda" with four links each.
   A bottom bar separated by a thin border with the copyright and three line icons.

Rules for the whole page:
- All copy in Spanish
- Alternate section backgrounds to mark the chapters, staying inside the palette
- 96px vertical padding between sections on desktop, 48px on mobile
- Photography with sharp corners (0 radius); only UI cards are rounded
- Very soft, highly diffused shadows — light on paper, not floating windows
- Thin line icons only, never filled, never emojis
- Design the mobile layout for every section, not only desktop
```

---

## Prompt 1 — Hero

```
Hero section, full viewport height. Full-bleed photograph of coffee cherries on the
branch or a high-altitude coffee farm, with a warm dark overlay for text legibility.

Layout: content aligned left, vertically centered, max-width 640px.
- Small uppercase label: "TOSTADO EN LOJA, ECUADOR"
- Huge Libre Bodoni headline, two lines: "El café crece mejor donde el aire es delgado"
- One short paragraph in Public Sans
- Two buttons side by side: solid brown primary "Ver la colección", and a secondary
  outline button "Conocer el origen"

Buttons must have solid backgrounds and be clearly visible against the photograph at
rest — not only on hover or focus.
```

---

## Prompt 2 — El origen

```
Second section, on the warm off-white background. Editorial two-column layout,
asymmetric: text on the left (40%), a tall vertical photograph of a mountain coffee
farm on the right (60%).

Left column:
- Uppercase label "CAPÍTULO 01"
- Libre Bodoni heading: "1.800 metros sobre el nivel del mar"
- Two body paragraphs in Spanish about altitude, slow ripening and sugar density
- A row of three statistics with large Bodoni numbers and small uppercase labels
  beneath: "1.800 m / ALTITUD MEDIA", "3 / FINCAS", "180 días / MADURACIÓN"

Plenty of whitespace. Nothing centered — this is an editorial layout, keep it asymmetric.
```

---

## Prompt 3 — El tueste

```
Third section, on the accent surface background #FDF6E9 to mark a change of scene.

A horizontal timeline with four steps showing the roasting process:
"Secado" → "Primer crack" → "Desarrollo" → "Enfriado"

Each step has: a thin line icon, a Bodoni step number, a short title, one sentence of
description, and a temperature label in small uppercase (160°C, 196°C, 210°C, 25°C).
The steps are connected by a thin horizontal line with a small dot at each node.

The line should feel like it fills progressively from left to right.
On mobile the timeline stacks vertically with the connecting line running down the left.
```

---

## Prompt 4 — La colección

```
Fourth section, back on the off-white background. Centered section header, then a
three-column grid of coffee product cards.

Each card: square product photograph of a coffee bag, a small uppercase origin label,
a Bodoni coffee name, three tasting notes shown as small pill-shaped tags, an altitude
line, and a price in Bodoni.

The three coffees:
- "Vilcabamba" — notas de panela, naranja y cacao — 1.750 m — $14
- "Palanda" — notas de jazmín, durazno y miel — 1.900 m — $16
- "Intag" — notas de chocolate negro, nuez y ciruela — 1.600 m — $15

Cards lift slightly on hover with a soft shadow. Two columns on tablet, one on mobile.
```

---

## Prompt 5 — Tu método

```
Fifth section on the accent surface. A tabbed interface with three tabs:
"V60", "Prensa francesa", "Espresso".

The selected tab shows: a large line illustration of the brewing device on the left,
and on the right a recipe with four parameters in a two-column grid (Dosis, Agua,
Temperatura, Tiempo) followed by three numbered steps.

The active tab is marked with a solid brown underline; inactive tabs are muted.
Tabs must be keyboard navigable with a clearly visible focus ring.
```

---

## Prompt 6 — Suscripción

```
Call-to-action section with a full-width warm brown #92400E background and cream text.

Centered content: a Bodoni headline "Un café nuevo cada mes", a short supporting
sentence, and an email capture form — a single input and a solid cream button reading
"Suscribirme".

The input has a solid white background so it is clearly visible against the brown at
rest. Below the form, one line of small text: "Sin permanencia. Cancela cuando quieras."
```

---

## Prompt 7 — Footer

```
Footer on a very dark warm brown background #17110D with cream text.

Four columns: the "Altura" wordmark in Libre Bodoni with a one-line description, then
three link columns titled "Tienda", "Nosotros" and "Ayuda" with four links each, all in
Spanish. A bottom bar separated by a thin border holds the copyright line and three
small social line icons.
```

---

## Refinamientos

Frases para iterar por chat cuando algo no salga bien. Casi siempre hace falta:

| Si pasa esto | Pídele |
|---|---|
| Titulares pequeños | `Make the headline dramatically larger — it should dominate the section.` |
| Todo centrado | `Break the symmetry: align content left and make the columns unequal.` |
| Secciones apretadas | `Increase vertical padding between sections to at least 96px.` |
| Aspecto de SaaS | `Less startup, more print magazine. Remove gradients and card borders.` |
| Emojis o iconos rellenos | `Replace all icons with thin line icons. No emojis.` |
| Colores que se desvían | `Use only these exact hex values: [pegar la paleta del Prompt 0].` |

## Modo oscuro

Cuando las siete secciones estén resueltas en claro:

```
Now generate a dark mode version of every section using this palette:
background #17110D, card surface #211913, accent surface #2B211A, primary text #F2E9DF,
secondary text #B8A695, brand #D98A4E, secondary accent #8FB393, borders #3A2C22.

The brand color is deliberately lighter than in light mode for contrast. Keep the
background warm dark brown — never pure black.
```

## Qué traer de vuelta

Para la fase E hacen falta:

- Una captura por sección en `stitch/exports/`, en escritorio
- Las que existan en móvil, sobre todo del tueste y la colección
- El export de código si Stitch lo ofrece — **como referencia de medidas y jerarquía,
  no para pegar**: viene con clases sueltas y sin estructura de tokens
- Y lo más valioso: **qué tuviste que pedirle varias veces**. Ahí está lo que la
  herramienta no hace sola, que es justamente lo que queríamos averiguar con esta prueba.
