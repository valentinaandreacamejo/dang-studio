import { Component, inject } from '@angular/core';
import { UiState } from '../../../core/services/ui-state';

@Component({
  imports: [],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  protected readonly ui = inject(UiState);

  protected readonly links = [
    { label: 'WORK', href: '#work' },
    { label: 'SERVICES', href: '#services' },
    { label: 'MANIFESTO', href: '#manifesto' },
    { label: 'TALK', href: '#contact' },
  ];
}
