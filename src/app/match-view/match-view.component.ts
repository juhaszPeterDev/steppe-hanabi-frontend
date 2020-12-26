import { Component, Input, OnInit } from '@angular/core';
import { GameService } from 'src/services/GameService';

@Component({
  selector: 'app-match-view',
  templateUrl: './match-view.component.html',
  styleUrls: ['./match-view.component.scss']
})
export class MatchViewComponent implements OnInit {
  @Input() lobby;
  @Input() userName;
  cardPile = [{},{},{},{},{}];

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes){
    if(changes.lobby && changes.lobby.currentValue) {
      this.cardPile = Object.keys(changes.lobby.currentValue.cardPiles).map(key => ({colorValue: key, numberValue: changes.lobby.currentValue.cardPiles[key]}));
    }
  }

  endGame(): void {
    this.gameService.clearLobby().subscribe(result => {
      console.log(result);
    });
  }

  canPlay(): boolean {
    return this.lobby.players[this.lobby.activePlayerIndex].name === this.userName;
  }

  getCardClass(card): string {
    const cardColor = ` ${card.colorValue}Card`;
    return `trueCard${cardColor}`;
  }

}
