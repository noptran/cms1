import { TestBed, inject } from '@angular/core/testing';

import { ReferralsService } from './referrals.service';

describe('ReferralsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReferralsService]
    });
  });

  it('should be created', inject([ReferralsService], (service: ReferralsService) => {
    expect(service).toBeTruthy();
  }));
});
