import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { PlayersBattleService } from '../../services/players-battle.service';
import { HistoryService } from '../../services/history.service';
import { BattleViewComponent } from './battle-view.component';
import { PlayerCardComponent } from './player-card/player-card.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { ExplosionComponent } from '../../shared/explosion/explosion.component';
import { Player } from '../../classes/player';
import { mockPlayerFirst, mockPlayerSecond, mockStarship } from '../../mock-tests/mock-players';

describe('BattleViewComponent', () => {
  let component: BattleViewComponent;
  let fixture: ComponentFixture<BattleViewComponent>;
  let mockPlayersBattleService: jasmine.SpyObj<PlayersBattleService>;
  let mockHistoryService: jasmine.SpyObj<HistoryService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockChangeDetectorRef: jasmine.SpyObj<ChangeDetectorRef>;

  beforeEach(() => {
    mockPlayersBattleService = jasmine.createSpyObj('PlayersBattleService', ['determineWinner', 'playerFirst', 'playerSecond']);
    mockHistoryService = jasmine.createSpyObj('HistoryService', ['addRecord']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockChangeDetectorRef = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      providers: [
        { provide: PlayersBattleService, useValue: mockPlayersBattleService },
        { provide: HistoryService, useValue: mockHistoryService },
        { provide: Router, useValue: mockRouter },
        { provide: ChangeDetectorRef, useValue: mockChangeDetectorRef }
      ],
      imports: [PlayerCardComponent, ButtonComponent, ExplosionComponent, BattleViewComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleViewComponent);
    component = fixture.componentInstance;

    mockPlayersBattleService.playerFirst = new Player(mockPlayerFirst);
    mockPlayersBattleService.playerSecond = new Player(mockPlayerSecond);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to "/" if players are not set', () => {
    mockPlayersBattleService.playerFirst = undefined as any;
    mockPlayersBattleService.playerSecond = undefined as any;

    fixture = TestBed.createComponent(BattleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
  

  it('should display winner name after battle starts', () => {
    mockPlayersBattleService.playerFirst = new Player(mockPlayerFirst);
    mockPlayersBattleService.playerFirst.assignStarship(mockStarship);
    mockPlayersBattleService.playerSecond = new Player(mockPlayerSecond);
    mockPlayersBattleService.playerSecond.assignStarship(mockStarship);

    mockPlayersBattleService.determineWinner.and.returnValue('Player 1');
    component.onStartBattle();

    expect(component.winnerName).toBe('Player 1');
    expect(component.isVisibleExplosion).toBeTrue();
    expect(mockHistoryService.addRecord).toHaveBeenCalledWith({
      playerFirst: mockPlayersBattleService.playerFirst.getProperties(),
      playerSecond: mockPlayersBattleService.playerSecond.getProperties(),
      winnerName: 'Player 1',
    });
  });

  it('should call back and navigate to "/" when back is called', () => {
    component.back();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
});
