import { Component, computed, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-ticker',
  styleUrl: './ticker.scss',
  templateUrl: './ticker.html',
})
export class Ticker {
  readonly items = input([
    '⚡ NO BORING MARKETING',
    '🚀 VIRAL CONTENT STRATEGY',
    '👁️ GEN Z BRANDING',
    '📈 +10M ORGANIC VIEWS',
  ]);

  // Ogni gruppo ripete la lista due volte, così copre anche gli schermi larghi;
  // due gruppi identici permettono il loop continuo con translateX(-50%).
  protected readonly group = computed(() => [...this.items(), ...this.items()]);
  protected readonly copies = [0, 1];
}
