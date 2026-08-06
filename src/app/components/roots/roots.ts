import { Component } from '@angular/core';
import { RevealOnScroll } from '../../directives/reveal-on-scroll';

@Component({
  selector: 'app-roots',
  imports: [RevealOnScroll],
  templateUrl: './roots.html',
  styleUrl: './roots.css',
})
export class Roots {}
