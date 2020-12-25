import { Component } from '@angular/core';
import { GameService } from 'src/services/GameService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  lobby = '';
  newMessage = '';
  messageList:  string[] = [];

  constructor(private gameService: GameService){
    this.gameService.getLobby().subscribe(result => {
      this.lobby = JSON.stringify(result,null,2);
    });
  }

  sendMessage() {
    this.gameService.sendMessage(this.newMessage);
    this.newMessage = '';
  }

  ngOnInit(){
    this.gameService
      .getMessages()
      .subscribe((message: string) => {
        this.messageList.push(message);
      });
  }
}
