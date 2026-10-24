import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

type TextField = 'name' | 'email' | 'message';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-contact-form',
  styleUrl: './contact-form.scss',
  templateUrl: './contact-form.html',
})
export class ContactForm {
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly needs = ['🎬 Viral Reels', '🎨 Brand Identity', '🤡 Meme Culture', '🔥 All of it'];

  protected readonly form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    need: [this.needs[0]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  /** Nome di chi ha inviato, per il messaggio di conferma. */
  protected readonly sentBy = signal<string | null>(null);

  protected hasError(field: TextField): boolean {
    const control = this.form.controls[field];
    return control.invalid && control.touched;
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // TODO: collegare a un backend o servizio email (Formspree, API propria, ecc.)
    this.sentBy.set(this.form.getRawValue().name);
    this.form.reset();
  }

  protected reset(): void {
    this.sentBy.set(null);
  }
}
