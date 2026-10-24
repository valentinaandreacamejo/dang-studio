import { Service, signal } from '@angular/core';

/** Stato UI globale (menu mobile, chat widget). */
@Service()
export class UiState {
  readonly menuOpen = signal(false);
  readonly chatOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  toggleChat(): void {
    this.chatOpen.update((open) => !open);
  }

  closeChat(): void {
    this.chatOpen.set(false);
  }
}
