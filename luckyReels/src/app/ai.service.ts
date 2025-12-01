import { Injectable } from '@angular/core';
import { OllamaResponse } from './models/ollama-response';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class AIService {

processPrompt(prompt: string): Observable<OllamaResponse> {
  const requestBody = { prompt: prompt,
    model: environment.llamaModel, }
    


    return this.httpClient.post<OllamaResponse>(environment.llamaApiUrl, requestBody);
}

  constructor(private httpClient:HttpClient) { }
}
