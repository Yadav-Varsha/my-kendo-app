import { TestBed } from '@angular/core/testing';

import { PersistingService } from './persisting.service';

describe('PersistingService', () => {
  let service: PersistingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersistingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
