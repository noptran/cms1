import { TestBed, inject } from '@angular/core/testing';

import { FpCaseActivityService } from './fp-case-activity.service';

describe('FpCaseActivityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FpCaseActivityService]
    });
  });

  it('should be created', inject([FpCaseActivityService], (service: FpCaseActivityService) => {
    expect(service).toBeTruthy();
  }));
});
