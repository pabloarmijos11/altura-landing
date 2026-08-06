import { Component, signal } from '@angular/core';
import { email, form, FormField, required, submit } from '@angular/forms/signals';

@Component({
  selector: 'app-subscribe',
  imports: [FormField],
  templateUrl: './subscribe.html',
  styleUrl: './subscribe.css',
})
export class Subscribe {
  private readonly model = signal({ email: '' });

  protected readonly subscribeForm = form(this.model, (schemaPath) => {
    required(schemaPath.email, { message: 'El correo es obligatorio.' });
    email(schemaPath.email, { message: 'Ingresa un correo válido.' });
  });

  protected readonly submitted = signal(false);
  protected readonly submitting = signal(false);

  protected onSubmit(): void {
    submit(this.subscribeForm, async () => {
      this.submitting.set(true);
      // No hay backend: la landing es una prueba de diseño. Esta espera es la
      // misma latencia de interacción que tendría cualquier envío real, no
      // una simulación de que el correo va a alguna parte.
      await new Promise((resolve) => setTimeout(resolve, 400));
      this.submitting.set(false);
      this.submitted.set(true);
    });
  }
}
