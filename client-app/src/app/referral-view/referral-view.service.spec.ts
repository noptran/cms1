import { TestBed, inject } from '@angular/core/testing';

import { ReferralViewService } from './referral-view.service';

describe('ReferralViewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReferralViewService]
    });
  });

  it('should be created', inject([ReferralViewService], (service: ReferralViewService) => {
    expect(service).toBeTruthy();
  }));
});
