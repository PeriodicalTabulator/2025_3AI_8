import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OllamaService } from '../ai.service';
import { OllamaResponse } from '../models/ollama-response';

@Component({
  selector: 'app-ai-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-page.component.html',
  styleUrl: './ai-page.component.css'
})
export class AiPageComponent {

  prompt: string = '';
  answer: string = '';
  loading: boolean = false;
  error: string | null = null;

  constructor(private ollamaService: OllamaService) {}

  sendPrompt(): void {
    const text = this.prompt.trim();
    if (!text || this.loading) return;

    this.loading = true;
    this.answer = '';
    this.error = null;

    this.ollamaService.processPrompt(text).subscribe({
      next: (res: OllamaResponse) => {
        this.answer = res.response;
        this.loading = false;
      },
      error: (err) => {
        console.error('Ollama error:', err);
        this.error = 'Something went wrong talking to the AI.';
        this.loading = false;
      }
    });
  }

  clear(): void {
    this.prompt = '';
    this.answer = '';
    this.error = null;
  }
}
