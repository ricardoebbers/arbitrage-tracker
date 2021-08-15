import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WebsocketsService {

  private subject: WebSocketSubject<Object>;

  constructor() {
    console.log(environment)
    this.subject = webSocket(environment.websocket_url)
  }

  public getWebSocketObservable(): Observable<Object> {
    return this.subject.asObservable()
  }
}
