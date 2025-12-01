import { Component, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class OllamaService {
 
  processPrompt(prompt: string): Observable<any> {
   
    return of({ text: `Echo: ${prompt}` });
  }
}

@Component({
  selector: 'app-ai-page',
  templateUrl: './ai-page.component.html',
  styleUrls: ['./ai-page.component.css']
})
export class AiPageComponent {

  constructor(private ollamaService: OllamaService) {}

  onClick(): void {
    this.ollamaService.processPrompt('Test')
      .pipe(
        tap(response => {
          console.log('Ollama Response:', response);
        })
      )
      .subscribe();
  }
}
