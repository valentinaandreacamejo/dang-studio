import { Component, DestroyRef, ElementRef, effect, inject, signal, viewChild } from '@angular/core';
import { DraggableFolder } from '../../../../shared/components/draggable-folder/draggable-folder';
import { Draggable } from '../../../../shared/directives/draggable';
import { SERVICE_FOLDERS, ServiceFolder } from '../../../../core/data/service-folders';

const CLOCK_REFRESH_MS = 15_000;

@Component({
  imports: [DraggableFolder, Draggable],
  selector: 'app-hero',
  styleUrl: './hero.scss',
  templateUrl: './hero.html',
  host: {
    '(document:keydown.escape)': 'close()',
  },
})
export class Hero {
  protected readonly folders = SERVICE_FOLDERS;
  protected readonly activeFolder = signal<ServiceFolder | null>(null);
  protected readonly clock = signal(formatClock());

  private readonly windowEl = viewChild<ElementRef<HTMLElement>>('window');

  constructor() {
    const interval = setInterval(() => this.clock.set(formatClock()), CLOCK_REFRESH_MS);
    inject(DestroyRef).onDestroy(() => clearInterval(interval));

    // Sposta il focus sulla finestra appena si apre (tastiera e screen reader)
    effect(() => this.windowEl()?.nativeElement.focus());
  }

  protected open(folder: ServiceFolder): void {
    this.activeFolder.set(folder);
  }

  protected close(): void {
    this.activeFolder.set(null);
  }
}

function formatClock(): string {
  return new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
}
