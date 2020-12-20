import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  asd: WebSocket;

  constructor(private http: HttpClient, private socket: Socket) { }

  getLobby(){
    return this.http.get('/api/game/state');
  }

  public sendMessage(message) {
    this.socket.emit('new-message', message);
  }

  public getMessages = () => {
    return new Observable((observer) => {
      this.socket.on('new-message', (message) => {
          observer.next(message);
      });
    });
  }
 
}