# Plan — Rediseño de interacción y contenido, landing Altura

Origen: `DESIGN-IS-2026-08-06/` (auditoría Dieter Rams, 15/30, veredicto REDESIGN).
Este plan cubre solo la capa de interacción y contenido — **no toca** tokens de
color, tipografía, layout de secciones ni modo oscuro (esos puntuaron 3/3 en la
auditoría y están fuera de alcance).

Cada fase está pensada para ejecutarse en una sesión nueva, sin memoria de esta
conversación: trae sus propias referencias de documentación y su propio checklist
de verificación.

---

## Decisiones de alcance tomadas antes de planificar

Dos preguntas que la auditoría dejó abiertas se resolvieron con Pablo antes de
escribir este plan:

1. **Carrito de la cabecera → se elimina.** No existe concepto de carrito en
   ninguna parte de la app (sin checkout, sin routing). Añadirle comportamiento
   sería inventar una promesa que la página no puede cumplir; darle un atajo a
   la colección duplicaría el enlace "Productos" del nav. Se retira el icono.

2. **Los 15 enlaces del pie de página (href="#") se quedan como están.**
   Decisión explícita de Pablo, **no un olvido**: este pase no toca el pie de
   página. Eso deja parcialmente sin cerrar el hallazgo #6/#2 de la auditoría
   (discrepancia etiqueta→comportamiento en esos 15 enlaces) — se documenta aquí
   para que quien retome el proyecto sepa que es una decisión tomada, no un hueco
   olvidado, y pueda reabrirlo si cambia el contexto (p. ej. si el proyecto gana
   routing y esos enlaces pueden apuntar a algo real).

---

## Fase 0 — Descubrimiento de documentación (ya resuelto en esta sesión)

**API permitida, citada:**

- **Angular 21 Signal Forms** (`@angular/forms/signals`) es la única forma de
  formularios permitida en este proyecto según
  `~/.claude/skills/angular-developer/references/signal-forms.md`. Cita textual
  de esa referencia: *"You MUST use Angular's new Signal Forms API for all
  form-related functionality. Do NOT use null as a value or type of any fields."*
  — **prohibido** `FormControl`/`FormGroup`/`FormArray`/`FormBuilder` de
  `@angular/forms` clásico.
  - `form(model, schemaFn)` crea el formulario a partir de un signal modelo.
  - Validadores en el schema: `required(path, {message})`, `email(path,
    {message})`.
  - `disabled(path, {when: ({valueOf}) => boolean})` para deshabilitar
    condicionalmente.
  - `[formField]` en el input, importando `FormField` — **prohibido** poner
    `[disabled]`, `[value]` a mano sobre un input con `[formField]` (ya lo
    gestiona la directiva).
  - `submit(form, async () => {...})` — marca todos los campos como tocados y
    solo corre el callback si el formulario es válido; el callback **debe** ser
    `async` y devolver una promesa.
  - Señales de estado: `field().valid()`, `field().invalid()`,
    `field().errors()`, `field().touched()`, `field().dirty()`,
    `form().pending()` (para el estado de carga, incluso sin backend real: un
    `await` corto dentro del callback de `submit()` genera un `pending()`
    honesto sin fingir que los datos van a alguna parte).

- **`ui-ux-pro-max/references/quick-reference.md` §8 Forms & Feedback** (ya
  consultado en la fase de auditoría): `input-labels`, `error-placement`
  (error debajo del campo), `disabled-states` (opacidad 0.38–0.5 + cambio de
  cursor), `inline-validation` (validar en blur, no en cada tecla), `focus-management`
  (tras error de envío, foco al primer campo inválido).

- **`design-system/altura/MASTER.md` §Component Specs** ya documenta el
  vocabulario de botones que hay que usar como destino de la consolidación:
  `.btn-primary` (fondo `--color-primary`, texto `--color-on-primary`),
  `.btn-secondary` (transparente, borde y texto `--color-primary`), y la nota
  "sobre imágenes o fondos de color, los botones llevan `--color-surface`
  sólido + `shadow-sm`" (esto ya es el patrón `on-photo-surface` que existe en
  el código). **No hay que inventar un cuarto patrón** — los tres ya están
  especificados, solo hay que hacer que el código los siga de verdad.

**Anti-patrones detectados para evitar en la implementación:**
- No usar `FormControl`/`ngModel` clásico — contradice la skill del proyecto.
- No inventar un `--color-danger` o similar sin comprobar que ya existe
  `--color-destructive: #DC2626` documentado en `MASTER.md:66` (no está en
  `styles.css` todavía — hay que añadirlo como token, no como hex suelto).
- No animar el mensaje de error con algo distinto de opacity/transform (regla
  no negociable #3 del `CLAUDE.md` del proyecto).

---

## Fase 1 — Quitar el carrito de la cabecera

**Qué implementar:** eliminar el botón de carrito completo de `site-header.html`
(actualmente líneas 89-99, sin `(click)` ni handler — ver
`DESIGN-IS-2026-08-06/01-evidence.md` §Estructural). No queda icono sustituto:
la cabecera pasa a tener nav + logo + toggle de tema + hamburguesa, que es
exactamente lo que la página ofrece.

**Archivos:**
- `src/app/components/site-header/site-header.html` — quitar el `<button>` del
  carrito.
- `src/app/components/site-header/site-header.ts` — no requiere cambios (el
  botón no tenía handler que limpiar).

**Verificación:**
- `grep -n "carrito" src/app/components/site-header/*` no debe devolver nada.
- El layout de la cabecera (los tres `flex-1` que reparten nav/logo/acciones)
  sigue centrando el logo correctamente con un icono menos — revisar en
  375px y 1440px que no queda un hueco asimétrico.

**Guardas anti-patrón:**
- No convertir el hueco en un espacio vacío decorativo — el contenedor debe
  seguir centrando el logo con los elementos que quedan, no dejar un `<div>`
  fantasma del tamaño del botón antiguo.

---

## Fase 2 — Consolidar el vocabulario de botones

**Qué implementar:** copiar los tres patrones ya especificados en
`design-system/altura/MASTER.md` §Component Specs (líneas 159-184) y hacer que
las 6 variantes actuales caigan en uno de los tres, no inventar una cuarta.

Mapeo (de `01-evidence.md` §Estructural, "Patrones repetidos"):

| Uso actual | Archivo:línea | Patrón destino |
|---|---|---|
| "Ver la colección" (hero) | `hero.html:56` | `.btn-primary` (ya lo es — `bg-brand`) |
| "Conocer el origen" (hero) | `hero.html:66` | patrón on-photo (ya lo es — `bg-on-photo-surface`) |
| "Suscribirme" (subscribe) | `subscribe.html:36` | patrón on-photo (ya lo es) |
| "Añadir al carrito" (collection) | `collection.html:51` | **cambia** de `border-ink/text-ink` a `.btn-secondary` (`border-primary`/`text-primary`, es decir `border-brand`/`text-brand` en las clases del proyecto) |
| Nav subrayado (header, roots, footer) | 3 sitios | se queda igual — es un enlace de texto, no un botón, categoría propia y correcta |
| Botones cuadrados solo-icono (tema, hamburguesa) | `site-header.html` | se queda igual — icono de acción de interfaz, no CTA, categoría propia y correcta |
| Tabs de brew | `brew.html:29` | se queda igual — patrón de navegación por pestañas, no CTA |

Solo un cambio real de código: `collection.html:51`, de `border-ink
text-ink ... hover:bg-ink hover:text-background` a `border-brand text-brand
... hover:bg-brand hover:text-on-brand` — alinea el único botón que se
desviaba del `.btn-secondary` documentado.

**Archivos:**
- `src/app/components/collection/collection.html`

**Verificación:**
- Ejecutar `py -3 scripts/contraste.py` — el cambio de `border-ink/text-ink` a
  `border-brand/text-brand` cambia el color del texto; confirmar que el par
  "marca sobre tarjeta" (ya existe en el script para otros contextos) sigue en
  PASS con este nuevo uso. Si no hay un par exacto, añadirlo al script como se
  hizo con la confirmación "Añadido" en la sesión anterior.
- Revisar visualmente en claro y oscuro que el botón se distingue del fondo
  de la tarjeta en reposo (regla de `MASTER.md:182-184`: los botones deben
  distinguirse en reposo, no solo al enfocarlos).

**Guardas anti-patrón:**
- No crear una cuarta variante de botón "por si acaso" — el objetivo es que
  las 6 formas encontradas se expliquen con los 3 patrones documentados.
- No tocar `link-underline` ni los botones cuadrados de icono: son categorías
  de interfaz legítimamente distintas de un CTA, no parte de esta
  consolidación.

---

## Fase 3 — Separar el icono duplicado (sol)

**Qué implementar:** el path SVG del sol es idéntico en dos sitios con
significado distinto — `roast.html:23-26` (paso "Secado", 160°C) y
`site-header.html:78-81` (toggle de "modo claro"). El toggle de tema se queda
con el sol (es la convención universal para modo claro; cambiarla dañaría más
la comprensión de lo que arregla). El paso "Secado" cambia a un icono de gota
de humedad, que además encaja mejor con la descripción real del paso
(`roast.ts:26`: "El grano pierde humedad") — el sol nunca fue la metáfora más
precisa para esa fase, el tueste ocurre en un tambor cerrado, no al sol.

**Archivos:**
- `src/app/components/roast/roast.ts` — cambiar el tipo `RoastIcon` de `'sun'
  | 'fire' | 'bean' | 'snow'` a `'droplet' | 'fire' | 'bean' | 'snow'`, y el
  `icon: 'sun'` del primer paso a `icon: 'droplet'`.
- `src/app/components/roast/roast.html` — reemplazar el `@case ('sun')` por
  `@case ('droplet')` con un nuevo path, manteniendo el mismo estilo de trazo
  del resto (`viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round"`,
  sin relleno):
  ```html
  @case ('droplet') {
    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 3c3 4 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 3-7 6-11z" />
    </svg>
  }
  ```

**Verificación:**
- `grep -rn "'sun'" src/app/components/roast/` no debe devolver nada.
- `grep -rn "M12 2v2M12 20v2" src/app/components/` debe devolver exactamente
  una coincidencia (el toggle de tema), no dos.
- Comprobar visualmente que el nuevo icono se ve consistente en tamaño y
  grosor de trazo junto a los otros tres (fuego, grano, copo de nieve) en
  375px y 1440px.

**Guardas anti-patrón:**
- No introducir un icono de librería externa (Heroicons/Lucide como paquete)
  — el resto de iconos del proyecto son SVG a mano inline; mezclar fuentes de
  icono rompería la consistencia de trazo (regla `icon-style-consistent` de
  `quick-reference.md` §4).

---

## Fase 4 — Formulario de suscripción: estados con Signal Forms

**Qué implementar:** migrar `subscribe.ts`/`subscribe.html` del `signal`
suelto + `(submit)` actual a Signal Forms, copiando el patrón de
`signal-forms.md` (Fase 0), y diseñar los 4 estados que hoy faltan: error,
carga, deshabilitado. El estado de éxito ya existe y se conserva tal cual
(`@if (submitted())`, `role="status"`).

**Diseño de los 4 estados nuevos** (deliverable del plan, no solo código):

- **Error:** si el email no es válido y el campo fue tocado, aparece un
  mensaje debajo del input (`error-placement` de `quick-reference.md` §8),
  en un color derivado de `--color-destructive` (token nuevo, ver Fase 0) con
  contraste verificado, y el input recibe un borde en ese mismo color. El
  error se anuncia con `role="alert"` para que un lector de pantalla lo
  detecte sin estar enfocado ahí.
- **Carga:** al enviar, `form().pending()` es verdadero durante un `await`
  corto (300-500ms — no es fingir un backend, es una latencia de interacción
  normal incluso en apps sin red) dentro del callback `async` de `submit()`.
  El botón muestra un spinner o cambia su texto a "Enviando…" y se deshabilita
  mientras tanto (evita doble envío).
- **Deshabilitado:** el botón "Suscribirme" usa `disabled(schemaPath.email,
  {when: ...})`-equivalente a nivel de formulario — en Signal Forms el patrón
  es leer `form().invalid()` en la plantilla y aplicar `[disabled]` al botón
  cuando el campo está vacío o inválido y ya fue tocado. Opacidad 0.5 +
  `cursor-not-allowed`, siguiendo `disabled-states` de `quick-reference.md` §8.
- **Éxito:** sin cambios — ya cumple.

**Archivos:**
- `src/app/components/subscribe/subscribe.ts` — reescribir con `form()`,
  modelo `signal({ email: '' })` (nunca `null`, ver Fase 0), validadores
  `required` + `email`, y `submit()` con el `await` de latencia simulada.
- `src/app/components/subscribe/subscribe.html` — `[formField]="form.email"`
  en el input (quitar `name`/`required` manuales, los gestiona la
  directiva), bloque de error condicionado a `form.email().touched() &&
  form.email().invalid()`, botón con `[disabled]` condicionado a
  `form().invalid()`.
- `src/styles.css` — añadir `--alt-destructive` (claro y oscuro, con su par
  de contraste calculado) y mapearlo en `@theme inline` como `--color-destructive`.
- `scripts/contraste.py` — añadir el par nuevo "texto de error sobre fondo"
  y "borde de error sobre tarjeta", igual que se hizo con la confirmación
  "Añadido" en la sesión anterior.

**Verificación:**
- `py -3 scripts/contraste.py` — todos los pares en PASS, incluidos los
  nuevos de error.
- Probar a mano: campo vacío + submit → error "correo requerido"; email sin
  `@` + blur → error "correo inválido"; email válido + submit → botón
  deshabilitado y en estado de carga ~300-500ms → mensaje de éxito.
- Confirmar con `grep -rn "FormControl\|FormGroup\|FormBuilder"
  src/app/components/subscribe/` que no aparece nada — solo Signal Forms.
- Con `prefers-reduced-motion` activado, el estado de carga debe seguir
  siendo legible sin animación de spinner girando indefinidamente (usar un
  texto "Enviando…" como fallback, no solo un spinner CSS).

**Guardas anti-patrón:**
- No usar `null`/`undefined` en el modelo del formulario — Signal Forms lo
  prohíbe explícitamente.
- No poner `[value]`, `[disabled]` o `required` a mano sobre el input que ya
  tiene `[formField]` — la directiva los gestiona.
- El `await` de latencia simulada no debe presentarse en ningún texto como
  "enviando tu correo a nuestro servidor" — el copy debe seguir dejando claro
  que es una demo (ya lo hace: "no hay backend" está en el comentario del
  código, no hace falta que esté en la UI, pero tampoco hay que añadir texto
  que sugiera lo contrario).

---

## Fase 5 — Copy: reemplazar los 5 superlativos

**Qué implementar:** reescribir los 5 textos señalados en la auditoría con
afirmaciones concretas y verificables (datos que ya existen en el propio
contenido de la página — altitud, región, proceso — en vez de adjetivos
comparativos sin respaldo).

| Archivo:línea | Texto actual | Reemplazo propuesto |
|---|---|---|
| `hero.html:51` | "...perfiles de sabor **inigualables**" | "...perfiles de sabor marcados por la altitud y el suelo volcánico" |
| `origin.html:24` | "...una dulzura que **simplemente no puede replicarse** en tierras bajas" | "...una dulzura que la maduración lenta de la altura hace posible" |
| `roots.html:11` | "...perfiles de sabor **extraordinariamente complejos**" | "...perfiles de sabor que cambian de una finca a otra" |
| `collection.html:7` | "...nuestras regiones cafetaleras **más excepcionales**" | "...tres regiones cafetaleras de Ecuador: Loja, Zamora-Chinchipe e Imbabura" |
| `site-footer.html:7` | "**Elevando el estándar** del café ecuatoriano" | "Café de especialidad de origen ecuatoriano" |

Estos reemplazos son una propuesta de partida, no un texto final — al
ejecutar esta fase, revisar con Pablo antes de dar por cerrado el copy (es
contenido de marca, no un detalle técnico).

**Archivos:**
- `src/app/components/hero/hero.html`
- `src/app/components/origin/origin.html`
- `src/app/components/roots/roots.html`
- `src/app/components/collection/collection.html`
- `src/app/components/site-footer/site-footer.html`

**Verificación:**
- `grep -rn "inigualable\|simplemente no puede\|extraordinariamente\|más excepcionales\|elevando el estándar" src/app/components/` no debe devolver nada.
- Lectura completa de las 5 secciones en voz alta (o pedirle a alguien que no
  conozca el proyecto que las lea) — el criterio de honestidad de Rams es que
  cada afirmación se sostenga sola, sin depender de la buena fe del lector.

**Guardas anti-patrón:**
- No sustituir un superlativo por otro más discreto pero igual de vacío
  ("excelente", "increíble") — el reemplazo debe ser un dato o una relación
  causal verificable dentro del propio contenido de la página.

---

## Fase final — Verificación de cierre

1. **Regresión de accesibilidad:** volver a correr `py -3 scripts/contraste.py`
   — todos los pares en PASS, incluidos los 2-4 nuevos de las fases 2 y 4.
2. **Build limpio:** `npm run build` sin errores ni warnings nuevos; anotar el
   tamaño del bundle transferido y compararlo con el basal de la auditoría
   (47,40 kB JS / 6,16 kB CSS transfer) — no debería crecer de forma
   significativa (Signal Forms es parte de `@angular/forms`, ya en el
   ecosistema de Angular, no una dependencia nueva).
3. **Grep de anti-patrones:**
   - `grep -rn "FormControl\|FormGroup\|FormBuilder" src/app/` → sin resultados.
   - `grep -rn "href=\"#\"" src/app/components/site-header/` → sin resultados
     (el carrito ya no existe; si queda algún `href="#"` suelto en el logo,
     es una decisión ya tomada y fuera de este pase, no un olvido).
   - `grep -rn "'sun'" src/app/components/roast/` → sin resultados.
4. **Checklist de estados** (el que motivó el 0/3 en #8 minucioso): confirmar
   que el formulario de suscripción cubre ahora vacío/error, carga, éxito,
   foco y deshabilitado — 5 de 6 (el estado "vacío" de una lista no aplica al
   formulario; si se quiere cubrir también en `collection` con los 3 cafés
   hardcodeados, queda fuera de este pase por no ser un caso real hoy).
5. **Responsive:** repetir la verificación en 375/768/1024/1440px que quedó
   pendiente tras la auditoría técnica anterior — con la cabecera sin el
   icono de carrito y el botón de colección con nuevo color, confirmar que
   nada se desalinea.
6. **Actualizar `CLAUDE.md`** del proyecto: mover el estado de "Fase G —
   auditoría final" a completado, anotar la migración a Signal Forms como
   convención del proyecto (para que un `ng generate` o un componente nuevo
   con formulario la siga por defecto), y dejar registrada la decisión de no
   tocar el pie de página en este pase.
