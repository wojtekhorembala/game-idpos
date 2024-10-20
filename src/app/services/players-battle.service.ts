import { Injectable } from '@angular/core';

import { Player } from '../classes/player';
import { IPeopleAttrResponse } from '../interfaces/player-attr-response.interface';
import { IStarship } from '../interfaces/player.interface';

@Injectable({
  providedIn: 'root'
})
export class PlayersBattleService {

  public playerFirst!: Player;
  public playerSecond!: Player;

  constructor() { }

  public setPlayersAttributes(firstPlayer: IPeopleAttrResponse, secondPlayer: IPeopleAttrResponse): void {
    this.playerFirst = new Player(firstPlayer);
    this.playerSecond = new Player(secondPlayer);
  }

  public setPlayersStarships(firstPlayerStarship: IStarship, secondPlayerStarship: IStarship): void {
    this.playerFirst.assignStarship(firstPlayerStarship);
    this.playerSecond.assignStarship(secondPlayerStarship);
  }

  public determineWinner(): string {
    const score1 = this.playerFirst.calculateScore();
    const score2 = this.playerSecond.calculateScore();
    return score1 > score2 ? this.playerFirst.name : score1 < score2 ? this.playerSecond.name : 'Remis';
  }

}
