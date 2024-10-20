import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { forkJoin, Subscription } from 'rxjs';

import { ButtonComponent } from '../../shared/button/button.component';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { GameStep } from '../../enum/game.enum';
import { PlayerAttributesService } from '../../services/http/player-attributes.service';
import { PlayersBattleService } from '../../services/players-battle.service';

@Component({
  selector: 'app-settings-view',
  standalone: true,
  imports: [ButtonComponent, LoaderComponent, CommonModule, RouterModule],
  templateUrl: './settings-view.component.html',
  styleUrl: './settings-view.component.scss'
})
export class SettingsViewComponent implements OnDestroy {

  public readonly GAME_STEP = GameStep;
  private readonly ComponentSubsc: Subscription = new Subscription();

  public gameStep = GameStep.Play;
  public isVisibleLoader: boolean = false;

  constructor(
    private playerAttributesService: PlayerAttributesService,
    private playersBattleService: PlayersBattleService,
    private router: Router,
  ) {}

  ngOnDestroy(): void {
    this.ComponentSubsc.unsubscribe();
  }

  public onClickPlay(): void {
    this.gameStep = GameStep.SetPlayersAttributes;
  }

  public onClickSelectPlayerAttr(): void {
    this.isVisibleLoader = true;
    this.gameStep = GameStep.SetStarShipsAttributes;
    this.setPlayersAttr();
  }

  public onClickSelectStarShipsAttr(): void {
    this.isVisibleLoader = true;
    this.gameStep = GameStep.Game;
    this.setStarshipsPlayers();
  }

  private setPlayersAttr(): void {
    const request = forkJoin([
      this.playerAttributesService.getPlayerAttributes(),
      this.playerAttributesService.getPlayerAttributes(),
    ]);
    const sub = request.subscribe({
      next: ([firstPlayer, secondPlayer]) => {
        this.playersBattleService.setPlayersAttributes(firstPlayer, secondPlayer);
        this.isVisibleLoader = false;
      },
      error: () => {
        this.onError();
      }
    });
    this.ComponentSubsc.add(sub);
  }

  private setStarshipsPlayers(): void {
    const request = forkJoin([
      this.playerAttributesService.getRandomStarshipDetails(),
      this.playerAttributesService.getRandomStarshipDetails(),
    ]);
    const sub = request.subscribe({
      next: ([firstPlayerStarship, secondPlayerStarship]) => {
        this.playersBattleService.setPlayersStarships(firstPlayerStarship, secondPlayerStarship);
        this.router.navigate(['/battle']);
      }
    });
    this.ComponentSubsc.add(sub);
  }

  private onError(): void {
    this.gameStep = GameStep.Play;
    this.isVisibleLoader = false;
    alert('Wystąpił błąd, spróbuj jeszcze raz.');
  }

}
