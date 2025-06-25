import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly themes = ['modo-claro', 'modo-escuro', 'modo-contraste'];
  private readonly storageKey = 'theme';

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.initTheme();
  }

  private initTheme(): void {
    const savedTheme = localStorage.getItem(this.storageKey);
    if (savedTheme && this.themes.includes(savedTheme)) {
      this.applyTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const defaultTheme = prefersDark ? 'modo-escuro' : 'modo-claro';
      this.applyTheme(defaultTheme);
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(this.storageKey)) {
        const systemTheme = e.matches ? 'modo-escuro' : 'modo-claro';
        this.applyTheme(systemTheme);
      }
    });
  }

  applyTheme(theme: string): void {
    this.themes.forEach(t => this.document.body.classList.remove(t));
    this.document.body.classList.add(theme);
    localStorage.setItem(this.storageKey, theme);
  }

  getCurrentTheme(): string | null {
    return localStorage.getItem(this.storageKey);
  }
}