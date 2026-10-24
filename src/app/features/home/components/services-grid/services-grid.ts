import { Component } from '@angular/core';

interface ServiceCard {
  index: string;
  tag: string;
  title: string;
  text: string;
  tone: 'olive' | 'sky' | 'cream';
}

@Component({
  imports: [],
  selector: 'app-services-grid',
  styleUrl: './services-grid.scss',
  templateUrl: './services-grid.html',
})
export class ServicesGrid {
  protected readonly services: ServiceCard[] = [
    {
      index: '02',
      tag: 'Social strategy',
      title: 'Feeds that feel like a group chat.',
      text: 'Editorial calendars, community playbooks and formats people save, share and screenshot.',
      tone: 'olive',
    },
    {
      index: '03',
      tag: 'Content production',
      title: 'Reels, UGC & shoots — made for the scroll.',
      text: 'From creator casting to final cut. Vertical-first, sound-on, zero stock-photo energy.',
      tone: 'sky',
    },
    {
      index: '04',
      tag: 'Brand identity',
      title: 'Logos are easy. Vibes are hard.',
      text: 'Naming, tone of voice and visual systems that look as good in a Story as on a billboard.',
      tone: 'cream',
    },
  ];
}
