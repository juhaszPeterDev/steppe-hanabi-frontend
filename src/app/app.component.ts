import { Component } from '@angular/core';
import { ɵangular_packages_platform_browser_dynamic_platform_browser_dynamic_a } from '@angular/platform-browser-dynamic';
import { GameService } from 'src/services/GameService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  lobby;
  joinedUser;

  constructor(private gameService: GameService){
    this.gameService.getLobby().subscribe(result => {
      this.lobby = result;
    });
  }

  ngOnInit(){
    this.gameService
      .getMessages()
      .subscribe((data: any) => {
        this.lobby = data;
      });
  }

  setUser(name): void {
    this.joinedUser = name;
  }

  hasGameStarted(): boolean {
    if (this.lobby === undefined || this.lobby.players.length === 0 || this.lobby.players[0].cards.length === 0) { return false; }
    return true;
  }

  hasGameEnded(): boolean {
    const hasGameStarted = this.hasGameStarted();
    const pilesAreComplete = Object.values(this.lobby.cardPiles).filter(i => i !== 5).length === 0;
    return (hasGameStarted && (this.lobby.mistakes >= 3 || pilesAreComplete));
  }

  restart(): void {
    this.gameService.clearLobby().subscribe();
  }
}
