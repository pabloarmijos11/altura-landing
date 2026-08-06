import { Component, computed, ElementRef, signal, viewChildren } from '@angular/core';

interface BrewMethod {
  readonly id: string;
  readonly name: string;
  readonly parameters: readonly { readonly label: string; readonly value: string }[];
  readonly steps: readonly string[];
  readonly image: string;
  readonly alt: string;
}

const ILLUSTRATION = '/images/brew-';

@Component({
  selector: 'app-brew',
  imports: [],
  templateUrl: './brew.html',
  styleUrl: './brew.css',
})
export class Brew {
  protected readonly methods: readonly BrewMethod[] = [
    {
      id: 'v60',
      name: 'V60',
      parameters: [
        { label: 'Dosis', value: '20 g' },
        { label: 'Agua', value: '300 ml' },
        { label: 'Temp.', value: '94°C' },
        { label: 'Tiempo', value: '3:00' },
      ],
      steps: [
        'Pre-infusión de 30 s para liberar gases y preparar el lecho de café.',
        'Vertido constante en espiral desde el centro hacia afuera.',
        'Extracción final controlando el flujo para un perfil limpio.',
      ],
      image: `${ILLUSTRATION}v60.webp`,
      alt: 'Ilustración de una cafetera de goteo V60',
    },
    {
      id: 'prensa',
      name: 'Prensa francesa',
      parameters: [
        { label: 'Dosis', value: '30 g' },
        { label: 'Agua', value: '500 ml' },
        { label: 'Temp.', value: '92°C' },
        { label: 'Tiempo', value: '4:00' },
      ],
      steps: [
        'Infusión total vertiendo todo el agua sobre el café molido grueso.',
        'Romper la costra a los 4 minutos y retirar la espuma superficial.',
        'Presión suave y servido inmediato para evitar sobreextracción.',
      ],
      image: `${ILLUSTRATION}prensa.webp`,
      alt: 'Ilustración de una prensa francesa',
    },
    {
      id: 'espresso',
      name: 'Espresso',
      parameters: [
        { label: 'Dosis', value: '18 g' },
        { label: 'Agua', value: '36 g' },
        { label: 'Temp.', value: '93°C' },
        { label: 'Tiempo', value: '28 s' },
      ],
      steps: [
        'Distribución uniforme en el portafiltro para evitar canalizaciones.',
        'Prensado nivelado con presión constante de 15 kg.',
        'Extracción viscosa y tigrada, con caída en cola de ratón.',
      ],
      image: `${ILLUSTRATION}espresso.webp`,
      alt: 'Ilustración de una máquina de espresso',
    },
  ];

  protected readonly activeIndex = signal(0);
  protected readonly activeMethod = computed(() => this.methods[this.activeIndex()]);

  private readonly tabButtons = viewChildren<ElementRef<HTMLButtonElement>>('tabButton');

  protected select(index: number): void {
    this.activeIndex.set(index);
  }

  /**
   * Navegación con teclado según el patrón de pestañas de WAI-ARIA: las flechas
   * mueven entre pestañas y la selección las sigue. El tabulador no recorre las
   * pestañas una a una — solo la activa es alcanzable (roving tabindex) — para
   * que quien navegue con teclado no tenga que atravesarlas todas.
   */
  protected onKeydown(event: KeyboardEvent): void {
    const count = this.methods.length;
    const current = this.activeIndex();

    let next: number | undefined;
    switch (event.key) {
      case 'ArrowRight':
        next = (current + 1) % count;
        break;
      case 'ArrowLeft':
        next = (current - 1 + count) % count;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = count - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    this.activeIndex.set(next);
    this.tabButtons()[next]?.nativeElement.focus();
  }
}
