import { Component } from '@angular/core';
import { RevealOnScroll } from '../../directives/reveal-on-scroll';

@Component({
  selector: 'app-origin',
  imports: [RevealOnScroll],
  templateUrl: './origin.html',
  styleUrl: './origin.css',
})
export class Origin {
  protected readonly stats = [
    { value: '1.800 m', label: 'Altitud media' },
    { value: '3', label: 'Fincas' },
    { value: '180 d', label: 'Maduración' },
  ];
}
