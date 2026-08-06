import { Component } from '@angular/core';

@Component({
  selector: 'app-site-footer',
  imports: [],
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.css',
})
export class SiteFooter {
  protected readonly year = new Date().getFullYear();

  protected readonly columns = [
    {
      title: 'Tienda',
      links: ['Colección de origen', 'Suscripciones', 'Accesorios', 'Tarjetas regalo'],
    },
    {
      title: 'Nosotros',
      links: ['Nuestra historia', 'Fincas asociadas', 'Sostenibilidad', 'Journal'],
    },
    {
      title: 'Ayuda',
      links: ['Envíos y devoluciones', 'Guías de preparación', 'Preguntas frecuentes', 'Contacto'],
    },
  ];
}
