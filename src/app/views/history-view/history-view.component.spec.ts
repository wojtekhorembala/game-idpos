import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryViewComponent } from './history-view.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { HistoryService } from '../../services/history.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('HistoryViewComponent', () => {
  let component: HistoryViewComponent;
  let fixture: ComponentFixture<HistoryViewComponent>;
  let mockHistoryService: jasmine.SpyObj<HistoryService>;

  beforeEach(async () => {
    mockHistoryService = jasmine.createSpyObj('HistoryService', ['downloadHistoryJson'], {
      historyBattle: [
        {
          winnerName: 'Player 1',
          playerFirst: { name: 'Player 1' },
          playerSecond: { name: 'Player 2' }
        },
        {
          winnerName: 'Player 2',
          playerFirst: { name: 'Player 3' },
          playerSecond: { name: 'Player 4' }
        }
      ]
    });

    await TestBed.configureTestingModule({
      imports: [HistoryViewComponent, ButtonComponent],
      providers: [
        { provide: HistoryService, useValue: mockHistoryService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call downloadHistoryJson on button click', () => {
    const buttonDe: DebugElement = fixture.debugElement.query(By.directive(ButtonComponent));
    buttonDe.triggerEventHandler('onClick$', null);
    expect(mockHistoryService.downloadHistoryJson).toHaveBeenCalled();
  });

});
