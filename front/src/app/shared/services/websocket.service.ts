import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebsocketsService {

  private subject: WebSocketSubject<Object>;

  constructor() {
    this.subject = webSocket('ws://localhost:9191')
  }

  public getWebSocketObservable(): Observable<Object> {
    return this.subject.asObservable()
  }
}
