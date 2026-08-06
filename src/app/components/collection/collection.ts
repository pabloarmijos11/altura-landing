import { Component, OnDestroy, signal } from '@angular/core';
import { RevealOnScroll } from '../../directives/reveal-on-scroll';

interface Coffee {
  readonly name: string;
  readonly region: string;
  readonly notes: readonly string[];
  readonly altitude: string;
  readonly price: string;
  readonly image: string;
  readonly alt: string;
}

const BAG_IMAGE = '/images/bag-';

@Component({
  selector: 'app-collection',
  imports: [RevealOnScroll],
  templateUrl: './collection.html',
  styleUrl: './collection.css',
})
export class Collection implements OnDestroy {
  protected readonly coffees: readonly Coffee[] = [
    {
      name: 'Vilcabamba',
      region: 'Loja, Ecuador',
      notes: ['Panela', 'Naranja', 'Cacao'],
      altitude: '1.750 msnm',
      price: '$14',
      image: `${BAG_IMAGE}vilcabamba.webp`,
      alt: 'Paquete de café Vilcabamba sobre fondo claro',
    },
    {
      name: 'Palanda',
      region: 'Zamora-Chinchipe, Ecuador',
      notes: ['Jazmín', 'Durazno', 'Miel'],
      altitude: '1.900 msnm',
      price: '$16',
      image: `${BAG_IMAGE}palanda.webp`,
      alt: 'Paquete de café Palanda sobre fondo claro',
    },
    {
      name: 'Intag',
      region: 'Imbabura, Ecuador',
      notes: ['Chocolate negro', 'Nuez', 'Ciruela'],
      altitude: '1.600 msnm',
      price: '$15',
      image: `${BAG_IMAGE}intag.webp`,
      alt: 'Paquete de café Intag sobre fondo claro',
    },
  ];

  /**
   * Café confirmado hace un instante, o `null`. No hay carrito ni backend: el
   * botón existe para que el estado de confirmación esté diseñado, igual que el
   * formulario de suscripción. Un control que parece pulsable y no responde es
   * peor que no tenerlo.
   */
  protected readonly addedName = signal<string | null>(null);

  private timer?: ReturnType<typeof setTimeout>;

  protected add(name: string): void {
    this.addedName.set(name);
    // Solo uno confirmado a la vez: pulsar otro cancela el aviso anterior en
    // lugar de dejar dos temporizadores compitiendo por apagarlo.
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.addedName.set(null), 2000);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }
}
