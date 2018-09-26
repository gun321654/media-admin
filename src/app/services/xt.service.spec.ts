/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { XtService } from './xt.service';

describe('Service: Xt', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [XtService]
    });
  });

  it('should ...', inject([XtService], (service: XtService) => {
    expect(service).toBeTruthy();
  }));
});
