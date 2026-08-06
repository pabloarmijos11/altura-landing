import { Component } from '@angular/core';
import { RevealOnScroll } from '../../directives/reveal-on-scroll';

type RoastIcon = 'droplet' | 'fire' | 'bean' | 'snow';

interface RoastStep {
  readonly number: string;
  readonly temperature: string;
  readonly title: string;
  readonly description: string;
  readonly icon: RoastIcon;
}

@Component({
  selector: 'app-roast',
  imports: [RevealOnScroll],
  templateUrl: './roast.html',
  styleUrl: './roast.css',
})
export class Roast {
  protected readonly steps: readonly RoastStep[] = [
    {
      number: '01',
      temperature: '160°C',
      title: 'Secado',
      description: 'El grano pierde humedad y se prepara para la transformación.',
      icon: 'droplet',
    },
    {
      number: '02',
      temperature: '196°C',
      title: 'Primer crack',
      description: 'Los azúcares se caramelizan y el grano expande su volumen.',
      icon: 'fire',
    },
    {
      number: '03',
      temperature: '210°C',
      title: 'Desarrollo',
      description: 'Se definen los perfiles de acidez y notas aromáticas finales.',
      icon: 'bean',
    },
    {
      number: '04',
      temperature: '25°C',
      title: 'Enfriado',
      description: 'Proceso rápido para detener la cocción y preservar aceites.',
      icon: 'snow',
    },
  ];
}
