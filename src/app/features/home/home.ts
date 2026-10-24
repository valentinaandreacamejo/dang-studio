import { Component } from '@angular/core';
import { Ticker } from '../../shared/components/ticker/ticker';
import { Hero } from './components/hero/hero';
import { ServicesGrid } from './components/services-grid/services-grid';
import { Manifesto } from './components/manifesto/manifesto';
import { ContactForm } from './components/contact-form/contact-form';

@Component({
  imports: [Ticker, Hero, ServicesGrid, Manifesto, ContactForm],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {}
