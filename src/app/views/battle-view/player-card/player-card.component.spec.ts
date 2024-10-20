import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerCardComponent } from './player-card.component';
import { By } from '@angular/platform-browser';
import { Player } from '../../../classes/player';

describe('PlayerCardComponent', () => {
  let component: PlayerCardComponent;
  let fixture: ComponentFixture<PlayerCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display player name', () => {
    const mockPlayer = { name: 'Player 1' } as Player;
    component.player = mockPlayer;
    
    fixture.detectChanges();

    const playerNameElement = fixture.debugElement.query(By.css('.player-card__name')).nativeElement;
    expect(playerNameElement.textContent).toContain('Player 1');
  });

  it('should apply "second-player" class if isSecondPlayer is true', () => {
    component.isSecondPlayer = true;
    
    fixture.detectChanges();
    const playerCardElement = fixture.debugElement.query(By.css('.player-card')).nativeElement;
    expect(playerCardElement.classList).toContain('second-player');
  });

  it('should not apply "second-player" class if isSecondPlayer is false', () => {
    component.isSecondPlayer = false;

    fixture.detectChanges();

    const playerCardElement = fixture.debugElement.query(By.css('.player-card')).nativeElement;
    expect(playerCardElement.classList).not.toContain('second-player');
  });
});
