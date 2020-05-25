import { TestBed } from '@angular/core/testing';

import { StoreResultService } from './store-result.service';

describe('StoreResultService', () => {
  let service: StoreResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
