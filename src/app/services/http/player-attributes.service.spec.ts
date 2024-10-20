import { TestBed } from '@angular/core/testing';

import { PlayerAttributesService } from './player-attributes.service';

describe('PlayerAttributesService', () => {
  let service: PlayerAttributesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerAttributesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
