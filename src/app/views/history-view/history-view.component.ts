import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryService } from '../../services/history.service';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-history-view',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './history-view.component.html',
  styleUrl: './history-view.component.scss'
})
export class HistoryViewComponent {
  constructor(public historyService: HistoryService) {}
}
  