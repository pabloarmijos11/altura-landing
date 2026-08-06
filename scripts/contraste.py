"""Comprueba los ratios de contraste WCAG de los tokens de Altura."""


def srgb_to_linear(c):
    c = c / 255
    return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4


def luminance(hex_color):
    h = hex_color.lstrip("#")
    r, g, b = (int(h[i:i + 2], 16) for i in (0, 2, 4))
    return 0.2126 * srgb_to_linear(r) + 0.7152 * srgb_to_linear(g) + 0.0722 * srgb_to_linear(b)


def ratio(fg, bg):
    l1, l2 = luminance(fg), luminance(bg)
    lo, hi = sorted((l1, l2))
    return (hi + 0.05) / (lo + 0.05)


def mix(fg, bg, alpha):
    """Color resultante de fg con opacidad alpha sobre bg."""
    f = fg.lstrip("#")
    b = bg.lstrip("#")
    out = []
    for i in (0, 2, 4):
        cf, cb = int(f[i:i + 2], 16), int(b[i:i + 2], 16)
        out.append(round(cf * alpha + cb * (1 - alpha)))
    return "#{:02x}{:02x}{:02x}".format(*out)


LIGHT = {
    "bg": "#FDFBF7", "surface": "#FFFFFF", "surface_alt": "#FDF6E9",
    "ink": "#2A1A10", "ink_muted": "#6B5545", "brand": "#92400E",
    "on_brand": "#FFFFFF", "accent": "#4F6F52", "border": "#E8DCCB",
}
DARK = {
    "bg": "#17110D", "surface": "#211913", "surface_alt": "#2B211A",
    "ink": "#F2E9DF", "ink_muted": "#B8A695", "brand": "#D98A4E",
    "on_brand": "#1A120C", "accent": "#8FB393", "border": "#3A2C22",
}
FOOTER = {"surface": "#17110D", "ink": "#F2E9DF", "muted": "#B8A695", "border": "#3A2C22"}

UMBRAL_TEXTO = 4.5
UMBRAL_GRANDE = 3.0


def check(label, fg, bg, umbral=UMBRAL_TEXTO):
    r = ratio(fg, bg)
    estado = "OK  " if r >= umbral else "FALLA"
    print(f"  {estado} {r:5.2f}:1  (min {umbral})  {label}")
    return r >= umbral


fallos = 0
for nombre, T in (("MODO CLARO", LIGHT), ("MODO OSCURO", DARK)):
    print(f"\n=== {nombre} ===")
    pruebas = [
        ("texto principal sobre fondo", T["ink"], T["bg"], UMBRAL_TEXTO),
        ("texto principal sobre tarjeta", T["ink"], T["surface"], UMBRAL_TEXTO),
        ("texto secundario sobre fondo", T["ink_muted"], T["bg"], UMBRAL_TEXTO),
        ("texto secundario sobre acento", T["ink_muted"], T["surface_alt"], UMBRAL_TEXTO),
        ("texto secundario sobre tarjeta", T["ink_muted"], T["surface"], UMBRAL_TEXTO),
        ("marca sobre fondo", T["brand"], T["bg"], UMBRAL_TEXTO),
        ("marca sobre acento", T["brand"], T["surface_alt"], UMBRAL_TEXTO),
        ("texto sobre boton de marca", T["on_brand"], T["brand"], UMBRAL_TEXTO),
        ("titular grande sobre acento", T["ink"], T["surface_alt"], UMBRAL_GRANDE),
        # Confirmacion de "Anadido" en las tarjetas de cafe: texto y borde en
        # acento sobre la tarjeta. El borde solo necesita 3:1 (elemento grafico).
        ("confirmacion anadido sobre tarjeta", T["accent"], T["surface"], UMBRAL_TEXTO),
        ("borde de confirmacion sobre tarjeta", T["accent"], T["surface"], UMBRAL_GRANDE),
        # Boton "Anadir al carrito" (estado en reposo): texto y borde en marca
        # sobre la tarjeta, consolidado al patron .btn-secondary de MASTER.md.
        ("boton anadir (texto) sobre tarjeta", T["brand"], T["surface"], UMBRAL_TEXTO),
        ("boton anadir (borde) sobre tarjeta", T["brand"], T["surface"], UMBRAL_GRANDE),
    ]
    for label, fg, bg, umbral in pruebas:
        if not check(label, fg, bg, umbral):
            fallos += 1

    # Chip de nota de cata: acento al 10% sobre la tarjeta
    chip_bg = mix(T["accent"], T["surface"], 0.10)
    if not check(f"chip de cata (fondo calculado {chip_bg})", T["accent"], chip_bg):
        fallos += 1

print("\n=== PIE (oscuro en ambos temas) ===")
for label, fg in (("texto del pie", FOOTER["ink"]), ("enlaces del pie", FOOTER["muted"])):
    if not check(label, fg, FOOTER["surface"]):
        fallos += 1

print("\n=== SOBRE FOTOGRAFIA ===")
if not check("boton claro del hero", "#2A1A10", "#FFFFFF"):
    fallos += 1

print("\n=== FORMULARIO DE SUSCRIPCION (on-photo, blanco fijo en ambos temas) ===")
ON_PHOTO_DESTRUCTIVE = "#DC2626"
ON_PHOTO_SURFACE = "#FFFFFF"
if not check("texto de error sobre input", ON_PHOTO_DESTRUCTIVE, ON_PHOTO_SURFACE):
    fallos += 1
if not check("borde de error sobre input", ON_PHOTO_DESTRUCTIVE, ON_PHOTO_SURFACE, UMBRAL_GRANDE):
    fallos += 1

print(f"\n{'TODO CORRECTO' if fallos == 0 else str(fallos) + ' PAR(ES) POR DEBAJO DEL UMBRAL'}")
