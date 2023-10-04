import { TestBed } from '@angular/core/testing';

import { StoreLocalStorageService } from './store-local-storage.service';

describe('StoreLocalStorageService', () => {
  let service: StoreLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
