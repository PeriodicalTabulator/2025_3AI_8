import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { OllamaResponse } from './models/ollama-response';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OllamaService {

  constructor(private httpClient: HttpClient) {}

  processPrompt(prompt: string): Observable<OllamaResponse> {
    const requestBody = {
      model: environment.llamaModel,
      prompt: prompt,
      stream: false
    };

    return this.httpClient.post<OllamaResponse>(
      environment.llamaApiUrl,
      requestBody
    );
  }
}
