import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { ChatBubble } from './shared/components/chat-bubble/chat-bubble';

@Component({
  imports: [RouterOutlet, Header, Footer, ChatBubble],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {}
