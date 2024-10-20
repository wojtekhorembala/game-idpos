import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { PlayersBattleService } from '../../services/players-battle.service';
import { HistoryService } from '../../services/history.service';
import { BattleViewComponent } from './battle-view.component';
import { PlayerCardComponent } from './player-card/player-card.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { ExplosionComponent } from '../../shared/explosion/explosion.component';

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

    TestBed.configureTestingModule({
      declarations: [BattleViewComponent],
      providers: [
        { provide: PlayersBattleService, useValue: mockPlayersBattleService },
        { provide: HistoryService, useValue: mockHistoryService },
        { provide: Router, useValue: mockRouter },
        { provide: ChangeDetectorRef, useValue: mockChangeDetectorRef }
      ],
      imports: [PlayerCardComponent, ButtonComponent, ExplosionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BattleViewComponent);
    component = fixture.componentInstance;

    mockPlayersBattleService.playerFirst = { getProperties: () => ({ name: 'Player 1' } as any) } as any;
    mockPlayersBattleService.playerSecond = { getProperties: () => ({ name: 'Player 2' } as any) } as any;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to "/" if players are not set', () => {
    mockPlayersBattleService.playerFirst = null as any;
    mockPlayersBattleService.playerSecond = null as any;

    component = fixture.componentInstance;

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should display winner name after battle starts', () => {
    mockPlayersBattleService.determineWinner.and.returnValue('Player 1');
    
    component.onStartBattle();

    expect(component.winnerName).toBe('Player 1');
    expect(component.isVisibleExplosion).toBeTrue();
    expect(mockHistoryService.addRecord).toHaveBeenCalledWith({
      playerFirst: { name: 'Player 1' } as any,
      playerSecond: { name: 'Player 2' } as any,
      winnerName: 'Player 1',
    });
  });

  it('should hide explosion animation on animation complete', () => {
    component.onCompleteAnimationBattle();
    expect(component.isVisibleExplosion).toBeFalse();
    expect(mockChangeDetectorRef.detectChanges).toHaveBeenCalled();
  });

  it('should call back and navigate to "/" when back is called', () => {
    component.back();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
});
