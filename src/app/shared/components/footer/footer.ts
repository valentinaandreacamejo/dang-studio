import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-footer',
  styleUrl: './footer.scss',
  templateUrl: './footer.html',
})
export class Footer {
  // TODO: sostituire con gli URL reali dei profili social dello studio
  protected readonly socials = [
    { label: 'INSTAGRAM', href: 'https://www.instagram.com/' },
    { label: 'TIKTOK', href: 'https://www.tiktok.com/' },
    { label: 'LINKEDIN', href: 'https://www.linkedin.com/' },
  ];
}
