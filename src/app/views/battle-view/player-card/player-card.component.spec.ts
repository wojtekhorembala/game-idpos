import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerCardComponent } from './player-card.component';
import { By } from '@angular/platform-browser';
import { Player } from '../../../classes/player';
import { mockPlayerFirst } from '../../../mock-tests/mock-players';

describe('PlayerCardComponent', () => {
  let component: PlayerCardComponent;
  let fixture: ComponentFixture<PlayerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    component.player = new Player(mockPlayerFirst);
    expect(component).toBeTruthy();
  });

  it('should display player name', () => {
    component.player = new Player(mockPlayerFirst);
    
    fixture.detectChanges();

    const playerNameElement = fixture.debugElement.query(By.css('.player-card__name')).nativeElement;
    expect(playerNameElement.textContent).toContain('Player 1');
  });
});
