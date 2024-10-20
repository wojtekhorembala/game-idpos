import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Player } from '../../../classes/player';

@Component({
  selector: 'app-player-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-card.component.html',
  styleUrl: './player-card.component.scss'
})
export class PlayerCardComponent {
  @Input() public player?: Player;
  @Input() public isSecondPlayer: boolean = false;
}
