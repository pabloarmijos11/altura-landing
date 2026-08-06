import { afterNextRender, Directive, ElementRef, inject, input, OnDestroy } from '@angular/core';

/**
 * Revela el elemento cuando entra en el viewport.
 *
 * Uso:  <div appRevealOnScroll>          → sin retardo
 *       <div [appRevealOnScroll]="2">    → escalonado, 2 × 60ms de retardo
 *
 * Los estilos viven en styles.css (.reveal / .reveal.is-visible), no aquí:
 * la directiva solo decide *cuándo*, el CSS decide *cómo*.
 */
@Directive({
  selector: '[appRevealOnScroll]',
})
export class RevealOnScroll implements OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  /**
   * Posición dentro de un grupo, para escalonar la entrada.
   *
   * El `transform` permite las tres formas de escribirlo en la plantilla:
   * `appRevealOnScroll` (sin valor), `appRevealOnScroll="2"` (texto) y
   * `[appRevealOnScroll]="i"` (número). Sin él, las dos primeras pasan un
   * string y el compilador rechaza la plantilla.
   */
  readonly index = input(0, {
    alias: 'appRevealOnScroll',
    transform: (value: number | string) => Number(value) || 0,
  });

  private observer?: IntersectionObserver;

  constructor() {
    // Se oculta ya en el constructor, antes del primer pintado: si esperara a
    // afterNextRender, el contenido asomaría un frame antes de esconderse.
    this.host.nativeElement.classList.add('reveal');

    afterNextRender(() => {
      const element = this.host.nativeElement;
      element.style.setProperty('--i', String(this.index()));

      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add('is-visible');
            // Una sola vez: re-animar al volver a subir marea al usuario.
            this.observer?.unobserve(entry.target);
          }
        },
        {
          threshold: 0.15,
          // Dispara un poco antes del borde inferior para que la animación
          // termine cuando el elemento ya está cómodamente a la vista.
          rootMargin: '0px 0px -10% 0px',
        },
      );

      this.observer.observe(element);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
