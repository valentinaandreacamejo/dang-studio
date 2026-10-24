import { Service } from '@angular/core';

/** Gestisce lo z-order di cartelle e finestre trascinabili stile desktop. */
@Service()
export class WindowManager {
  private topZ = 10;

  /** Restituisce uno z-index più alto di qualsiasi finestra precedente. */
  bringToFront(): number {
    return ++this.topZ;
  }
}
