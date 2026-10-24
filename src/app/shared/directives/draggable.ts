import { Directive, ElementRef, inject, input, output, signal } from '@angular/core';
import { WindowManager } from '../../core/services/window-manager';

const DRAG_THRESHOLD = 4;

interface Bounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

const UNBOUNDED: Bounds = { minX: -Infinity, maxX: Infinity, minY: -Infinity, maxY: Infinity };

/**
 * Trascinamento stile finestra OS con pointer events (mouse + touch).
 * Sposta l'host via transform, così la posizione di partenza resta nel flusso del layout.
 * Il pointer capture parte solo oltre la soglia, quindi un click semplice resta un click.
 */
@Directive({
  selector: '[appDraggable]',
  host: {
    '[style.transform]': '`translate3d(${x()}px, ${y()}px, 0)`',
    '[style.z-index]': 'zIndex()',
    '[class.is-dragging]': 'dragging()',
    '(pointerdown)': 'onPointerDown($event)',
    '(pointermove)': 'onPointerMove($event)',
    '(pointerup)': 'onPointerUp($event)',
    '(pointercancel)': 'onPointerUp($event)',
  },
})
export class Draggable {
  /** Selettore dell'antenato entro cui l'host resta confinato. */
  readonly dragBoundary = input('');
  /** Selettore della maniglia di trascinamento; vuoto = tutto l'host. */
  readonly dragHandle = input('');

  readonly dragEnded = output<void>();

  protected readonly x = signal(0);
  protected readonly y = signal(0);
  protected readonly zIndex = signal(0);
  protected readonly dragging = signal(false);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly windows = inject(WindowManager);

  private start = { px: 0, py: 0, x: 0, y: 0 };
  private bounds = UNBOUNDED;
  private pointerId: number | null = null;
  private moved = false;

  constructor() {
    this.bringToFront();
  }

  /** True se l'ultimo gesto è stato un trascinamento: serve a ignorare il click che segue. */
  wasDragged(): boolean {
    return this.moved;
  }

  bringToFront(): void {
    this.zIndex.set(this.windows.bringToFront());
  }

  protected onPointerDown(event: PointerEvent): void {
    if (event.button !== 0) return;
    const target = event.target as Element;
    const handle = this.dragHandle();
    if ((handle && !target.closest(handle)) || target.closest('[data-no-drag]')) return;

    this.bringToFront();
    this.pointerId = event.pointerId;
    this.moved = false;
    this.start = { px: event.clientX, py: event.clientY, x: this.x(), y: this.y() };
    this.bounds = this.computeBounds();
  }

  protected onPointerMove(event: PointerEvent): void {
    if (event.pointerId !== this.pointerId) return;
    const dx = event.clientX - this.start.px;
    const dy = event.clientY - this.start.py;

    if (!this.moved) {
      if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
      this.moved = true;
      this.dragging.set(true);
      this.host.setPointerCapture(event.pointerId);
    }

    event.preventDefault();
    this.x.set(clamp(this.start.x + dx, this.bounds.minX, this.bounds.maxX));
    this.y.set(clamp(this.start.y + dy, this.bounds.minY, this.bounds.maxY));
  }

  protected onPointerUp(event: PointerEvent): void {
    if (event.pointerId !== this.pointerId) return;
    this.pointerId = null;
    if (!this.dragging()) return;

    this.dragging.set(false);
    this.host.releasePointerCapture(event.pointerId);
    this.dragEnded.emit();
  }

  private computeBounds(): Bounds {
    const selector = this.dragBoundary();
    const boundary = selector ? this.host.parentElement?.closest(selector) : null;
    if (!boundary) return UNBOUNDED;

    const b = boundary.getBoundingClientRect();
    const h = this.host.getBoundingClientRect();
    return {
      minX: this.x() - (h.left - b.left),
      maxX: this.x() + (b.right - h.right),
      minY: this.y() - (h.top - b.top),
      maxY: this.y() + (b.bottom - h.bottom),
    };
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
