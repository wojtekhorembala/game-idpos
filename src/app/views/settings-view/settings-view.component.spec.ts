import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { GameStep } from '../../enum/game.enum';
import { PlayerAttributesService } from '../../services/http/player-attributes.service';
import { PlayersBattleService } from '../../services/players-battle.service';
import { SettingsViewComponent } from './settings-view.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonComponent } from '../../shared/button/button.component';
import { LoaderComponent } from '../../shared/loader/loader.component';

describe('SettingsViewComponent', () => {
  let component: SettingsViewComponent;
  let fixture: ComponentFixture<SettingsViewComponent>;
  let mockPlayerAttributesService: jasmine.SpyObj<PlayerAttributesService>;
  let mockPlayersBattleService: jasmine.SpyObj<PlayersBattleService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockPlayerAttributesService = jasmine.createSpyObj('PlayerAttributesService', ['getPlayerAttributes', 'getRandomStarshipDetails']);
    mockPlayersBattleService = jasmine.createSpyObj('PlayersBattleService', ['setPlayersAttributes', 'setPlayersStarships']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ButtonComponent, LoaderComponent],
      declarations: [SettingsViewComponent],
      providers: [
        { provide: PlayerAttributesService, useValue: mockPlayerAttributesService },
        { provide: PlayersBattleService, useValue: mockPlayersBattleService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set gameStep to SetPlayersAttributes on onClickPlay', () => {
    component.onClickPlay();
    expect(component.gameStep).toBe(GameStep.SetPlayersAttributes);
  });

  it('should set gameStep to SetStarShipsAttributes and show loader on onClickSelectPlayerAttr', () => {
    component.onClickSelectPlayerAttr();
    expect(component.gameStep).toBe(GameStep.SetStarShipsAttributes);
    expect(component.isVisibleLoader).toBeTrue();
  });

  it('should set players attributes and hide loader when setPlayersAttr succeeds', () => {
    const mockPlayerAttributes = { name: 'player1' } as any;
    mockPlayerAttributesService.getPlayerAttributes.and.returnValue(of(mockPlayerAttributes));

    component.onClickSelectPlayerAttr();

    expect(mockPlayerAttributesService.getPlayerAttributes).toHaveBeenCalledTimes(2);
    expect(mockPlayersBattleService.setPlayersAttributes).toHaveBeenCalledWith(mockPlayerAttributes, mockPlayerAttributes);
    expect(component.isVisibleLoader).toBeFalse();
  });

  it('should handle error when setPlayersAttr fails', () => {
    spyOn(window, 'alert');
    mockPlayerAttributesService.getPlayerAttributes.and.returnValue(throwError(() => new Error('error')));

    component.onClickSelectPlayerAttr();

    expect(component.gameStep).toBe(GameStep.Play);
    expect(component.isVisibleLoader).toBeFalse();
    expect(window.alert).toHaveBeenCalledWith('Wystąpił błąd, spróbuj jeszcze raz.');
  });

  it('should set starship attributes and navigate to battle when setStarshipsPlayers succeeds', () => {
    const mockStarship = { name: 'Starship1' } as any;
    mockPlayerAttributesService.getRandomStarshipDetails.and.returnValue(of(mockStarship));

    component.onClickSelectStarShipsAttr();

    expect(mockPlayerAttributesService.getRandomStarshipDetails).toHaveBeenCalledTimes(2);
    expect(mockPlayersBattleService.setPlayersStarships).toHaveBeenCalledWith(mockStarship, mockStarship);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/battle']);
  });

  it('should unsubscribe on component destroy', () => {
    const spy = spyOn(component['ComponentSubsc'], 'unsubscribe');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});
