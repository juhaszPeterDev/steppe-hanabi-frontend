import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as io from 'socket.io-client';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  socketInstance;
  subject = new Subject<any>();
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
    this.socketInstance = io.io('http://localhost:3000');
    this.socketInstance.on('new-message', (message) => {
      this.getLobby().subscribe(result => {
        this.subject.next(result);
      });
    });
  }

  getLobby(){
    return this.http.get('/api/game/state');
  }

  sendJoinRequest(playerName: string): Observable<any> {
    return this.http.post('/api/game/player', {name: playerName}, { headers: this.headers, responseType: 'text'});
  }

  clearLobby(): Observable<any> {
    return this.http.delete('/api/game/lobby', { headers: this.headers, responseType: 'text'});
  }

  start(): Observable<any> {
    return this.http.post('/api/game/start', {});
  }

  playCard(index): Observable<any> {
    return this.http.post('/api/game/card', {action: 'play', index});
  }

  discardCard(index): Observable<any> {
    return this.http.post('/api/game/card', {action: 'discard', index});
  }

  hint(player, info): Observable<any> {
    return this.http.post('/api/game/hint', {player, info});
  }

  public getMessages = () => {
    return this.subject.asObservable();
  }
 
}