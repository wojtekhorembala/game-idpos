import { TestBed } from '@angular/core/testing';

import { PlayerAttributesService } from './player-attributes.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('PlayerAttributesService', () => {
  let service: PlayerAttributesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient],
      imports: [HttpClientModule],
    });
    service = TestBed.inject(PlayerAttributesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
