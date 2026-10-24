import { Component, inject, input, output } from '@angular/core';
import { Draggable } from '../../directives/draggable';

/** Icona cartella del desktop: si trascina ovunque nel contenitore e al click si apre. */
@Component({
  imports: [],
  selector: 'app-draggable-folder',
  styleUrl: './draggable-folder.scss',
  templateUrl: './draggable-folder.html',
  hostDirectives: [{ directive: Draggable, inputs: ['dragBoundary'] }],
})
export class DraggableFolder {
  readonly label = input.required<string>();
  readonly opened = output<void>();

  private readonly drag = inject(Draggable);

  protected open(): void {
    if (this.drag.wasDragged()) return;
    this.opened.emit();
  }
}
