import { TestBed, inject } from '@angular/core/testing';

import { MzkService } from './mzk.service';

describe('MzkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MzkService]
    });
  });

  it('should be created', inject([MzkService], (service: MzkService) => {
    expect(service).toBeTruthy();
  }));
});
