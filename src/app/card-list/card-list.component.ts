import { Component, Input, OnInit } from '@angular/core';
import { GameService } from 'src/services/GameService';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  @Input() playerName;
  @Input() cards;
  @Input() cardInfos;
  @Input() areCardsHidden;
  @Input() canPlay;
  @Input() playerIndex;
  @Input() isActive;
  selectedCardIndex?: any;
  selectedHintCard?: any;

  constructor(private gameService: GameService) {
    this.selectedCardIndex = undefined;
  }

  ngOnInit(): void {
  }

  getCardListMainClass(): string {
    return this.areCardsHidden ? 'hiddenCardInfo' : '';
  }

  getCardClass(card, index): string {
    const cardColor = this.areCardsHidden ? '' : ` ${card.colorValue}Card`;
    const isSelected = this.selectedCardIndex === index ? ' selected' : '';
    return `trueCard${isSelected}${cardColor}`;
  }

  selectCardByIndex(index): void {
    if (this.canPlay) {
      if (this.areCardsHidden) {
        this.selectedCardIndex = index;
      } else {
        this.selectedHintCard = this.cards[index];
      }
    }
  }

  playCard(): void {
    this.gameService.playCard(this.selectedCardIndex).subscribe();
  }

  discardCard(): void {
    this.gameService.discardCard(this.selectedCardIndex).subscribe();
  }

  hint(info): void {
    this.gameService.hint(this.playerIndex, info).subscribe();
  }
}
