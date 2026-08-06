---
name: Altura Editorial System
colors:
  surface: '#fff8f6'
  surface-dim: '#e8d6cf'
  surface-bright: '#fff8f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff1eb'
  surface-container: '#fdeae3'
  surface-container-high: '#f7e4dd'
  surface-container-highest: '#f1dfd8'
  on-surface: '#231a15'
  on-surface-variant: '#55433a'
  inverse-surface: '#392e2a'
  inverse-on-surface: '#ffede6'
  outline: '#887269'
  outline-variant: '#dcc1b6'
  surface-tint: '#9a4614'
  primary: '#712c00'
  on-primary: '#ffffff'
  primary-container: '#92400e'
  on-primary-container: '#ffc2a5'
  inverse-primary: '#ffb693'
  secondary: '#466649'
  on-secondary: '#ffffff'
  secondary-container: '#c5e9c5'
  on-secondary-container: '#4a6a4d'
  tertiary: '#00446d'
  on-tertiary: '#ffffff'
  tertiary-container: '#005c92'
  on-tertiary-container: '#a8d3ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbcb'
  primary-fixed-dim: '#ffb693'
  on-primary-fixed: '#341000'
  on-primary-fixed-variant: '#7a3000'
  secondary-fixed: '#c8ecc8'
  secondary-fixed-dim: '#acd0ad'
  on-secondary-fixed: '#03210b'
  on-secondary-fixed-variant: '#2f4e33'
  tertiary-fixed: '#cee5ff'
  tertiary-fixed-dim: '#98cbff'
  on-tertiary-fixed: '#001d33'
  on-tertiary-fixed-variant: '#004a77'
  background: '#fff8f6'
  on-background: '#231a15'
  surface-variant: '#f1dfd8'
typography:
  display-lg:
    fontFamily: Bodoni Moda
    fontSize: 64px
    fontWeight: '600'
    lineHeight: 72px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Bodoni Moda
    fontSize: 48px
    fontWeight: '500'
    lineHeight: 56px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  headline-md:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  body-lg:
    fontFamily: Public Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 32px
  body-md:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Public Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.15em
  button:
    fontFamily: Public Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  section-gap-desktop: 96px
  section-gap-tablet: 64px
  section-gap-mobile: 48px
  stack-gap: 24px
  gutter: 24px
  margin-desktop: 80px
---

## Brand & Style

This design system is anchored in the aesthetic of high-end editorial coffee journals and premium print magazines. It prioritizes a calm, warm, and sophisticated atmosphere through a "New Minimalist" approach—combining traditional serif elegance with modern functional clarity. 

The visual direction draws heavily from tactile print media: generous margins, high-contrast typography, and a palette inspired by natural coffee processing. The emotional response is one of craftsmanship, expertise, and quiet luxury. It avoids digital "noise" (no emojis, no heavy gradients) in favor of structured whitespace and intentional, thin-line iconography.

## Colors

The palette is derived from the coffee roasting process and the Ecuadorian landscape. 
- **Primary (#92400E):** A deep roast brown used for calls to action and key brand moments.
- **Secondary Accent (#4F6F52):** A muted forest green representing the raw coffee cherry and high-altitude origin.
- **Typography:** Text uses a rich espresso-black (#2A1A10) for maximum readability against the warm off-white background (#FDFBF7), avoiding pure blacks to maintain the soft, organic feel.
- **Borders:** Subtle tan lines (#E8DCCB) provide structure without breaking the visual flow of the page.

## Typography

The typography leverages the high contrast between **Bodoni Moda** (replacing Libre Bodoni for better digital rendering) and **Public Sans**. 

- **Headlines:** Use serif fonts for all storytelling and product titles. For large display sizes, use the italic variants of the serif font to emphasize the "Editorial" feel.
- **Body:** Public Sans provides a neutral, highly legible contrast to the decorative headlines. 
- **Labels:** Small labels and metadata must always be in uppercase with wide letter-spacing to mimic traditional print captions.
- **Hierarchy:** Ensure a strict vertical rhythm. Large headlines should often be followed by a thin horizontal separator to reinforce the magazine layout style.

## Layout & Spacing

This design system uses a **fixed-column grid** on desktop (12 columns) and a **fluid grid** on mobile (4 columns). 

- **Verticality:** Embrace extreme vertical padding. Sections should be separated by 64px to 96px to allow the "eye to breathe," mimicking the margins of a luxury coffee table book.
- **Alignment:** Use asymmetrical layouts where appropriate—for example, a headline spanning 6 columns on the left with text content starting at column 8. 
- **The "Rule of Thirds":** Product images should often take up exactly 1/3 or 2/3 of the container width to maintain mathematical balance.

## Elevation & Depth

Depth is achieved through **tonal layering** and **soft ambient shadows** rather than physical stacking. 

- **Surfaces:** Use `#FFFFFF` for primary cards and `#FDF6E9` for secondary accent areas. 
- **Shadows:** Use extremely soft, high-diffusion shadows (Blur: 40px, Opacity: 4%, Color: #2A1A10) to lift cards slightly off the page. Shadows should feel like light hitting a piece of paper, not a digital window.
- **Outlines:** Use 1px borders (#E8DCCB) as the primary method of separation. When an element is focused or elevated, do not change the border color drastically; instead, slightly increase the shadow depth.

## Shapes

The shape language is controlled and precise. 
- **Elements:** Buttons and input fields use a consistent 8px-12px radius. 
- **Images:** Large photography should remain sharp (0px radius) to maintain the "print-spread" aesthetic, while smaller UI cards use the defined `rounded-lg` (16px) or `rounded-xl` (24px) for a friendlier, tactile feel.
- **Dividers:** Use 1px horizontal lines to separate content groups, echoing the structure of newspaper columns.

## Components

- **Buttons:** Primary buttons are solid Roast Brown (#92400E) with white text. Secondary buttons are outlined in the primary text color (#2A1A10) with no fill. Button text is always in Public Sans, uppercase, 14px.
- **Cards:** Cards should be white with a 1px border (#E8DCCB) and a very soft shadow. Avoid "hover-lifting" animations; use a subtle background color shift (to #FDF6E9) instead.
- **Inputs:** Text fields are underline-style or fully boxed with a thin border. Labels sit above the field in the `label-caps` style.
- **Icons:** Use 1.5pt stroke-weight line icons only. Never use solid/filled icons unless strictly necessary for status (e.g., a filled heart for "favorite").
- **Chips:** Small, pill-shaped tags used for coffee flavor notes (e.g., "Floral", "Chocolate") should use the Secondary Accent (#4F6F52) background at 10% opacity with dark green text.
- **Specialty Component - "The Metadata Block":** A structured group of labels used for coffee origins, processing methods, and altitude, utilizing the `label-caps` typography and thin vertical separators.