import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameService } from 'src/services/GameService';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  @Input() lobbyData;
  @Output() emitUserName = new EventEmitter<string>();
  username: string;
  joined = false;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
  }

  sendJoinRequest(): void {
    this.gameService.sendJoinRequest(this.username).subscribe(result => {
      console.log(result);
      this.joined = true;
      this.emitUserName.emit(this.username);
    });
  }

  clearLobby(): void {
    this.gameService.clearLobby().subscribe(result => {
      console.log(result);
    });
  }

  start(): void {
    this.gameService.start().subscribe();
  }
}
