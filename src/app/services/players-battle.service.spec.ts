import { TestBed } from '@angular/core/testing';
import { PlayersBattleService } from './players-battle.service';
import { IPeopleAttrResponse } from '../interfaces/player-attr-response.interface';
import { Player } from '../classes/player';
import { mockPlayerFirst, mockPlayerSecond } from '../mock-tests/mock-players';

describe('PlayersBattleService', () => {
  let service: PlayersBattleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayersBattleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set players attributes', () => {
    const mockFirstPlayerAttr: IPeopleAttrResponse = mockPlayerFirst;
    const mockSecondPlayerAttr: IPeopleAttrResponse = mockPlayerSecond;

    service.setPlayersAttributes(mockFirstPlayerAttr, mockSecondPlayerAttr);

    expect(service.playerFirst.name).toBe('Player 1');
    expect(service.playerSecond.name).toBe('Player 2');
  });

  it('should correctly determine the winner', () => {
    service.playerFirst = new Player(mockPlayerFirst);
    service.playerSecond = new Player(mockPlayerSecond);

    const winner = service.determineWinner();
    expect(winner).toBe('Player 1');
  });

  it('should return "Remis" if the scores are equal', () => {
    service.playerFirst = new Player(mockPlayerFirst);
    service.playerSecond = new Player(mockPlayerSecond);

    spyOn(service.playerFirst, 'calculateScore').and.returnValue(100);
    spyOn(service.playerSecond, 'calculateScore').and.returnValue(100);

    const winner = service.determineWinner();
    expect(winner).toBe('Remis');
  });
});
