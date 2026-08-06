import { Component } from '@angular/core';
import { Brew } from './components/brew/brew';
import { Collection } from './components/collection/collection';
import { Hero } from './components/hero/hero';
import { Origin } from './components/origin/origin';
import { Roast } from './components/roast/roast';
import { Roots } from './components/roots/roots';
import { SiteFooter } from './components/site-footer/site-footer';
import { SiteHeader } from './components/site-header/site-header';
import { Subscribe } from './components/subscribe/subscribe';

@Component({
  selector: 'app-root',
  imports: [SiteHeader, Hero, Origin, Roast, Roots, Collection, Brew, Subscribe, SiteFooter],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
