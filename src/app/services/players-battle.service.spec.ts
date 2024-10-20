import { TestBed } from '@angular/core/testing';

import { PlayersBattleService } from './players-battle.service';

describe('PlayersBattleService', () => {
  let service: PlayersBattleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayersBattleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
