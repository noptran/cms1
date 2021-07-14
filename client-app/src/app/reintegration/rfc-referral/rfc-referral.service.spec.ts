import { TestBed, inject } from '@angular/core/testing';

import { RfcReferralService } from './rfc-referral.service';

describe('RfcReferralService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RfcReferralService]
    });
  });

  it('should be created', inject([RfcReferralService], (service: RfcReferralService) => {
    expect(service).toBeTruthy();
  }));
});
