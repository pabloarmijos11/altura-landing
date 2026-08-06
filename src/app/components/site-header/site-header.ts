import { afterNextRender, Component, HostListener, inject, OnDestroy, signal } from '@angular/core';
import { Theme } from '../../services/theme';

@Component({
  selector: 'app-site-header',
  imports: [],
  templateUrl: './site-header.html',
  styleUrl: './site-header.css',
})
export class SiteHeader implements OnDestroy {
  protected readonly theme = inject(Theme);

  /** La cabecera es transparente sobre el hero y se vuelve sólida al bajar. */
  protected readonly scrolled = signal(false);

  protected readonly menuOpen = signal(false);

  protected readonly links = [
    { label: 'Orígenes', href: '#origen' },
    { label: 'Productos', href: '#coleccion' },
    { label: 'Nuestra historia', href: '#raices' },
    { label: 'Suscripciones', href: '#suscripcion' },
  ];

  /**
   * Sección que el lector está mirando ahora mismo, o `null` si está en una que
   * no aparece en el menú (el hero, el tueste, el método). Dejarlo en `null` es
   * deliberado: marcar el enlace más cercano mentiría sobre dónde estás.
   */
  private readonly activeSection = signal<string | null>(null);

  private observer?: IntersectionObserver;

  constructor() {
    afterNextRender(() => this.watchSections());
  }

  protected isCurrent(href: string): boolean {
    return this.activeSection() === href.slice(1);
  }

  /**
   * Marca en el menú la sección visible. En una página de scroll continuo, sin
   * esto el lector no tiene forma de saber en qué punto del recorrido está.
   *
   * El truco es el `rootMargin`: recorta la ventana hasta dejar una banda de un
   * 5% de alto a la altura del primer tercio de la pantalla, y llama activa a la
   * sección que la cruza. Es la "línea de lectura". Sin recortar, con secciones
   * de pantalla completa habría dos o tres intersecando a la vez y habría que
   * inventar un criterio de desempate.
   */
  private watchSections(): void {
    const sections = this.links
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((element): element is HTMLElement => element !== null);

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          } else if (this.activeSection() === entry.target.id) {
            // Salió de la banda y nadie la ha reemplazado todavía.
            this.activeSection.set(null);
          }
        }
      },
      { rootMargin: '-30% 0px -65% 0px' },
    );

    for (const section of sections) {
      this.observer.observe(section);
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  @HostListener('window:scroll')
  protected onScroll(): void {
    this.scrolled.set(window.scrollY > 50);
  }

  /** Escape cierra el menú: es lo que espera cualquiera que lo haya abierto sin querer. */
  @HostListener('document:keydown.escape')
  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }
}
