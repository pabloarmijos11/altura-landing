# Altura — landing page

Landing page de una sola página para **Altura**, un tostador ficticio de café de
especialidad de origen ecuatoriano.

**Demo: https://altura-landing-nine.vercel.app**

**Informe técnico:** [el método de diseño, el sistema de tokens y la auditoría](docs/informe-tecnico.pdf)
(PDF, septiembre 2026)

Es un proyecto de práctica. Su propósito no es la marca sino el proceso: probar
**Google Stitch** como herramienta de diseño de interfaces y llevar el peso del
trabajo al diseño visual en vez de a la lógica. No tiene backend — el formulario de
suscripción no envía nada.

## Stack

- **Angular 21** con standalone components y signals
- **Tailwind CSS v4**, configurado con `@theme` en CSS (sin `tailwind.config.js`)
- Sin dependencias de animación: los efectos de scroll usan `IntersectionObserver`
  y transiciones CSS

## Cómo correrlo

Requiere Node 24 o superior.

```bash
npm install
npm start
```

Queda servido en `http://localhost:4200`.

Para generar el build de producción:

```bash
npm run build
```

## Estructura

```
altura-landing/
├─ CLAUDE.md                  # instrucciones para el agente
├─ design-system/altura/
│  └─ MASTER.md               # fuente de verdad del diseño: color, tipografía,
│                             # espaciado, motion y anti-patrones
├─ stitch/
│  ├─ prompts.md              # prompts usados en Google Stitch
│  └─ exports/                # capturas y exports que devolvió la herramienta
├─ public/images/             # fotografía optimizada (fase final)
└─ src/
   ├─ styles.css              # tokens de diseño en @theme, temas claro y oscuro
   └─ app/
      ├─ app.html             # apila las secciones; no hay routing
      ├─ components/          # una carpeta por sección
      ├─ directives/          # reveal-on-scroll
      └─ services/            # theme.ts — el tema claro/oscuro, en un signal
```

## Las ocho secciones

La página sigue un patrón de narración por scroll: cuenta el recorrido del café desde
la finca hasta la taza.

1. **Hero** — la marca y su claim
2. **El origen** — altitud y fincas
3. **El tueste** — el proceso, en línea de tiempo
4. **Nuestras Raíces** — la historia de la marca
5. **Colección de Origen** — los tres cafés
6. **Tu método** — V60, prensa francesa, espresso
7. **Suscripción** — la llamada a la acción
8. **Footer**

*Nuestras Raíces* no estaba en el plan: la añadió Stitch por su cuenta al generar el
diseño. Se quedó porque la narración lo pedía.

## Diseño

Toda decisión visual está documentada en `design-system/altura/MASTER.md`, generado
con la skill `ui-ux-pro-max` y corregido a mano. Ese archivo incluye una tabla de
overrides que explica qué se descartó de la salida automática de la herramienta y por
qué — es la parte más útil para entender el criterio detrás de la página.

**Tipografía:** Bodoni Moda para titulares, Public Sans para el cuerpo.
**Color:** marrón de tueste sobre crema, con paleta completa para modo oscuro.

La página funciona en modo claro y oscuro, es responsive de 375px a 1440px y respeta
`prefers-reduced-motion`.

## Créditos

Fotografía de [Unsplash](https://unsplash.com), bajo su licencia de uso libre.

Altura es una marca ficticia, creada para este ejercicio. No existe el tostador ni
los cafés que aparecen en la página.

## Licencia

[MIT](LICENSE).
