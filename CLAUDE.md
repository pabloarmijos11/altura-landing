# CLAUDE.md — altura-landing (landing "Altura")

Instrucciones para trabajar en este proyecto. Este archivo dice **cómo trabajar**;
el vault (`../Vault Proyectos`) dice **qué se aprendió**. Si se contradicen, gana el vault.

> **La carpeta se llamaba `prueba-stich`** hasta el 2026-09-20; ahora coincide con
> el repositorio, `altura-landing`. En el vault la página y las fuentes **siguen**
> bajo el nombre viejo: renombrarlas rompería los wikilinks de media docena de
> notas, y las fuentes son capa inmutable. Si una ruta o un enlace de este archivo
> dice `prueba-stich`, no es un descuido.

---

## Qué es esto

Landing page de una sola página para **Altura**, un tostador ficticio de café de
especialidad de origen ecuatoriano (Loja, Zamora-Chinchipe, Intag).

El objetivo real no es la landing: es **probar Google Stitch** como herramienta de
diseño y darle protagonismo a las skills de diseño, que en proyectos anteriores
quedaron sin usar. Los proyectos previos fueron funcionales pero visualmente simples;
este invierte la prioridad.

Sin backend. El formulario de suscripción no envía nada.

## Stack

| Pieza | Versión | Nota |
|---|---|---|
| Node | 24.14.1 | |
| npm | 11.11.0 | |
| Angular | 21.2 | El `ng` global instalado es 21.2.7, aunque npm ya publique la 22. Misma versión que `prueba-landingpage` y `prueba-firestore`: las convenciones del vault aplican tal cual. |
| Tailwind CSS | 4.3.3 | Configuración vía `@theme` en CSS. **No crear `tailwind.config.js`** — eso es el modelo de v3. |

El CLI de Angular 21 nombra las clases **sin sufijo**: el servicio de tema es `Theme`
en `services/theme.ts`, no `ThemeService` en `theme.service.ts`. Es la convención del
CLI moderno; seguirla evita que los `ng generate` posteriores produzcan un árbol mixto.

Sin tests: se decidió explícitamente al aprobar el plan.

**Formularios: solo Signal Forms** (`@angular/forms/signals`, disponible desde el
`@angular/forms` 21.2 ya instalado — no es una dependencia nueva). Prohibido
`FormControl`/`FormGroup`/`FormArray`/`FormBuilder` del paquete clásico. Ver
`~/.claude/skills/angular-developer/references/signal-forms.md` antes de tocar
cualquier formulario nuevo — usado por primera vez en `subscribe.ts` (Fase G).

## Comandos

```bash
npm start          # servidor de desarrollo
npm run build      # build de producción
```

**Python se invoca con `py -3`**, nunca `python` ni `python3`: el alias de ejecución
de la Microsoft Store los intercepta y falla con "Python was not found". Afecta al
buscador de `ui-ux-pro-max`.

## Idioma

- **Código en inglés** — identificadores, componentes, ficheros, comentarios.
- **Textos de la interfaz en español** — es una marca ecuatoriana.
- Conversación y documentación, en español.

## Regla número uno

**Antes de tocar cualquier cosa visual, leer `design-system/altura/MASTER.md`.**

Es la fuente de verdad de color, tipografía, espaciado, motion y anti-patrones.
Contiene una sección de *overrides manuales* que explica qué se sobrescribió de la
salida automática de `ui-ux-pro-max` y por qué. **No regenerar ese archivo con
`--persist --force`**: revertiría los overrides en silencio.

Lección aprendida generándolo: `ui-ux-pro-max` busca por palabras clave, no diseña.
Tres consultas dieron tres desvíos (paleta de fintech, fuentes infantiles, scroll
horizontal). Su valor está en lo objetivo — espaciado, specs de componentes,
accesibilidad, anti-patrones — no en elegir la dirección visual.

## Arquitectura

- **Sin routing.** Una sola página; las secciones son componentes apilados en
  `app.html`, no rutas.
- **Sin servicios compartidos, salvo `ThemeService`** (signal con el tema claro/oscuro).
  El resto del estado vive en el componente que lo usa. Un servicio para estado que
  nadie comparte es sobreingeniería.
- **Standalone components** con signals.

```
src/
├─ styles.css                      # @theme con tokens light + dark
└─ app/
   ├─ app.html                     # apila las 7 secciones en orden
   ├─ components/
   │  ├─ hero/ origin/ roast/ collection/ brew/ cta/ footer/
   │  └─ shared/theme-toggle/
   ├─ directives/reveal-on-scroll.ts
   └─ services/theme.service.ts
```

## Reglas de código no negociables

1. **Solo tokens semánticos, nunca hex crudos ni utilidades de color de Tailwind
   sueltas** (`bg-amber-50` está prohibido; va `bg-surface`). Sin esto, el modo oscuro
   se convierte en una segunda hoja de estilos que se desincroniza.
2. **El modo oscuro no reutiliza los hex del claro.** Un token de marca es un rol, no
   un color fijo: `#92400E` sobre `#17110D` da ~2:1 de contraste.
3. **Animar solo `opacity` y `transform`.** Nunca `width`, `height`, `top` ni `margin`:
   disparan layout en cada frame.
4. **`prefers-reduced-motion` desde el primer componente animado**, no como parche final.
5. **Sin GSAP.** Los reveals y el stagger van con `IntersectionObserver` en
   `reveal-on-scroll.ts` + transiciones CSS. Reevaluar solo si el capítulo del tueste
   exige coreografía compleja.
6. **Nada de emojis como iconos.** SVG de Heroicons o Lucide.
7. **Contraste ≥ 4.5:1 verificado en ambos temas**, no solo en claro.
8. **Bodoni Moda nunca por debajo de 24px** — aunque su eje de tamaño óptico engorda
   los remates en tamaños pequeños, un serif de alto contraste sigue siendo mala
   elección para texto corrido. Texto pequeño siempre en Public Sans.
9. **Las tarjetas no se elevan al pasar el ratón: cambian de fondo.** El papel no
   levita. Usar `.card-editorial`, no sombras crecientes.
10. **Un control interactivo sin ninguna señal al pulsarlo no debe existir.**
    No hace falta que haga algo real (el proyecto no tiene backend), pero si no
    hay ni siquiera un estado de confirmación diseñado, no se añade el control.
    Así se detectó y se quitó el icono de carrito de la cabecera en la Fase G.
11. **Los tokens que cambian con el tema (`brand`, `accent`, `destructive`...) no
    valen automáticamente para elementos sobre `on-photo-surface`.** Esa
    superficie es blanca fija en los dos temas; un token calibrado para
    contrastar sobre fondos oscuros puede fallar sobre blanco fijo. Ver
    `--alt-on-photo-destructive` en `styles.css` como ejemplo — mismo
    razonamiento que ya tenían `on-photo-ink`/`on-photo-surface`.

## Referencias que hay que leer antes de tocar según qué

| Antes de… | Leer |
|---|---|
| configurar Tailwind en Angular | `~/.claude/skills/angular-developer/references/tailwind-css.md` |
| escribir estilos de componente | `.../angular-developer/references/component-styling.md` |
| animaciones de Angular | `.../angular-developer/references/angular-animations.md` |
| accesibilidad y ARIA | `.../angular-developer/references/angular-aria.md` |
| resolver contraste en modo oscuro | `ui-ux-pro-max/references/quick-reference.md` §6 |
| dar por terminada la UI | `ui-ux-pro-max/references/quick-reference.md` §1–§5 |

`ui-ux-pro-max` no vive en `~/.claude/skills/` como las de Angular: es una skill de
plugin y está en `~/.claude/plugins/cache/ui-ux-pro-max-skill/ui-ux-pro-max/<versión>/.claude/skills/ui-ux-pro-max/`.
La ruta lleva el número de versión dentro, así que localízala con `find` en vez de
copiarla.

**El checklist de entrega para esta landing es `quick-reference.md`, no `pro-rules.md`.**
`pro-rules.md` avisa en su segunda línea de que todo su contenido apunta a UI de app
nativa —safe areas, notch, gestos del sistema, tab bars— y remite a `quick-reference.md`
para web. Auditar una web contra él da falsos positivos y, peor, deja fuera lo que sí
aplica: `viewport-units`, `line-length`, `horizontal-scroll`, `nav-state-active`.

## Flujo con Google Stitch

1. Los prompts viven en `stitch/prompts.md` y se **derivan del `MASTER.md`**: llevan la
   paleta, las fuentes y la estructura ya decididas. No se le pide a Stitch que invente
   la dirección visual; se le pide que la ejecute.
2. Pablo los ejecuta en Stitch (yo no tengo acceso a la herramienta) y trae capturas o
   el export a `stitch/exports/`.
3. La implementación se reconstruye a mano en Angular. **El HTML exportado por Stitch no
   se pega tal cual**: trae clases sueltas sin estructura de tokens.

## Imágenes

Estrategia híbrida: **hotlink a `images.unsplash.com` mientras se construye**
(`?w=1600&q=75&fm=webp`), y descarga a `public/images/` ya optimizadas en la fase de
pulido, cuando esté decidido qué fotos se quedan.

`source.unsplash.com` **está descontinuado** — aparece en tutoriales viejos, no funciona.

**Las imágenes que genera Stitch** apuntan a `lh3.googleusercontent.com/aida/...` y por
defecto sirven una versión diminuta que a pantalla completa se ve pixelada. Añadiendo
**`=w2400`** al final de la URL devuelven la resolución completa (71 KB → 295 KB en la
foto del hero). Sin ese sufijo, cualquier imagen copiada de un export de Stitch se verá
mal. Son URLs temporales: sustituirlas por archivos locales antes de dar el proyecto por
terminado.

Toda imagen necesita `width`/`height` o `aspect-ratio` para no provocar CLS, y
`loading="lazy"` salvo la del hero.

## Despliegue

En producción desde el 2026-09-20: **https://altura-landing-nine.vercel.app**

Esa URL es un **dominio de proyecto**, no un alias. La diferencia importa: un alias
creado con `vercel alias set` queda clavado al despliegue que existía en ese momento
y seguiría sirviendo el build viejo para siempre, sin avisar. Si algún día hay que
añadir otro dominio, va con `add_project_domain`, nunca con `vercel alias set`.
(El sufijo `-nine` lo puso Vercel porque `altura-landing.vercel.app` ya estaba
cogido globalmente.)

**El despliegue es manual**: `vercel deploy --prod --yes`. No hay CI, y un push a
`master` no actualiza producción.

**`vercel link` escribe un `.env.local` con un `VERCEL_OIDC_TOKEN`** de 12 horas.
Este proyecto no lo usa para nada —no hay backend ni servicio externo al que
autenticarse—, así que se borra. Está cubierto por `.env*` en el `.gitignore`, pero
es una credencial menos en disco.

### Una ruta inventada devuelve 200, no 404

El `vercel.json` omite el `rewrites` a propósito, y el commit que lo introdujo
afirma que así una ruta inexistente daría 404 en vez de servir la portada.
**Es falso, comprobado en producción**: `/no-existe` devuelve 200 con la landing
entera. El preset `framework: "angular"` de Vercel aplica su propio fallback a
`index.html` aunque no se lo pidas; omitir `rewrites` no lo desactiva.

Se deja así: para una landing sin routing el efecto práctico es nulo, y el único
coste es que un buscador podría indexar URLs duplicadas. Queda escrito aquí porque
el mensaje de aquel commit ya no se puede corregir —está pusheado— y sin esta nota
la siguiente persona que lo lea creería algo que no es cierto.

## Estado del proyecto

- [x] Fase A — sistema de diseño persistido y corregido
- [x] Fase B — prompts de Stitch en `stitch/prompts.md`
- [ ] Fase C — ejecución en Stitch (Pablo)
- [x] Fase D — proyecto Angular + Tailwind + tokens + `Theme` + `RevealOnScroll`.
      `app.html` contiene una página temporal de verificación de tokens que se
      reemplaza por las siete secciones en la fase E.
- [x] Fase E — 8 secciones implementadas (las 7 del plan + Nuestras Raíces, que
      inventó Stitch). Componentes: `site-header`, `hero`, `origin`, `roast`,
      `roots`, `collection`, `brew`, `subscribe`, `site-footer`.
- [x] Fase F — imágenes locales en WebP (`public/images/`, ya no dependen de
      servidores externos), contraste verificado por cálculo en ambos temas
      (todos los pares ≥ 4.5:1) y correcciones de móvil en hero y cabecera.
- [x] Fase G — auditoría final. Checklist técnico (`quick-reference.md`) y
      auditoría Dieter Rams (`claude-mem:design-is`, 15/30 → veredicto REDESIGN
      de la capa de interacción y contenido, no de la identidad visual — ver
      `DESIGN-IS-2026-08-06/`) ya ejecutados. El plan de redesign
      (`plans/01-redesign-interaccion-contenido.md`, 5 fases) está implementado
      por completo y verificado en navegador real.
- [x] Fase H — publicación (2026-09-20): licencia MIT, README corregido,
      `vercel.json` y despliegue en producción. Ver «Despliegue» más arriba.

---

## Decisión registrada: el pie de página no se tocó en la Fase G

La auditoría Rams marcó los 15 enlaces del pie (`href="#"` literal) como
discrepancia etiqueta→comportamiento. Al planificar el redesign, Pablo decidió
explícitamente **dejarlos como están** — no es un olvido, es una decisión
tomada con el trade-off a la vista. Motivo probable: el proyecto no tiene
routing y no hay destinos reales a los que apuntar todavía. Si el proyecto
gana rutas o contenido real en el futuro, este es el punto a reabrir.

El carrito de la cabecera sí se quitó (mismo hallazgo, decisión distinta): sin
concepto de carrito en ningún otro punto de la app, mantenerlo habría sido
inventar una promesa que la página no puede cumplir.

## Por dónde seguir (sesión del 2026-08-06)

La página está **completa y funcionando**, con el redesign de la Fase G ya
implementado: cabecera sin carrito, vocabulario de botones consolidado a los
patrones de `MASTER.md`, iconos sin duplicar significado, formulario de
suscripción con Signal Forms (vacío/error/carga/éxito), y los 5 superlativos
del copy reemplazados por afirmaciones verificables. Build de producción:
68,43 kB transferidos (61,96 kB JS + 6,47 kB CSS) — sube desde los 53,57 kB
previos a la Fase G por `@angular/forms/signals`, justificado y dentro del
umbral cómodo para el principio de peso/fricción de la auditoría (<100 kB).

**Responsive y modo oscuro verificados en navegador real — sin problemas.**
375 / 768 / 1024 / 1440px, y los cuatro puntos nuevos de la Fase G (error del
formulario con el token `on-photo-destructive`, botón de colección con su
nuevo color, icono de gota en "Secado", cabecera sin carrito) confirmados por
Pablo el 2026-08-06.

**Lo que queda, en orden:**

1. ~~Decidir si esto va a Git.~~ Resuelto: el proyecto está en GitHub como
   `github.com/pabloarmijos11/altura-landing`.
2. ~~Ingerir al vault.~~ Resuelto el 2026-08-06 (commit `57682de` del vault,
   "Ingerir prueba-stich"): el material sobre Google Stitch, la auditoría con
   el método Rams y Signal Forms ya está en el vault. Ver la sección
   siguiente para el detalle de dónde vivía cada cosa.

**Para el vault, cuando se cierre el proyecto**, el material está en:
- `stitch/exports/01-identidad-base/NOTAS.md` — qué respetó, qué se desvió y qué
  aportó de su propia cosecha.
- `stitch/exports/08-footer/NOTAS.md` — el hallazgo principal: Stitch **acumula**,
  no genera pantallas independientes; de ahí las secciones duplicadas.
- La tabla de overrides de `design-system/altura/MASTER.md`.
- `DESIGN-IS-2026-08-06/` — la auditoría Rams completa (evidencia, marcador,
  veredicto) y `plans/01-redesign-interaccion-contenido.md` — cómo se tradujo
  un veredicto de auditoría en fases ejecutables.
- Conceptos nuevos que darían página propia: *Google Stitch*, *Imágenes
  responsive con srcset*, *Tokens semánticos y modo oscuro*, *Auditoría de
  diseño con los diez principios de Dieter Rams*, *Angular Signal Forms*.
