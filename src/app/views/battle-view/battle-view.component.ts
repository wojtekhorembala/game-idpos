import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';

import { PlayerCardComponent } from './player-card/player-card.component';
import { PlayersBattleService } from '../../services/players-battle.service';
import { ButtonComponent } from '../../shared/button/button.component';
import { ExplosionComponent } from '../../shared/explosion/explosion.component';
import { HistoryService } from '../../services/history.service';

@Component({
  selector: 'app-battle-view',
  standalone: true,
  imports: [CommonModule, PlayerCardComponent, ButtonComponent, ExplosionComponent],
  templateUrl: './battle-view.component.html',
  styleUrl: './battle-view.component.scss'
})
export class BattleViewComponent {

  public isVisibleExplosion?: boolean;
  public winnerName?: string;

  constructor(
    public playersBattleService: PlayersBattleService,
    private historyService: HistoryService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {
    // guards could be used
    if (!this.playersBattleService.playerFirst || !this.playersBattleService.playerSecond) {
      this.back();
    }
  }

  public back(): void {
    this.router.navigate(['/']);
  }

  public onStartBattle(): void {
    this.isVisibleExplosion = true;
    this.winnerName = this.playersBattleService.determineWinner();

    this.historyService.addRecord({ 
      playerFirst: this.playersBattleService.playerFirst.getProperties(),
      playerSecond: this.playersBattleService.playerSecond.getProperties(),
      winnerName: this.winnerName,
    });
  }

  public onCompleteAnimationBattle(): void {
    this.isVisibleExplosion = false;
    this.cdr.detectChanges();
  }

}
