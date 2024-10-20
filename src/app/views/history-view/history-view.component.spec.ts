import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryViewComponent } from './history-view.component';
import { HistoryService } from '../../services/history.service';
import { ButtonComponent } from '../../shared/button/button.component';

describe('HistoryViewComponent', () => {
  let component: HistoryViewComponent;
  let fixture: ComponentFixture<HistoryViewComponent>;
  let mockHistoryService: jasmine.SpyObj<HistoryService>;

  beforeEach(() => {
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

    TestBed.configureTestingModule({
      declarations: [HistoryViewComponent],
      providers: [
        { provide: HistoryService, useValue: mockHistoryService }
      ],
      imports: [ButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call downloadHistoryJson on button click', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('app-button');

    button?.dispatchEvent(new Event('click'));

    expect(mockHistoryService.downloadHistoryJson).toHaveBeenCalled();
  });
});
