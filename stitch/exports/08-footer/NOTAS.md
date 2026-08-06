# 08 — Footer / página completa acumulada

**Prompt:** nº 7 de `stitch/prompts.md`
**Fecha:** 2026-08-05
**Devolvió:** la landing entera, 1600 × 10.783 px

## El hallazgo principal de todo el experimento

Stitch **no genera diseños independientes por prompt: acumula**. Cada uno de los siete
prompts añadió su sección a la misma página sin sustituir lo anterior. Por eso este
export contiene la landing completa, y por eso contiene duplicados.

**Consecuencia:** pedir sección por sección era el enfoque equivocado. Un único prompt
de página completa —el "Prompt maestro" que ahora encabeza `prompts.md`— habría dado el
mismo resultado sin duplicaciones y con dos generaciones en vez de ocho.

## Duplicados generados

| Sección | Versiones |
|---|---|
| El Arte del Tueste | Línea de tiempo de 4 pasos (**la buena**) + una variante con 4 iconos |
| Colección de Origen | Cafés inventados Loja/Intag/Zamora + los nuestros Vilcabamba/Palanda/Intag (**la buena**) |
| Suscripción | Formulario sobre fondo claro + el CTA marrón a todo el ancho (**el bueno**) |

## Secciones que inventó y que merecen quedarse

- **Nuestras Raíces** — retrato de un caficultor con cita y ubicación. Aporta la cara
  humana que a una landing de producto siempre le falta.
- **Elaborado con Intención** — bloque a dos mitades, fotografía de granos contra panel
  marrón sólido. Rompe el ritmo vertical en el punto justo.

Ninguna estaba en el plan. Es el aporte más claro de la herramienta junto con el
sistema de diseño de la iteración 01.

## Defectos a corregir al implementar

1. El botón "CONOCER EL ORIGEN" desborda su caja: el texto salta a dos líneas.
2. "Nuestra Historia" se parte en dos líneas en la navegación.
3. Las secciones de acento salieron **rosadas** (`#FFF8F6`), no crema. Es la desviación
   ya rechazada en la iteración 01: al implementar va `--color-surface-alt` (`#FDF6E9`).
4. Las imágenes de producto son marcos vacíos, sin fotografía.
5. Los datos de los cafés de la primera versión de la colección son inventados.

## Qué respetó

- [x] Bodoni Moda en titulares, Public Sans en cuerpo y etiquetas
- [x] Marrón de marca en botones y en el panel del CTA
- [x] Copy en español, con buen tono editorial
- [x] Layout asimétrico en la sección del origen
- [x] Espaciado vertical generoso
- [x] Iconos de línea, sin emojis
- [x] Fotografía a canto vivo
