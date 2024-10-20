import { TestBed } from '@angular/core/testing';
import { HistoryService } from './history.service';
import { IHistory } from '../interfaces/history.interface';
import { Player } from '../classes/player';
import { mockPlayerFirst, mockPlayerSecond, mockStarship } from '../mock-tests/mock-players';

describe('HistoryService', () => {
  let service: HistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a record to historyBattle', () => {
    const mock1 = new Player(mockPlayerFirst);
    mock1.assignStarship(mockStarship);
    const mock2 = new Player(mockPlayerSecond);
    mock2.assignStarship(mockStarship);
    const mockHistory: IHistory = {
      winnerName: 'Player 1',
      playerFirst: mock1.getProperties(),
      playerSecond: mock2.getProperties(),
    };

    service.addRecord(mockHistory);

    expect(service.historyBattle.length).toBe(1);
    expect(service.historyBattle[0]).toEqual(mockHistory);
  });

  it('should add new records to the beginning of historyBattle', () => {
    const mock1 = new Player(mockPlayerFirst);
    mock1.assignStarship(mockStarship);
    const mock2 = new Player(mockPlayerSecond);
    mock2.assignStarship(mockStarship);
  
    const mockHistory1: IHistory = {
      winnerName: 'Player 1',
      playerFirst: mock1.getProperties(),
      playerSecond: mock2.getProperties(),
    };
    const mockHistory2: IHistory = {
      winnerName: 'Player 2',
      playerFirst: mock1.getProperties(),
      playerSecond: mock2.getProperties(),
    };

    service.addRecord(mockHistory1);
    service.addRecord(mockHistory2);

    expect(service.historyBattle.length).toBe(2);
    expect(service.historyBattle[0]).toEqual(mockHistory2);
    expect(service.historyBattle[1]).toEqual(mockHistory1);
  });

  it('should trigger downloadHistoryJson and download a JSON file', () => {
    const mock1 = new Player(mockPlayerFirst);
    mock1.assignStarship(mockStarship);
    const mock2 = new Player(mockPlayerSecond);
    mock2.assignStarship(mockStarship);

    const mockHistory: IHistory = {
      winnerName: 'Player 1',
      playerFirst: mock1.getProperties(),
      playerSecond: mock2.getProperties(),
    };

    service.addRecord(mockHistory);

    const createElementSpy = spyOn(document, 'createElement').and.callFake(() => {
      return {
        click: jasmine.createSpy('click'),
        set href(value: string) {},
        set download(value: string) {}
      } as unknown as HTMLAnchorElement;
    });

    const revokeObjectURLSpy = spyOn(window.URL, 'revokeObjectURL');

    service.downloadHistoryJson();

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(revokeObjectURLSpy).toHaveBeenCalled();
  });
});
