import { Component, DestroyRef, ElementRef, afterRenderEffect, inject, signal, viewChild } from '@angular/core';
import { UiState } from '../../../core/services/ui-state';

interface ChatMessage {
  from: 'bot' | 'me';
  text: string;
}

interface QuickReply {
  label: string;
  answer: string;
}

const TYPING_DELAY_MS = 900;

@Component({
  imports: [],
  selector: 'app-chat-bubble',
  styleUrl: './chat-bubble.scss',
  templateUrl: './chat-bubble.html',
  host: {
    '(document:keydown.escape)': 'ui.closeChat()',
  },
})
export class ChatBubble {
  protected readonly ui = inject(UiState);

  protected readonly replies: QuickReply[] = [
    {
      label: '🎬 Viral Reels',
      answer: 'Scripting, creators, native edits and daily trend radar. We make content people actually finish watching.',
    },
    {
      label: '🎨 Brand Identity',
      answer: 'Naming, tone of voice and a visual system designed for the feed first. No 80-page PDF nobody opens.',
    },
    {
      label: '🤡 Meme Culture',
      answer: 'Real-time trend-jacking and community management. Your brand becomes part of the joke — in a good way.',
    },
    {
      label: '💸 Pricing?',
      answer: 'Every brand is different, so we build custom packages. Tell us your goals and we send a proposal within 48h.',
    },
  ];

  protected readonly messages = signal<ChatMessage[]>([
    { from: 'bot', text: "Hey! 👋 I'm the DANG! bot. What are you looking for?" },
  ]);
  protected readonly typing = signal(false);
  protected readonly unread = signal(true);
  protected readonly draft = signal('');

  private readonly log = viewChild<ElementRef<HTMLElement>>('log');
  private timer?: ReturnType<typeof setTimeout>;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));

    // Tiene la conversazione scrollata sull'ultimo messaggio
    afterRenderEffect(() => {
      this.messages();
      this.typing();
      const el = this.log()?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }

  protected toggle(): void {
    this.ui.toggleChat();
    this.unread.set(false);
  }

  protected ask(reply: QuickReply): void {
    this.send(reply.label, reply.answer);
  }

  protected sendDraft(event: Event): void {
    event.preventDefault();
    const text = this.draft().trim();
    if (!text) return;
    this.draft.set('');
    this.send(text, "Love that. Drop the details in the form below and a real human replies within 24h ✌️");
  }

  private send(text: string, answer: string): void {
    if (this.typing()) return;
    this.messages.update((list) => [...list, { from: 'me', text }]);
    this.typing.set(true);
    this.timer = setTimeout(() => {
      this.messages.update((list) => [...list, { from: 'bot', text: answer }]);
      this.typing.set(false);
    }, TYPING_DELAY_MS);
  }
}
