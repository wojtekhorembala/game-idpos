import { Injectable } from '@angular/core';

import { IHistory } from '../interfaces/history.interface';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  public historyBattle: IHistory[] = [];

  constructor() { }

  public addRecord(history: IHistory): void {
    this.historyBattle = [
      {...history},
      ...this.historyBattle,
    ];
  }

  public downloadHistoryJson(): void {
    if (this.historyBattle?.length) {
      const dataStr = JSON.stringify(this.historyBattle, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'battle-history.json';
      anchor.click();
      window.URL.revokeObjectURL(url);
      return;
    }
    alert('Brak historii');
  }

  public removeHistory(): void {
    this.historyBattle = [];
  }

}
