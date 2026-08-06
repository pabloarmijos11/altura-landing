import { computed, effect, Injectable, signal } from '@angular/core';

type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'altura-theme';

@Injectable({ providedIn: 'root' })
export class Theme {
  private readonly mode = signal<ThemeMode>(readInitialMode());

  readonly isDark = computed(() => this.mode() === 'dark');

  constructor() {
    effect(() => {
      const mode = this.mode();
      document.documentElement.classList.toggle('dark', mode === 'dark');
      try {
        localStorage.setItem(STORAGE_KEY, mode);
      } catch {
        // localStorage bloqueado: el tema funciona igual, solo no se recuerda.
      }
    });
  }

  toggle(): void {
    this.mode.update((mode) => (mode === 'dark' ? 'light' : 'dark'));
  }
}

/**
 * El script inline de index.html ya decidió el tema antes del primer pintado.
 * Aquí se lee el resultado del DOM en vez de repetir la lógica: si ambos
 * calcularan por su cuenta, cualquier divergencia futura entre los dos
 * produciría un parpadeo imposible de rastrear.
 */
function readInitialMode(): ThemeMode {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}
