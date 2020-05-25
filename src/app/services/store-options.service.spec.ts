import { TestBed } from '@angular/core/testing';

import { StoreOptionsService } from './store-options.service';

describe('StoreOptionsService', () => {
  let service: StoreOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreOptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
