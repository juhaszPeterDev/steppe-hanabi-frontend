import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as io from 'socket.io-client';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  socketInstance;
  subject = new Subject<string>();

  constructor(private http: HttpClient) {
    this.socketInstance = io.io('http://localhost:3000');
    this.socketInstance.on('new-message', (message) => {
      this.subject.next(message);
    });
  }

  getLobby(){
    return this.http.get('/api/game/state');
  }

  public sendMessage(message) {
    this.socketInstance.emit('new-message', message);
  }

  public getMessages = () => {
    return this.subject.asObservable();
  }
 
}